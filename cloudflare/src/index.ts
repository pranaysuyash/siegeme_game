import type { D1Database, DurableObjectNamespace, DurableObjectState, R2Bucket } from "@cloudflare/workers-types";
import { Webhook } from "standardwebhooks";
import type { AttackQueueEntry, AuthoritativeWorldState, ActiveTurn, PublicWorldDelta, PublicWorldSnapshot, RulerIdentity } from "../../src/game/domain/types";
import { BALLISTIC_SIMULATION_VERSION, damageForPower, resolveBallisticShot } from "../../src/game/simulation/ballistics";
import { componentStateFromHp } from "../../src/game/simulation/attack";
import { createInitialAuthoritativeWorldState, createNewReignAuthoritativeWorldState, migrateAuthoritativeWorldState, projectPublicWorldSnapshot } from "../../src/game/world/initial-snapshot";
import { generateFortress } from "../../src/game/world/generator";
import { issueSession, readSession, sessionCookie, type PlayerSession } from "./session";
import { validatePublicIdentity, type PublicIdentityInput } from "../../src/game/security/public-identity";
import { defensePriceForTier, GameConfig, nextDefenseTier } from "../../src/game/config";
import { evaluateDodoPayment } from "./dodo";

type Env = {
  GLOBAL_SIEGE: DurableObjectNamespace;
  DB: D1Database;
  SESSION_SECRET: string;
  AUTHORITY_INTERNAL_SECRET: string;
  DODO_PAYMENTS_API_KEY?: string;
  DODO_PAYMENTS_ENVIRONMENT?: "test_mode" | "live_mode";
  DODO_ATTACK_PRODUCT_ID?: string;
  DODO_DEFENSE_PRODUCT_ID?: string;
  DODO_PAYMENTS_WEBHOOK_KEY?: string;
  RULER_ASSETS: R2Bucket;
};

type AttackCommand = { commandId: string; reignId: string; turnId: string; expectedWorldVersion: number; simulationVersion: "ballistic-v1"; yaw: number; elevation: number; power: number };
type DefenseCommand = { commandId: string; reignId: string; expectedWorldVersion: number; type: "SHIELD" | "BRACE"; slotId: string };
type StoredAttackResult = { status: number; body: Record<string, unknown> };
type TurnClaimResult = { status: number; body: Record<string, unknown> };
type EntitlementGrant = { grantId: string; playerId: string; kind: "ATTACK_PACK" | "DEFENSE_PACK"; quantity: number };
type PurchaseIntent = { intent_id: string; player_id: string; purchase_kind: string; expected_product_id: string; expected_quantity: number; expected_amount_minor: number; expected_currency: string; status: string };
type CoronationRequest = { playerId: string; identityId: string; identity: RulerIdentity };
const CORONATION_TIMEOUT_MS = GameConfig.coronation.identityTimeoutMs;
const requestBuckets = new Map<string, { startedAt: number; count: number }>();

function allowMutation(request: Request) {
  const url = new URL(request.url);
  const mutationPaths = new Set(["/session", "/checkout", "/identity", "/recovery/create", "/recovery/claim", "/turn/claim", "/attack", "/defense/place"]);
  if (request.method === "GET" || !mutationPaths.has(url.pathname)) return true;
  const key = `${request.headers.get("cf-connecting-ip") ?? "local"}:${url.pathname}`;
  const now = Date.now();
  const bucket = requestBuckets.get(key);
  if (!bucket || now - bucket.startedAt >= 60_000) {
    requestBuckets.set(key, { startedAt: now, count: 1 });
    return true;
  }
  if (bucket.count >= (url.pathname === "/session" ? 30 : 20)) return false;
  bucket.count += 1;
  return true;
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function validRecoveryCode(value: unknown): value is string {
  return typeof value === "string" && /^SIEGE-[A-Z0-9-]{16,80}$/.test(value.trim().toUpperCase());
}

function imageExtension(contentType: string, bytes: Uint8Array) {
  const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
  const png = contentType === "image/png" && bytes.length >= 8 && bytes.slice(0, 8).every((byte, index) => byte === pngSignature[index]);
  const jpeg = contentType === "image/jpeg" && bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const webp = contentType === "image/webp" && bytes.length >= 12 && new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" && new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP";
  if (png) return "png";
  if (jpeg) return "jpg";
  if (webp) return "webp";
  return null;
}

function worldDelta(before: PublicWorldSnapshot, after: PublicWorldSnapshot, eventSequence: number): PublicWorldDelta {
  const prior = new Map(before.components.map((component) => [component.componentId, component]));
  return {
    worldVersion: after.worldVersion,
    eventSequence,
    phase: after.phase,
    currentReignId: after.currentReignId,
    reign: after.reign,
    ruler: after.ruler,
    coronation: after.coronation,
    activeDefenses: after.activeDefenses,
    changes: after.components.filter((component) => JSON.stringify(prior.get(component.componentId)) !== JSON.stringify(component)),
  };
}

function json(data: unknown, status = 200, headers?: HeadersInit) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function isAttackCommand(value: unknown): value is AttackCommand {
  if (!value || typeof value !== "object") return false;
  const input = value as Record<string, unknown>;
  const yaw = input.yaw;
  const elevation = input.elevation;
  const power = input.power;
  return typeof input.commandId === "string" && input.commandId.length >= 8 && input.commandId.length <= 128
    && typeof input.reignId === "string" && input.reignId.length > 0 && input.reignId.length <= 128
    && typeof input.turnId === "string" && input.turnId.length > 0 && input.turnId.length <= 128
    && input.simulationVersion === BALLISTIC_SIMULATION_VERSION
    && typeof input.expectedWorldVersion === "number" && Number.isInteger(input.expectedWorldVersion) && input.expectedWorldVersion >= 1
    && [input.yaw, input.elevation, input.power].every((item) => typeof item === "number" && Number.isFinite(item))
    && typeof yaw === "number" && yaw >= GameConfig.attack.minYaw && yaw <= GameConfig.attack.maxYaw
    && typeof elevation === "number" && elevation >= GameConfig.attack.minElevation && elevation <= GameConfig.attack.maxElevation
    && typeof power === "number" && power >= GameConfig.attack.minPower && power <= GameConfig.attack.maxPower;
}

function isDefenseCommand(value: unknown): value is DefenseCommand {
  if (!value || typeof value !== "object") return false;
  const input = value as Record<string, unknown>;
  return typeof input.commandId === "string" && input.commandId.length >= 8 && input.commandId.length <= 128
    && typeof input.reignId === "string" && input.reignId.length > 0 && input.reignId.length <= 128
    && typeof input.expectedWorldVersion === "number" && Number.isInteger(input.expectedWorldVersion) && input.expectedWorldVersion >= 1
    && (input.type === "SHIELD" || input.type === "BRACE")
    && typeof input.slotId === "string" && input.slotId.length > 0 && input.slotId.length <= 128;
}

function attackFingerprint(command: AttackCommand) {
  return JSON.stringify({ commandId: command.commandId, reignId: command.reignId, turnId: command.turnId, expectedWorldVersion: command.expectedWorldVersion, simulationVersion: command.simulationVersion, yaw: command.yaw, elevation: command.elevation, power: command.power });
}

function dodoBaseUrl(environment: Env["DODO_PAYMENTS_ENVIRONMENT"]) {
  return environment === "live_mode" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";
}

function verifyDodoWebhook(rawBody: string, headers: Headers, secret: string | undefined) {
  const webhookId = headers.get("webhook-id");
  const timestamp = headers.get("webhook-timestamp");
  const signatureHeader = headers.get("webhook-signature");
  if (!secret || !webhookId || !timestamp || !signatureHeader) return false;
  try {
    new Webhook(secret).verify(rawBody, { "webhook-id": webhookId, "webhook-timestamp": timestamp, "webhook-signature": signatureHeader });
    return true;
  } catch {
    return false;
  }
}

export class SiegeWorld {
  constructor(private readonly state: DurableObjectState, private readonly env: Env) {
    this.state.storage.sql.exec(`CREATE TABLE IF NOT EXISTS authoritative_world_state (id TEXT PRIMARY KEY, state_json TEXT NOT NULL); CREATE TABLE IF NOT EXISTS world_snapshot (id TEXT PRIMARY KEY, snapshot_json TEXT NOT NULL); CREATE TABLE IF NOT EXISTS live_entitlements (grant_id TEXT PRIMARY KEY, player_id TEXT NOT NULL, kind TEXT NOT NULL, quantity_granted INTEGER NOT NULL, quantity_remaining INTEGER NOT NULL); CREATE TABLE IF NOT EXISTS world_events (event_id TEXT PRIMARY KEY, sequence INTEGER NOT NULL, event_type TEXT NOT NULL, payload_json TEXT NOT NULL, created_at INTEGER NOT NULL); CREATE TABLE IF NOT EXISTS attack_commands (command_id TEXT PRIMARY KEY, player_id TEXT NOT NULL, request_json TEXT NOT NULL, result_json TEXT NOT NULL, created_at INTEGER NOT NULL);`);
  }

  async fetch(request: Request) {
    const url = new URL(request.url);
    await this.finalizeExpiredCoronation();
    if (request.method === "GET" && url.pathname === "/world") {
      const snapshot = this.readSnapshot();
      const localTestSeam = (url.hostname === "localhost" || url.hostname === "127.0.0.1") && url.searchParams.get("empty") === "1";
      return json(localTestSeam ? { ...snapshot, phase: "CORONATION", currentReignId: null, reign: null, ruler: null } : snapshot);
    }
    if (request.method === "GET" && url.pathname === "/ws") return this.openWebSocket(request);
    if (request.method === "POST" && url.pathname === "/turn/claim") return this.handleTurnClaim(request);
    if (request.method === "POST" && url.pathname === "/attack") return this.handleAttack(request);
    if (request.method === "POST" && url.pathname === "/defense/place") return this.handleDefensePlace(request);
    if (request.method === "POST" && url.pathname === "/internal/grants") return this.handleGrant(request);
    if (request.method === "POST" && url.pathname === "/internal/coronation") return this.handleCoronation(request);
    if (request.method === "POST" && url.pathname === "/internal/recovery/eligible") return this.handleRecoveryEligibility(request);
    if (request.method === "GET" && url.pathname === "/queue") return this.handleQueue(request);
    if (request.method === "GET" && url.pathname === "/entitlements") return this.handleEntitlements(request);
    return json({ error: "Not found" }, 404);
  }

  private readSnapshot() {
    return projectPublicWorldSnapshot(this.readState());
  }

  private async finalizeExpiredCoronation() {
    const previous = this.readState();
    const openedAt = previous.coronationState?.openedAt;
    const playerId = previous.rulerPlayerId;
    if (previous.phase !== "CORONATION" || previous.coronationState?.status !== "AWAITING_IDENTITY" || !openedAt || !playerId || Date.now() - openedAt < CORONATION_TIMEOUT_MS) return;

    const now = new Date();
    const identity: RulerIdentity = {
      displayName: "The Conqueror",
      identityType: "Person",
      destinationUrl: null,
      destinationDomain: null,
      message: "The throne was claimed in silence.",
      ctaChoice: null,
      verified: false,
    };
    const identityId = `fallback:${previous.currentReignId ?? previous.worldVersion}`;
    const previousSnapshot = projectPublicWorldSnapshot(previous);
    const next = createNewReignAuthoritativeWorldState(previous, now, playerId, identity, identityId);
    this.writeState(next);
    const archive = {
      id: previous.currentReignId ?? `reign:archive:${previous.worldVersion}`,
      ordinal: previous.reign?.ordinal ?? 0,
      rulerPlayerId: previous.rulerPlayerId,
      publicIdentityId: previous.publicIdentityId,
      startedAt: previous.reign ? Date.parse(previous.reign.startedAt) : now.getTime(),
      endedAt: now.getTime(),
      finalStateVersion: previous.worldVersion,
      summary: previousSnapshot,
    };
    await this.env.DB.prepare("INSERT OR IGNORE INTO public_identities (id, owner_player_id, identity_type, display_name, destination_url, destination_domain, message, cta_choice, moderation_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(identityId, playerId, identity.identityType, identity.displayName, null, null, identity.message, null, "AUTOMATED_FALLBACK", now.getTime(), now.getTime()).run();
    await this.env.DB.prepare("INSERT OR IGNORE INTO reign_archive (id, ordinal, ruler_player_id, public_identity_id, started_at, ended_at, final_state_version, archive_summary_json, archived_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(archive.id, archive.ordinal, archive.rulerPlayerId, archive.publicIdentityId, archive.startedAt, archive.endedAt, archive.finalStateVersion, JSON.stringify(archive.summary), now.getTime()).run();
    const snapshot = projectPublicWorldSnapshot(next);
    this.state.storage.sql.exec("INSERT OR IGNORE INTO world_events (event_id, sequence, event_type, payload_json, created_at) VALUES (?, ?, ?, ?, ?)", `reign-started:${next.currentReignId}`, next.eventSequence, "REIGN_STARTED", JSON.stringify({ archive, currentReignId: next.currentReignId, fallback: true }), now.getTime());
    this.broadcast({ type: "reign_started", eventSequence: next.eventSequence, worldVersion: next.worldVersion, snapshot, fallback: true });
  }

  private readState(): AuthoritativeWorldState {
    const row = this.state.storage.sql.exec("SELECT state_json FROM authoritative_world_state WHERE id = ?", "world:global").toArray()[0] as { state_json?: string } | undefined;
    const legacyRow = row?.state_json ? undefined : this.state.storage.sql.exec("SELECT snapshot_json FROM world_snapshot WHERE id = ?", "world:global").toArray()[0] as { snapshot_json?: string } | undefined;
    const storedJson = row?.state_json ?? legacyRow?.snapshot_json;
    if (storedJson) {
      const parsed = JSON.parse(storedJson) as Partial<AuthoritativeWorldState>;
      const migrated = migrateAuthoritativeWorldState(parsed);
      if (migrated) {
        if (!row?.state_json || parsed.schemaVersion !== 3) this.writeState(migrated);
        return migrated;
      }
    }
    const state = createInitialAuthoritativeWorldState();
    this.state.storage.sql.exec("INSERT INTO authoritative_world_state (id, state_json) VALUES (?, ?)", "world:global", JSON.stringify(state));
    return state;
  }

  private writeState(state: AuthoritativeWorldState) {
    const row = this.state.storage.sql.exec("SELECT state_json FROM authoritative_world_state WHERE id = ?", "world:global").toArray()[0] as { state_json?: string } | undefined;
    const legacyRow = row?.state_json ? undefined : this.state.storage.sql.exec("SELECT snapshot_json FROM world_snapshot WHERE id = ?", "world:global").toArray()[0] as { snapshot_json?: string } | undefined;
    const previousJson = row?.state_json ?? legacyRow?.snapshot_json;
    if (previousJson) {
      const previous = migrateAuthoritativeWorldState(JSON.parse(previousJson));
      const previousIntegrity = previous?.reign?.coreIntegrity;
      const nextIntegrity = state.reign?.coreIntegrity;
      if (previous && previous.currentReignId === state.currentReignId && typeof previousIntegrity === "number" && typeof nextIntegrity === "number" && nextIntegrity > previousIntegrity) {
        throw new Error("Core Integrity cannot increase during a reign");
      }
    }
    this.state.storage.sql.exec("INSERT INTO authoritative_world_state (id, state_json) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET state_json = excluded.state_json", "world:global", JSON.stringify(state));
  }

  private pruneEvents() {
    this.state.storage.sql.exec("DELETE FROM world_events WHERE sequence <= (SELECT COALESCE(MAX(sequence), 0) - ? FROM world_events)", GameConfig.retention.worldEventsKeep);
  }

  private hasAttackEntitlement(playerId: string) {
    return Boolean(this.state.storage.sql.exec("SELECT grant_id FROM live_entitlements WHERE player_id = ? AND kind = 'ATTACK_PACK' AND quantity_remaining > 0 ORDER BY rowid LIMIT 1", playerId).toArray()[0]);
  }

  private handleQueue(request: Request) {
    const playerId = request.headers.get("x-siege-player-id");
    const state = this.readState();
    const queuedIndex = playerId ? state.attackQueue.findIndex((entry) => entry.playerId === playerId) : -1;
    const activeTurn = state.activeTurn ? { id: state.activeTurn.id, reignId: state.activeTurn.reignId, startedAt: state.activeTurn.startedAt, expiresAt: state.activeTurn.expiresAt, shotNumber: state.activeTurn.shotNumber } : null;
    return json({ activeTurn, queued: queuedIndex >= 0, position: queuedIndex >= 0 ? queuedIndex + 1 : null, queueLength: state.attackQueue.length });
  }

  private handleEntitlements(request: Request) {
    const playerId = request.headers.get("x-siege-player-id");
    if (!playerId) return json({ error: "Player session is required" }, 401);
    const rows = this.state.storage.sql.exec("SELECT kind, quantity_remaining FROM live_entitlements WHERE player_id = ? AND quantity_remaining > 0", playerId).toArray() as Array<{ kind: string; quantity_remaining: number }>;
    return json({ entitlements: rows.map((row) => ({ kind: row.kind, quantityRemaining: row.quantity_remaining })) });
  }

  private newTurn(playerId: string, reignId: string, now: number): ActiveTurn {
    return { id: crypto.randomUUID(), playerId, reignId, startedAt: now, expiresAt: now + GameConfig.attack.turnDurationMs, shotNumber: 1 };
  }

  private promoteNextTurn(state: AuthoritativeWorldState, now: number) {
    state.activeTurn = null;
    const queue: AttackQueueEntry[] = [];
    for (const entry of state.attackQueue) {
      if (!state.activeTurn && this.hasAttackEntitlement(entry.playerId)) state.activeTurn = this.newTurn(entry.playerId, state.currentReignId ?? "", now);
      else if (state.activeTurn) queue.push(entry);
    }
    state.attackQueue = queue;
    return state.activeTurn;
  }

  private expireOrPromoteTurn(state: AuthoritativeWorldState, now: number) {
    if (state.activeTurn && state.activeTurn.expiresAt > now) return false;
    this.promoteNextTurn(state, now);
    return true;
  }

  private consumeEntitlement(playerId: string, state: AuthoritativeWorldState) {
    const row = this.state.storage.sql.exec("SELECT grant_id, quantity_remaining FROM live_entitlements WHERE player_id = ? AND kind = 'ATTACK_PACK' AND quantity_remaining > 0 ORDER BY rowid LIMIT 1", playerId).toArray()[0] as { grant_id: string; quantity_remaining: number } | undefined;
    if (!row) return null;
    this.state.storage.sql.exec("UPDATE live_entitlements SET quantity_remaining = quantity_remaining - 1 WHERE grant_id = ? AND quantity_remaining > 0", row.grant_id);
    state.liveEntitlements = state.liveEntitlements.map((grant) => grant.grantId === row.grant_id ? { ...grant, quantityRemaining: grant.quantityRemaining - 1 } : grant);
    return row.grant_id;
  }

  private consumeDefenseEntitlement(playerId: string, state: AuthoritativeWorldState) {
    const row = this.state.storage.sql.exec("SELECT grant_id, quantity_remaining FROM live_entitlements WHERE player_id = ? AND kind = 'DEFENSE_PACK' AND quantity_remaining > 0 ORDER BY rowid LIMIT 1", playerId).toArray()[0] as { grant_id: string; quantity_remaining: number } | undefined;
    if (!row) return null;
    this.state.storage.sql.exec("UPDATE live_entitlements SET quantity_remaining = quantity_remaining - 1 WHERE grant_id = ? AND quantity_remaining > 0", row.grant_id);
    state.liveEntitlements = state.liveEntitlements.map((grant) => grant.grantId === row.grant_id ? { ...grant, quantityRemaining: grant.quantityRemaining - 1 } : grant);
    return row.grant_id;
  }

  private async handleGrant(request: Request) {
    if (request.headers.get("x-authority-secret") !== this.env.AUTHORITY_INTERNAL_SECRET) return json({ error: "Forbidden" }, 403);
    const grant = await request.json() as Partial<EntitlementGrant>;
    if (!grant.grantId || !grant.playerId || (grant.kind !== "ATTACK_PACK" && grant.kind !== "DEFENSE_PACK") || typeof grant.quantity !== "number" || !Number.isInteger(grant.quantity) || grant.quantity <= 0) return json({ error: "Invalid entitlement grant" }, 422);
    const grantId = grant.grantId;
    const playerId = grant.playerId;
    const kind = grant.kind;
    const quantity = grant.quantity;
    const result = this.state.storage.transactionSync(() => {
      const existing = this.state.storage.sql.exec("SELECT quantity_granted, quantity_remaining FROM live_entitlements WHERE grant_id = ?", grantId).toArray()[0] as { quantity_granted: number; quantity_remaining: number } | undefined;
      if (existing) return { duplicate: true, ...existing };
      this.state.storage.sql.exec("INSERT INTO live_entitlements (grant_id, player_id, kind, quantity_granted, quantity_remaining) VALUES (?, ?, ?, ?, ?)", grantId, playerId, kind, quantity, quantity);
      const state = this.readState();
      state.liveEntitlements.push({ grantId, playerId, kind, quantityRemaining: quantity });
      this.writeState(state);
      return { duplicate: false, quantity_granted: quantity, quantity_remaining: quantity };
    });
    return json({ granted: true, ...result });
  }

  private handleRecoveryEligibility(request: Request) {
    if (request.headers.get("x-authority-secret") !== this.env.AUTHORITY_INTERNAL_SECRET) return json({ error: "Forbidden" }, 403);
    const playerId = request.headers.get("x-siege-player-id");
    const state = this.readState();
    return state.phase === "CORONATION" && state.rulerPlayerId === playerId
      ? json({ eligible: true, reignId: state.currentReignId })
      : json({ error: "Recovery is only available to the decisive conqueror during coronation" }, 409);
  }

  private async handleCoronation(request: Request) {
    if (request.headers.get("x-authority-secret") !== this.env.AUTHORITY_INTERNAL_SECRET) return json({ error: "Forbidden" }, 403);
    let body: unknown;
    try { body = await request.json(); } catch { return json({ error: "Coronation details must be valid JSON" }, 400); }
    if (!body || typeof body !== "object") return json({ error: "Coronation details are invalid" }, 422);
    const input = body as Partial<CoronationRequest>;
    const validation = validatePublicIdentity(input.identity as PublicIdentityInput);
    if (!validation.ok || typeof input.playerId !== "string" || typeof input.identityId !== "string") return json({ error: validation.ok ? "Coronation details are invalid" : validation.error }, 422);
    const playerId = input.playerId;
    const identityId = input.identityId;
    const result = this.state.storage.transactionSync(() => {
      const previous = this.readState();
      if (previous.phase !== "CORONATION" || previous.succession.status !== "CORE_BREACHED") return { status: 409, body: { error: "The throne is not awaiting coronation" } };
      if (previous.rulerPlayerId !== playerId) return { status: 403, body: { error: "Only the decisive conqueror can claim the throne" } };
      const now = new Date();
      const previousSnapshot = projectPublicWorldSnapshot(previous);
      const next = createNewReignAuthoritativeWorldState(previous, now, playerId, validation.identity, identityId);
      this.writeState(next);
      const nextSnapshot = projectPublicWorldSnapshot(next);
      const archive = {
        id: previous.currentReignId ?? `reign:archive:${previous.worldVersion}`,
        ordinal: previous.reign?.ordinal ?? 0,
        rulerPlayerId: previous.rulerPlayerId,
        publicIdentityId: previous.publicIdentityId,
        startedAt: previous.reign ? Date.parse(previous.reign.startedAt) : Date.now(),
        endedAt: now.getTime(),
        finalStateVersion: previous.worldVersion,
        summary: previousSnapshot,
      };
      this.state.storage.sql.exec("INSERT OR IGNORE INTO world_events (event_id, sequence, event_type, payload_json, created_at) VALUES (?, ?, ?, ?, ?)", `reign-started:${next.currentReignId}`, next.eventSequence, "REIGN_STARTED", JSON.stringify({ archive, currentReignId: next.currentReignId }), now.getTime());
      return { status: 200, body: { coronated: true, snapshot: nextSnapshot, archive }, event: { type: "reign_started", eventSequence: next.eventSequence, worldVersion: next.worldVersion, snapshot: nextSnapshot } };
    });
    if ("event" in result && result.event) this.broadcast(result.event);
    return json(result.body, result.status);
  }

  private async handleDefensePlace(request: Request) {
    const playerId = request.headers.get("x-siege-player-id");
    if (!playerId) return json({ error: "Player session is required" }, 401);
    let body: unknown;
    try { body = await request.json(); } catch { return json({ error: "Defense command must be valid JSON" }, 400); }
    if (!isDefenseCommand(body)) return json({ error: "Defense command is invalid" }, 422);
    const command = body;
    const result = this.state.storage.transactionSync(() => {
      const existing = this.state.storage.sql.exec("SELECT player_id, request_json, result_json FROM attack_commands WHERE command_id = ?", command.commandId).toArray()[0] as { player_id: string; request_json: string; result_json: string } | undefined;
      const requestJson = JSON.stringify(command);
      if (existing) {
        if (existing.player_id !== playerId || existing.request_json !== requestJson) return { status: 409, body: { error: "Command ID was already used with different input" } };
        const stored = JSON.parse(existing.result_json) as StoredAttackResult;
        return { status: stored.status, body: { ...stored.body, replay: true } };
      }
      const state = this.readState();
      const now = Date.now();
      if (state.phase !== "ACTIVE") return { status: 409, body: { error: "The throne is in coronation and cannot accept defenses" } };
      if (state.coronationState?.status === "PROTECTED" && (state.coronationState.protectedUntil ?? 0) > now) return { status: 409, body: { error: "The new reign is protected during coronation setup" } };
      if (state.activeTurn) return { status: 409, body: { error: "Defense placement is locked while a live attack turn is active" } };
      if (command.reignId !== state.currentReignId || command.expectedWorldVersion !== state.worldVersion) return { status: 409, body: { error: "Defense command targets a stale world" } };
      const definition = generateFortress(state.worldSeed, state.generatorVersion);
      const slot = definition.defenseSlots.find((candidate) => candidate.id === command.slotId && candidate.type === command.type);
      if (!slot || state.activeDefenses.some((defense) => defense.slotId === command.slotId)) return { status: 409, body: { error: "Defense slot is invalid or occupied" } };
      if (!this.consumeDefenseEntitlement(playerId, state)) return { status: 402, body: { error: "No confirmed defense entitlement is available" } };
      const defenseHits = command.type === "SHIELD" ? GameConfig.defense.shieldHits : GameConfig.defense.braceHits;
      const defense = { id: command.commandId, type: command.type, slotId: command.slotId, hp: defenseHits, maxHp: defenseHits } as const;
      state.activeDefenses = [...state.activeDefenses, defense];
      if (state.reign) {
        const nextGuard = Math.min(GameConfig.defense.royalGuardMax, state.reign.royalGuardCharge + GameConfig.defense.royalGuardPerPlacement);
        const nextTier = nextDefenseTier(state.reign.defensePriceTier);
        state.reign = { ...state.reign, royalGuardCharge: nextGuard, royalShieldPulseArmed: state.reign.royalShieldPulseArmed || nextGuard >= GameConfig.defense.royalGuardMax, defensePriceTier: nextTier, nextDefensePriceMinor: defensePriceForTier(nextTier) };
      }
      state.worldVersion += 1;
      state.eventSequence += 1;
      const snapshot = projectPublicWorldSnapshot(state);
      this.writeState(state);
      this.state.storage.sql.exec("INSERT INTO attack_commands (command_id, player_id, request_json, result_json, created_at) VALUES (?, ?, ?, ?, ?)", command.commandId, playerId, requestJson, JSON.stringify({ status: 200, body: { accepted: true, defense, snapshot } }), now);
      const delta = worldDelta(projectPublicWorldSnapshot({ ...state, activeDefenses: state.activeDefenses.filter((item) => item.id !== defense.id) }), snapshot, state.eventSequence);
      return { status: 200, body: { accepted: true, defense, snapshot }, event: { type: "defense_placed", eventSequence: state.eventSequence, worldVersion: state.worldVersion, delta } };
    });
    if ("event" in result && result.event) this.broadcast(result.event);
    return json(result.body, result.status);
  }

  private handleTurnClaim(request: Request) {
    const playerId = request.headers.get("x-siege-player-id");
    if (!playerId) return json({ error: "Player session is required" }, 401);
    const result: TurnClaimResult = this.state.storage.transactionSync(() => {
      const state = this.readState();
      const now = Date.now();
      this.expireOrPromoteTurn(state, now);
      if (state.phase !== "ACTIVE") return { status: 409, body: { error: "The throne is in coronation and cannot accept attacks" } };
      if (state.coronationState?.status === "PROTECTED") {
        if ((state.coronationState.protectedUntil ?? 0) > now) return { status: 409, body: { error: "The new reign is protected during coronation setup" } };
        state.coronationState = { status: "NONE", conquerorPlayerId: null, openedAt: null, protectedUntil: null };
      }
      if (state.activeTurn) {
        if (state.activeTurn.playerId === playerId) return { status: 200, body: { status: "ACTIVE", turn: state.activeTurn } };
        if (!state.attackQueue.some((entry) => entry.playerId === playerId)) state.attackQueue.push({ playerId, queuedAt: now });
        this.writeState(state);
        return { status: 202, body: { status: "QUEUED", position: state.attackQueue.findIndex((entry) => entry.playerId === playerId) + 1 } };
      }
      if (!this.hasAttackEntitlement(playerId)) return { status: 402, body: { error: "No confirmed attack entitlement is available" } };
      state.activeTurn = this.newTurn(playerId, state.currentReignId ?? "", now);
      this.writeState(state);
      return { status: 200, body: { status: "ACTIVE", turn: state.activeTurn } };
    });
    return json(result.body, result.status);
  }

  private async handleAttack(request: Request) {
    const playerId = request.headers.get("x-siege-player-id");
    if (!playerId) return json({ error: "Player session is required" }, 401);
    let body: unknown;
    try { body = await request.json(); } catch { return json({ error: "Attack intent must be valid JSON" }, 400); }
    if (!isAttackCommand(body)) return json({ error: "Attack command is invalid" }, 422);

    const command = body;
    const requestJson = attackFingerprint(command);
    const result = this.state.storage.transactionSync(() => {
      const existing = this.state.storage.sql.exec("SELECT player_id, request_json, result_json FROM attack_commands WHERE command_id = ?", command.commandId).toArray()[0] as { player_id: string; request_json: string; result_json: string } | undefined;
      if (existing) {
        if (existing.player_id !== playerId || existing.request_json !== requestJson) return { status: 409, body: { error: "Command ID was already used with different input" } };
        const stored = JSON.parse(existing.result_json) as StoredAttackResult;
        return { status: stored.status, body: { ...stored.body, replay: true } };
      }

      const state = this.readState();
      const now = Date.now();
      this.expireOrPromoteTurn(state, now);
      if (!this.hasAttackEntitlement(playerId)) return { status: 402, body: { error: "No confirmed attack entitlement is available" } };
      if (state.phase !== "ACTIVE") return { status: 409, body: { error: "The throne is in coronation and cannot accept attacks" } };
      if (state.coronationState?.status === "PROTECTED") {
        if ((state.coronationState.protectedUntil ?? 0) > now) return { status: 409, body: { error: "The new reign is protected during coronation setup" } };
        state.coronationState = { status: "NONE", conquerorPlayerId: null, openedAt: null, protectedUntil: null };
      }
      if (command.reignId !== state.currentReignId) return { status: 409, body: { error: "Command targets a different reign" } };
      if (command.expectedWorldVersion !== state.worldVersion) return { status: 409, body: { error: "Command targets a stale world version" } };
      if (!state.activeTurn || state.activeTurn.id !== command.turnId || state.activeTurn.playerId !== playerId) return { status: 409, body: { error: "No active attack turn belongs to this player" } };

      const beforeSnapshot = projectPublicWorldSnapshot(state);
      const definition = generateFortress(state.worldSeed, state.generatorVersion);
      const resolution = resolveBallisticShot(definition, projectPublicWorldSnapshot(state), command);
      const damage = resolution.hit ? damageForPower(command.power) : 0;
      const coreDamage = resolution.hit?.componentId === definition.coreComponentId ? Math.min(damage, GameConfig.attack.maxCoreDamage) : 0;
      if (!this.consumeEntitlement(playerId, state)) return { status: 402, body: { error: "No confirmed attack entitlement is available" } };

      if (resolution.hit) {
        if (resolution.hit.componentId === definition.coreComponentId && state.reign) {
          const pulseBlocksHit = state.reign.royalShieldPulseArmed;
          const appliedCoreDamage = pulseBlocksHit ? 0 : coreDamage;
          const coreIntegrity = Math.max(0, state.reign.coreIntegrity - appliedCoreDamage);
          state.reign = { ...state.reign, coreIntegrity, royalShieldPulseArmed: pulseBlocksHit ? false : state.reign.royalShieldPulseArmed };
          state.components = state.components.map((component) => component.componentId === definition.coreComponentId ? { ...component, hp: coreIntegrity, state: componentStateFromHp(coreIntegrity, state.reign!.coreMaxIntegrity) } : component);
          if (coreIntegrity === 0) {
            state.phase = "CORONATION";
            state.ruler = null;
            state.succession = { status: "CORE_BREACHED", decisiveCommandId: command.commandId };
            state.rulerPlayerId = playerId;
            state.coronationState = { status: "AWAITING_IDENTITY", conquerorPlayerId: playerId, openedAt: now, protectedUntil: null };
          }
        } else if (resolution.hit.componentId.startsWith("defense:")) {
          const defenseId = resolution.hit.componentId.slice("defense:".length);
          state.activeDefenses = state.activeDefenses.map((defense) => defense.id === defenseId ? { ...defense, hp: Math.max(0, defense.hp - 1) } : defense).filter((defense) => defense.hp > 0);
        } else {
          state.components = state.components.map((component) => component.componentId === resolution.hit!.componentId ? { ...component, hp: Math.max(0, component.hp - damage), state: componentStateFromHp(Math.max(0, component.hp - damage), component.maxHp), version: component.version + 1 } : component);
        }
      }

      state.activeTurn = null;
      state.worldVersion += 1;
      state.eventSequence += 1;
      if (state.phase === "ACTIVE") this.promoteNextTurn(state, now);
      const impact = resolution.hit ? { targetId: resolution.hit.componentId, damage, coreDamage, timeSeconds: resolution.hit.timeSeconds } : { targetId: "miss", damage: 0, coreDamage: 0, timeSeconds: null };
      const snapshot = projectPublicWorldSnapshot(state);
      const responseBody = { accepted: true, replayable: true, impact: { ...impact, blockedByRoyalShieldPulse: resolution.hit?.componentId === definition.coreComponentId && beforeSnapshot.reign?.royalShieldPulseArmed === true }, snapshot };
      this.state.storage.sql.exec("INSERT INTO attack_commands (command_id, player_id, request_json, result_json, created_at) VALUES (?, ?, ?, ?, ?)", command.commandId, playerId, requestJson, JSON.stringify({ status: 200, body: responseBody }), now);
      this.state.storage.sql.exec("INSERT INTO world_events (event_id, sequence, event_type, payload_json, created_at) VALUES (?, ?, ?, ?, ?)", command.commandId, state.eventSequence, "ATTACK_RESOLVED", JSON.stringify({ commandId: command.commandId, impact }), now);
      this.writeState(state);
      const delta = worldDelta(beforeSnapshot, snapshot, state.eventSequence);
      this.state.storage.sql.exec("UPDATE world_events SET payload_json = ? WHERE event_id = ?", JSON.stringify({ commandId: command.commandId, impact, delta }), command.commandId);
      this.pruneEvents();
      return { status: 200, body: responseBody, event: { type: "attack_resolved", eventSequence: state.eventSequence, worldVersion: state.worldVersion, impact, delta } };
    });
    if ("event" in result && result.event) this.broadcast(result.event);
    return json(result.body, result.status);
  }

  private openWebSocket(request: Request) {
    if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") return json({ error: "WebSocket upgrade required" }, 426);
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.state.acceptWebSocket(server);
    server.serializeAttachment({ joinedAt: Date.now() });
    this.sendSnapshot(server);
    return new Response(null, { status: 101, webSocket: client });
  }

  webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
    if (typeof message === "string" && message === "resync") this.sendSnapshot(ws);
  }

  webSocketClose() {}

  private sendSnapshot(ws: WebSocket) {
    const state = this.readState();
    ws.send(JSON.stringify({ type: "snapshot", eventSequence: state.eventSequence, worldVersion: state.worldVersion, snapshot: projectPublicWorldSnapshot(state) }));
  }

  private broadcast(event: unknown) {
    const message = JSON.stringify(event);
    for (const socket of this.state.getWebSockets()) {
      try { socket.send(message); } catch { socket.close(1011, "broadcast failed"); }
    }
  }
}

async function sessionFor(request: Request, env: Env) {
  const existing = await readSession(request, env.SESSION_SECRET);
  const session: PlayerSession = existing ?? { playerId: crypto.randomUUID(), issuedAt: Date.now(), expiresAt: Date.now() };
  return { session, token: existing ? null : await issueSession(session.playerId, env.SESSION_SECRET) };
}

async function ensurePlayer(env: Env, session: PlayerSession) {
  await env.DB.prepare("INSERT INTO players (id, created_at, last_seen_at) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET last_seen_at = excluded.last_seen_at").bind(session.playerId, session.issuedAt, Date.now()).run();
}

function withSessionCookie(response: Response, token: string | null) {
  if (!token) return response;
  const headers = new Headers(response.headers);
  headers.append("Set-Cookie", sessionCookie(token));
  return new Response(response.body, { status: response.status, headers });
}

const worker = {
  async reconcileArchives(env: Env) {
    const rows = await env.DB.prepare("SELECT archive_id, payload_json, attempts FROM archival_outbox WHERE status = 'PENDING' ORDER BY created_at LIMIT 25").all<{ archive_id: string; payload_json: string; attempts: number }>();
    for (const row of rows.results) {
      try {
        const archive = JSON.parse(row.payload_json) as { id: string; ordinal: number; rulerPlayerId: string | null; publicIdentityId: string | null; startedAt: number; endedAt: number; finalStateVersion: number; summary: PublicWorldSnapshot };
        await env.DB.prepare("INSERT OR IGNORE INTO reign_archive (id, ordinal, ruler_player_id, public_identity_id, started_at, ended_at, final_state_version, archive_summary_json, archived_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(archive.id, archive.ordinal, archive.rulerPlayerId, archive.publicIdentityId, archive.startedAt, archive.endedAt, archive.finalStateVersion, JSON.stringify(archive.summary), Date.now()).run();
        await env.DB.prepare("UPDATE archival_outbox SET status = 'COMPLETED', attempts = attempts + 1, updated_at = ?, last_error = NULL WHERE archive_id = ?").bind(Date.now(), row.archive_id).run();
      } catch (error) {
        await env.DB.prepare("UPDATE archival_outbox SET attempts = attempts + 1, updated_at = ?, last_error = ? WHERE archive_id = ?").bind(Date.now(), error instanceof Error ? error.message.slice(0, 240) : "archive reconciliation failed", row.archive_id).run();
      }
    }
  },
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (!env.SESSION_SECRET || !env.AUTHORITY_INTERNAL_SECRET || !env.DB) return json({ error: "Authority secrets or D1 binding are not configured" }, 503);
    if (!allowMutation(request)) return json({ error: "Too many requests. Try again shortly." }, 429, { "Retry-After": "60" });
    const id = env.GLOBAL_SIEGE.idFromName("global-throne-v1");
    const world = env.GLOBAL_SIEGE.get(id);

    if (request.method === "GET" && (url.pathname === "/world" || url.pathname === "/ws")) return world.fetch(request);

    if (request.method === "GET" && url.pathname === "/history") {
      const limit = Math.min(50, Math.max(1, Number.parseInt(url.searchParams.get("limit") ?? "20", 10) || 20));
      const rows = await env.DB.prepare("SELECT id, ordinal, public_identity_id, started_at, ended_at, final_state_version, archive_summary_json, archived_at FROM reign_archive ORDER BY ordinal DESC LIMIT ?").bind(limit).all<{
        id: string; ordinal: number; public_identity_id: string | null; started_at: number; ended_at: number | null; final_state_version: number | null; archive_summary_json: string | null; archived_at: number | null;
      }>();
      return json({ reigns: rows.results.map((row) => ({ id: row.id, ordinal: row.ordinal, publicIdentityId: row.public_identity_id, startedAt: row.started_at, endedAt: row.ended_at, finalStateVersion: row.final_state_version, summary: row.archive_summary_json ? JSON.parse(row.archive_summary_json) : null, archivedAt: row.archived_at })) });
    }

    const reignMatch = url.pathname.match(/^\/reigns\/([^/]+)$/);
    if (request.method === "GET" && reignMatch) {
      const row = await env.DB.prepare("SELECT id, ordinal, public_identity_id, started_at, ended_at, final_state_version, archive_summary_json, archived_at FROM reign_archive WHERE id = ?").bind(decodeURIComponent(reignMatch[1])).first<{
        id: string; ordinal: number; public_identity_id: string | null; started_at: number; ended_at: number | null; final_state_version: number | null; archive_summary_json: string | null; archived_at: number | null;
      }>();
      if (!row) return json({ error: "Reign not found" }, 404);
      return json({ reign: { id: row.id, ordinal: row.ordinal, publicIdentityId: row.public_identity_id, startedAt: row.started_at, endedAt: row.ended_at, finalStateVersion: row.final_state_version, summary: row.archive_summary_json ? JSON.parse(row.archive_summary_json) : null, archivedAt: row.archived_at } });
    }

    if (request.method === "POST" && url.pathname === "/session") {
      const { session, token } = await sessionFor(request, env);
      await ensurePlayer(env, session);
      return json({ sessionReady: true }, 200, token ? { "Set-Cookie": sessionCookie(token) } : undefined);
    }

    if (request.method === "GET" && url.pathname === "/queue") {
      const { session, token } = await sessionFor(request, env);
      await ensurePlayer(env, session);
      const response = await world.fetch(new Request(new URL("/queue", request.url), { headers: { "x-siege-player-id": session.playerId } }));
      return withSessionCookie(response, token);
    }

    if (request.method === "GET" && url.pathname === "/entitlements") {
      const { session, token } = await sessionFor(request, env);
      await ensurePlayer(env, session);
      const response = await world.fetch(new Request(new URL("/entitlements", request.url), { headers: { "x-siege-player-id": session.playerId } }));
      return withSessionCookie(response, token);
    }

    if (request.method === "POST" && url.pathname === "/attack") {
      const { session, token } = await sessionFor(request, env);
      await ensurePlayer(env, session);
      const body = await request.text();
      const response = await world.fetch(new Request(new URL("/attack", request.url), { method: "POST", headers: { "Content-Type": "application/json", "x-siege-player-id": session.playerId }, body }));
      return withSessionCookie(response, token);
    }

    if (request.method === "POST" && url.pathname === "/turn/claim") {
      const { session, token } = await sessionFor(request, env);
      await ensurePlayer(env, session);
      const response = await world.fetch(new Request(new URL("/turn/claim", request.url), { method: "POST", headers: { "x-siege-player-id": session.playerId } }));
      return withSessionCookie(response, token);
    }

    if (request.method === "POST" && url.pathname === "/internal/grants") {
      if (request.headers.get("x-authority-secret") !== env.AUTHORITY_INTERNAL_SECRET) return json({ error: "Forbidden" }, 403);
      const response = await world.fetch(new Request(new URL("/internal/grants", request.url), { method: "POST", headers: { "Content-Type": "application/json", "x-authority-secret": env.AUTHORITY_INTERNAL_SECRET }, body: await request.text() }));
      return response;
    }

    if (request.method === "POST" && url.pathname === "/defense/place") {
      const { session, token } = await sessionFor(request, env);
      await ensurePlayer(env, session);
      const body = await request.text();
      const response = await world.fetch(new Request(new URL("/defense/place", request.url), { method: "POST", headers: { "Content-Type": "application/json", "x-siege-player-id": session.playerId }, body }));
      return withSessionCookie(response, token);
    }

    if (request.method === "POST" && url.pathname === "/identity") {
      const { session, token } = await sessionFor(request, env);
      await ensurePlayer(env, session);
      let body: unknown;
      try { body = await request.json(); } catch { return withSessionCookie(json({ error: "Identity details must be valid JSON" }, 400), token); }
      const validation = validatePublicIdentity((body ?? {}) as PublicIdentityInput);
      if (!validation.ok) return withSessionCookie(json({ error: validation.error }, 422), token);
      const identityId = crypto.randomUUID();
      const now = Date.now();
      await env.DB.prepare("INSERT INTO public_identities (id, owner_player_id, identity_type, display_name, destination_url, destination_domain, logo_key, message, cta_choice, moderation_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NULL, ?, ?, 'APPROVED', ?, ?)").bind(identityId, session.playerId, validation.identity.identityType, validation.identity.displayName, validation.identity.destinationUrl, validation.identity.destinationDomain, validation.identity.message, validation.identity.ctaChoice, now, now).run();
      const response = await world.fetch(new Request(new URL("/internal/coronation", request.url), { method: "POST", headers: { "Content-Type": "application/json", "x-authority-secret": env.AUTHORITY_INTERNAL_SECRET }, body: JSON.stringify({ playerId: session.playerId, identityId, identity: validation.identity }) }));
      const payload = await response.json() as { archive?: { id: string; ordinal: number; rulerPlayerId: string | null; publicIdentityId: string | null; startedAt: number; endedAt: number; finalStateVersion: number; summary: PublicWorldSnapshot }; snapshot?: PublicWorldSnapshot; error?: string };
      if (!response.ok || !payload.snapshot || !payload.archive) {
        await env.DB.prepare("UPDATE public_identities SET moderation_status = 'REJECTED', updated_at = ? WHERE id = ?").bind(Date.now(), identityId).run();
        return withSessionCookie(json({ error: payload.error ?? "The throne could not be coronated" }, response.status), token);
      }
      const archive = payload.archive;
      const archivePayload = JSON.stringify(archive);
      await env.DB.prepare("INSERT OR IGNORE INTO archival_outbox (archive_id, payload_json, status, attempts, created_at, updated_at) VALUES (?, ?, 'PENDING', 0, ?, ?)").bind(archive.id, archivePayload, Date.now(), Date.now()).run();
      await env.DB.batch([
        env.DB.prepare("INSERT OR IGNORE INTO reign_archive (id, ordinal, ruler_player_id, public_identity_id, started_at, ended_at, final_state_version, archive_summary_json, archived_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(archive.id, archive.ordinal, archive.rulerPlayerId, archive.publicIdentityId, archive.startedAt, archive.endedAt, archive.finalStateVersion, JSON.stringify(archive.summary), Date.now()),
        env.DB.prepare("UPDATE public_identities SET updated_at = ? WHERE id = ?").bind(Date.now(), identityId),
        env.DB.prepare("UPDATE archival_outbox SET status = 'COMPLETED', updated_at = ? WHERE archive_id = ?").bind(Date.now(), archive.id),
      ]);
      return withSessionCookie(json({ coronated: true, identityId, snapshot: payload.snapshot }), token);
    }

    if (request.method === "POST" && url.pathname === "/recovery/create") {
      const { session, token } = await sessionFor(request, env);
      await ensurePlayer(env, session);
      const eligible = await world.fetch(new Request(new URL("/internal/recovery/eligible", request.url), { method: "POST", headers: { "x-authority-secret": env.AUTHORITY_INTERNAL_SECRET, "x-siege-player-id": session.playerId } }));
      if (!eligible.ok) return withSessionCookie(new Response(await eligible.text(), { status: eligible.status, headers: { "Content-Type": "application/json" } }), token);
      const code = `SIEGE-${crypto.randomUUID().replaceAll("-", "").slice(0, 24).toUpperCase()}`;
      const now = Date.now();
      await env.DB.prepare("INSERT INTO recovery_tokens (token_hash, player_id, created_at, expires_at, used_at) VALUES (?, ?, ?, ?, NULL)").bind(await sha256(code), session.playerId, now, now + 30 * 24 * 60 * 60 * 1000).run();
      return withSessionCookie(json({ recoveryCode: code, expiresAt: now + 30 * 24 * 60 * 60 * 1000 }), token);
    }

    if (request.method === "POST" && url.pathname === "/recovery/claim") {
      let body: unknown;
      try { body = await request.json(); } catch { return json({ error: "Recovery code must be valid JSON" }, 400); }
      const code = body && typeof body === "object" && "code" in body ? (body as { code?: unknown }).code : null;
      if (!validRecoveryCode(code)) return json({ error: "Recovery code is invalid" }, 422);
      const normalized = code.trim().toUpperCase();
      const now = Date.now();
      const record = await env.DB.prepare("SELECT player_id FROM recovery_tokens WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?").bind(await sha256(normalized), now).first<{ player_id: string }>();
      if (!record) return json({ error: "Recovery code is invalid or expired" }, 401);
      const claimed = await env.DB.prepare("UPDATE recovery_tokens SET used_at = ? WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?").bind(now, await sha256(normalized), now).run();
      if (!claimed.meta.changes) return json({ error: "Recovery code was already used" }, 409);
      const recoveredSession: PlayerSession = { playerId: record.player_id, issuedAt: now, expiresAt: now };
      await ensurePlayer(env, recoveredSession);
      return withSessionCookie(json({ recovered: true }), await issueSession(record.player_id, env.SESSION_SECRET));
    }

    if (request.method === "POST" && url.pathname === "/assets/upload") {
      const { session, token } = await sessionFor(request, env);
      await ensurePlayer(env, session);
      const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.toLowerCase() ?? "";
      const contentLength = Number.parseInt(request.headers.get("content-length") ?? "0", 10);
      if (!contentLength || contentLength > 2_000_000) return withSessionCookie(json({ error: "Asset must be between 1 byte and 2 MB" }, 413), token);
      const bytes = new Uint8Array(await request.arrayBuffer());
      const extension = imageExtension(contentType, bytes);
      if (!extension) return withSessionCookie(json({ error: "Only PNG, JPEG, and WebP images with matching signatures are accepted" }, 415), token);
      const assetKey = `rulers/${session.playerId}/${crypto.randomUUID()}.${extension}`;
      await env.RULER_ASSETS.put(assetKey, bytes, { httpMetadata: { contentType }, customMetadata: { ownerPlayerId: session.playerId, moderationStatus: "AUTOMATED_APPROVED" } });
      const now = Date.now();
      await env.DB.prepare("INSERT INTO ruler_assets (asset_key, owner_player_id, content_type, byte_size, moderation_status, created_at, updated_at) VALUES (?, ?, ?, ?, 'AUTOMATED_APPROVED', ?, ?)").bind(assetKey, session.playerId, contentType, bytes.byteLength, now, now).run();
      return withSessionCookie(json({ assetKey, moderationStatus: "AUTOMATED_APPROVED", sanitation: "signature-checked; re-encoding remains a hardening gate" }), token);
    }

    const assetMatch = url.pathname.match(/^\/assets\/(.+)$/);
    if (request.method === "GET" && assetMatch) {
      const assetKey = decodeURIComponent(assetMatch[1]);
      const asset = await env.DB.prepare("SELECT content_type, moderation_status FROM ruler_assets WHERE asset_key = ?").bind(assetKey).first<{ content_type: string; moderation_status: string }>();
      if (!asset || asset.moderation_status !== "AUTOMATED_APPROVED") return new Response("Not found", { status: 404 });
      const object = await env.RULER_ASSETS.get(assetKey);
      if (!object) return new Response("Not found", { status: 404 });
      return new Response(object.body, { headers: { "Content-Type": asset.content_type, "Cache-Control": "public, max-age=300" } });
    }

    if (request.method === "POST" && url.pathname === "/checkout") {
      const { session, token } = await sessionFor(request, env);
      await ensurePlayer(env, session);
      let purchaseKind: "ATTACK_PACK" | "DEFENSE_PACK" = "ATTACK_PACK";
      try {
        const requested = await request.clone().json() as { purchase_kind?: unknown };
        if (requested.purchase_kind === "DEFENSE_PACK") purchaseKind = "DEFENSE_PACK";
      } catch {}
      const productId = purchaseKind === "DEFENSE_PACK" ? env.DODO_DEFENSE_PRODUCT_ID : env.DODO_ATTACK_PRODUCT_ID;
      if (!env.DODO_PAYMENTS_API_KEY || !productId) return withSessionCookie(json({ error: "Dodo Payments is not configured for this purchase" }, 503), token);
      const intentId = crypto.randomUUID();
      const now = Date.now();
      const quantity = purchaseKind === "ATTACK_PACK" ? 3 : 1;
      const worldSnapshot = await world.fetch(new Request(new URL("/world", request.url))).then((response) => response.json()) as PublicWorldSnapshot;
      const expectedAmountMinor = purchaseKind === "ATTACK_PACK" ? 300 : worldSnapshot.reign?.nextDefensePriceMinor ?? defensePriceForTier(0);
      await env.DB.prepare("INSERT INTO purchase_intents (intent_id, player_id, purchase_kind, expected_product_id, expected_quantity, expected_amount_minor, expected_currency, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 'USD', 'PENDING', ?, ?)").bind(intentId, session.playerId, purchaseKind, productId, quantity, expectedAmountMinor, now, now).run();
      const response = await fetch(`${dodoBaseUrl(env.DODO_PAYMENTS_ENVIRONMENT)}/checkouts`, { method: "POST", headers: { Authorization: `Bearer ${env.DODO_PAYMENTS_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ product_cart: [{ product_id: productId, quantity: 1 }], return_url: new URL("/?checkout=return", request.url).toString(), metadata: { purchase_intent_id: intentId } }), cache: "no-store" });
      if (!response.ok) await env.DB.prepare("UPDATE purchase_intents SET status = 'FAILED', updated_at = ? WHERE intent_id = ? AND status = 'PENDING'").bind(Date.now(), intentId).run();
      return withSessionCookie(new Response(await response.text(), { status: response.status, headers: { "Content-Type": "application/json" } }), token);
    }

    if (request.method === "POST" && url.pathname === "/webhooks/dodo") {
      const rawBody = await request.text();
      if (!verifyDodoWebhook(rawBody, request.headers, env.DODO_PAYMENTS_WEBHOOK_KEY)) return json({ error: "Invalid webhook signature" }, 401);
      let event: Record<string, unknown>;
      try { event = JSON.parse(rawBody) as Record<string, unknown>; } catch { return json({ error: "Invalid webhook JSON" }, 400); }
      const eventId = typeof event.id === "string" ? event.id : request.headers.get("webhook-id");
      if (!eventId) return json({ error: "Webhook event ID is required" }, 400);
      const now = Date.now();
      const inserted = await env.DB.prepare("INSERT OR IGNORE INTO webhook_events (provider, provider_event_id, received_at, payload_json) VALUES ('DODO', ?, ?, ?)").bind(eventId, now, rawBody).run();
      const duplicate = !inserted.meta.changes;
      const intent = await env.DB.prepare("SELECT intent_id, player_id, purchase_kind, expected_product_id, expected_quantity, expected_amount_minor, expected_currency, status FROM purchase_intents WHERE intent_id = ?").bind(((): string | null => {
        const data = (event.data && typeof event.data === "object" ? event.data : event) as Record<string, unknown>;
        const metadata = (data.metadata && typeof data.metadata === "object" ? data.metadata : {}) as Record<string, unknown>;
        return typeof metadata.purchase_intent_id === "string" ? metadata.purchase_intent_id : null;
      })()).first<PurchaseIntent>();
      const decision = evaluateDodoPayment(event, intent, duplicate);
      if (!decision.ok) return json(decision.receipt, decision.status);
      const grantId = decision.grant.grantId;
      const purchaseIntentId = decision.grant.intentId;
      const paymentId = decision.grant.paymentId;
      const playerId = decision.grant.playerId;
      const kind = decision.grant.kind;
      const quantity = decision.grant.quantity;
      await env.DB.batch([
        env.DB.prepare("INSERT OR IGNORE INTO payments (id, provider, provider_payment_id, player_id, purchase_kind, quantity, status, created_at, updated_at) VALUES (?, 'DODO', ?, ?, ?, ?, 'PAID', ?, ?)").bind(paymentId, paymentId, playerId, kind, quantity, now, now),
        env.DB.prepare("INSERT OR IGNORE INTO entitlement_ledger (id, player_id, payment_id, kind, quantity, status, created_at) VALUES (?, ?, ?, ?, ?, 'PENDING_GRANT', ?)").bind(grantId, playerId, paymentId, kind, quantity, now),
        env.DB.prepare("UPDATE purchase_intents SET status = 'PAID', updated_at = ?, paid_at = COALESCE(paid_at, ?) WHERE intent_id = ?").bind(now, now, purchaseIntentId),
      ]);
      const grantResponse = await world.fetch(new Request(new URL("/internal/grants", request.url), { method: "POST", headers: { "Content-Type": "application/json", "x-authority-secret": env.AUTHORITY_INTERNAL_SECRET }, body: JSON.stringify({ grantId, playerId, kind, quantity }) }));
      if (!grantResponse.ok) return json({ received: true, duplicate, entitlementIssued: false, reason: "Grant pending reconciliation" }, 202);
      await env.DB.prepare("UPDATE entitlement_ledger SET status = 'GRANTED' WHERE id = ?").bind(grantId).run();
      return json({ received: true, duplicate, entitlementIssued: true });
    }

    return json({ error: "Not found" }, 404);
  },
};

function corsOrigin(request: Request) {
  const origin = request.headers.get("Origin");
  if (!origin) return null;
  const allowed = new Set(["https://siegeme.com", "https://www.siegeme.com", "http://localhost:5188", "http://127.0.0.1:5188"]);
  return allowed.has(origin) ? origin : null;
}

const publicWorker = {
  async fetch(request: Request, env: Env) {
    const origin = corsOrigin(request);
    if (request.method === "OPTIONS") return new Response(null, { status: origin ? 204 : 403, headers: origin ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", Vary: "Origin" } : undefined });
    const response = await worker.fetch(request, env);
    if (!origin || response.status === 101) return response;
    const headers = new Headers(response.headers);
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.append("Vary", "Origin");
    return new Response(response.body, { status: response.status, headers });
  },
  async scheduled(_event: ScheduledController, env: Env) {
    await worker.reconcileArchives(env);
  },
};

export default publicWorker;
