import type { D1Database, DurableObjectNamespace, DurableObjectState } from "@cloudflare/workers-types";
import { Webhook } from "standardwebhooks";
import type { AttackQueueEntry, AuthoritativeWorldState, ActiveTurn } from "../../src/game/domain/types";
import { BALLISTIC_SIMULATION_VERSION, damageForPower, resolveBallisticShot } from "../../src/game/simulation/ballistics";
import { componentStateFromHp } from "../../src/game/simulation/attack";
import { createInitialAuthoritativeWorldState, migrateAuthoritativeWorldState, projectPublicWorldSnapshot } from "../../src/game/world/initial-snapshot";
import { generateFortress } from "../../src/game/world/generator";
import { issueSession, readSession, sessionCookie, type PlayerSession } from "./session";

type Env = {
  GLOBAL_SIEGE: DurableObjectNamespace;
  DB: D1Database;
  SESSION_SECRET: string;
  AUTHORITY_INTERNAL_SECRET: string;
  DODO_PAYMENTS_API_KEY?: string;
  DODO_PAYMENTS_ENVIRONMENT?: "test_mode" | "live_mode";
  DODO_ATTACK_PRODUCT_ID?: string;
  DODO_PAYMENTS_WEBHOOK_KEY?: string;
};

type AttackCommand = { commandId: string; reignId: string; turnId: string; expectedWorldVersion: number; simulationVersion: "ballistic-v1"; yaw: number; elevation: number; power: number };
type StoredAttackResult = { status: number; body: Record<string, unknown> };
type TurnClaimResult = { status: number; body: Record<string, unknown> };
type EntitlementGrant = { grantId: string; playerId: string; kind: "ATTACK_PACK" | "DEFENSE_PACK"; quantity: number };
type PurchaseIntent = { intent_id: string; player_id: string; purchase_kind: string; expected_product_id: string; expected_quantity: number; expected_amount_minor: number; expected_currency: string; status: string };

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
    && typeof yaw === "number" && yaw >= -0.72 && yaw <= 0.72
    && typeof elevation === "number" && elevation >= 0.5 && elevation <= 0.86
    && typeof power === "number" && power >= 0.25 && power <= 1;
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
    this.state.storage.sql.exec(`CREATE TABLE IF NOT EXISTS world_snapshot (id TEXT PRIMARY KEY, snapshot_json TEXT NOT NULL); CREATE TABLE IF NOT EXISTS live_entitlements (grant_id TEXT PRIMARY KEY, player_id TEXT NOT NULL, kind TEXT NOT NULL, quantity_granted INTEGER NOT NULL, quantity_remaining INTEGER NOT NULL); CREATE TABLE IF NOT EXISTS world_events (event_id TEXT PRIMARY KEY, sequence INTEGER NOT NULL, event_type TEXT NOT NULL, payload_json TEXT NOT NULL, created_at INTEGER NOT NULL); CREATE TABLE IF NOT EXISTS attack_commands (command_id TEXT PRIMARY KEY, player_id TEXT NOT NULL, request_json TEXT NOT NULL, result_json TEXT NOT NULL, created_at INTEGER NOT NULL);`);
  }

  async fetch(request: Request) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/world") {
      const snapshot = this.readSnapshot();
      return json(url.searchParams.get("empty") === "1" ? { ...snapshot, phase: "CORONATION", currentReignId: null, reign: null, ruler: null } : snapshot);
    }
    if (request.method === "GET" && url.pathname === "/ws") return this.openWebSocket(request);
    if (request.method === "POST" && url.pathname === "/turn/claim") return this.handleTurnClaim(request);
    if (request.method === "POST" && url.pathname === "/attack") return this.handleAttack(request);
    if (request.method === "POST" && url.pathname === "/internal/grants") return this.handleGrant(request);
    return json({ error: "Not found" }, 404);
  }

  private readSnapshot() {
    return projectPublicWorldSnapshot(this.readState());
  }

  private readState(): AuthoritativeWorldState {
    const row = this.state.storage.sql.exec("SELECT snapshot_json FROM world_snapshot WHERE id = ?", "world:global").toArray()[0] as { snapshot_json?: string } | undefined;
    if (row?.snapshot_json) {
      const parsed = JSON.parse(row.snapshot_json) as Partial<AuthoritativeWorldState>;
      const migrated = migrateAuthoritativeWorldState(parsed);
      if (migrated) {
        if (parsed.schemaVersion !== 3) this.writeState(migrated);
        return migrated;
      }
    }
    const state = createInitialAuthoritativeWorldState();
    this.state.storage.sql.exec("INSERT INTO world_snapshot (id, snapshot_json) VALUES (?, ?)", "world:global", JSON.stringify(state));
    return state;
  }

  private writeState(state: AuthoritativeWorldState) {
    const row = this.state.storage.sql.exec("SELECT snapshot_json FROM world_snapshot WHERE id = ?", "world:global").toArray()[0] as { snapshot_json?: string } | undefined;
    if (row?.snapshot_json) {
      const previous = migrateAuthoritativeWorldState(JSON.parse(row.snapshot_json));
      const previousIntegrity = previous?.reign?.coreIntegrity;
      const nextIntegrity = state.reign?.coreIntegrity;
      if (previous && previous.currentReignId === state.currentReignId && typeof previousIntegrity === "number" && typeof nextIntegrity === "number" && nextIntegrity > previousIntegrity) {
        throw new Error("Core Integrity cannot increase during a reign");
      }
    }
    this.state.storage.sql.exec("UPDATE world_snapshot SET snapshot_json = ? WHERE id = ?", JSON.stringify(state), "world:global");
  }

  private hasAttackEntitlement(playerId: string) {
    return Boolean(this.state.storage.sql.exec("SELECT grant_id FROM live_entitlements WHERE player_id = ? AND kind = 'ATTACK_PACK' AND quantity_remaining > 0 ORDER BY rowid LIMIT 1", playerId).toArray()[0]);
  }

  private newTurn(playerId: string, reignId: string, now: number): ActiveTurn {
    return { id: crypto.randomUUID(), playerId, reignId, startedAt: now, expiresAt: now + 20_000, shotNumber: 1 };
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

  private async handleGrant(request: Request) {
    if (request.headers.get("x-authority-secret") !== this.env.AUTHORITY_INTERNAL_SECRET) return json({ error: "Forbidden" }, 403);
    const grant = await request.json() as Partial<EntitlementGrant>;
    if (!grant.grantId || !grant.playerId || !grant.kind || typeof grant.quantity !== "number" || !Number.isInteger(grant.quantity) || grant.quantity <= 0) return json({ error: "Invalid entitlement grant" }, 422);
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

  private handleTurnClaim(request: Request) {
    const playerId = request.headers.get("x-siege-player-id");
    if (!playerId) return json({ error: "Player session is required" }, 401);
    const result: TurnClaimResult = this.state.storage.transactionSync(() => {
      const state = this.readState();
      const now = Date.now();
      this.expireOrPromoteTurn(state, now);
      if (state.phase !== "ACTIVE") return { status: 409, body: { error: "The throne is in coronation and cannot accept attacks" } };
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
      if (command.reignId !== state.currentReignId) return { status: 409, body: { error: "Command targets a different reign" } };
      if (command.expectedWorldVersion !== state.worldVersion) return { status: 409, body: { error: "Command targets a stale world version" } };
      if (!state.activeTurn || state.activeTurn.id !== command.turnId || state.activeTurn.playerId !== playerId) return { status: 409, body: { error: "No active attack turn belongs to this player" } };

      const definition = generateFortress(state.worldSeed, state.generatorVersion);
      const resolution = resolveBallisticShot(definition, projectPublicWorldSnapshot(state), command);
      const damage = resolution.hit ? damageForPower(command.power) : 0;
      const coreDamage = resolution.hit?.componentId === definition.coreComponentId ? Math.min(damage, 20) : 0;
      if (!this.consumeEntitlement(playerId, state)) return { status: 402, body: { error: "No confirmed attack entitlement is available" } };

      if (resolution.hit) {
        if (resolution.hit.componentId === definition.coreComponentId && state.reign) {
          const coreIntegrity = Math.max(0, state.reign.coreIntegrity - coreDamage);
          state.reign = { ...state.reign, coreIntegrity };
          state.components = state.components.map((component) => component.componentId === definition.coreComponentId ? { ...component, hp: coreIntegrity, state: componentStateFromHp(coreIntegrity, state.reign!.coreMaxIntegrity) } : component);
          if (coreIntegrity === 0) {
            state.phase = "CORONATION";
            state.ruler = null;
            state.succession = { status: "CORE_BREACHED", decisiveCommandId: command.commandId };
            state.rulerPlayerId = playerId;
          }
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
      const responseBody = { accepted: true, replayable: true, impact, snapshot };
      this.state.storage.sql.exec("INSERT INTO attack_commands (command_id, player_id, request_json, result_json, created_at) VALUES (?, ?, ?, ?, ?)", command.commandId, playerId, requestJson, JSON.stringify({ status: 200, body: responseBody }), now);
      this.state.storage.sql.exec("INSERT INTO world_events (event_id, sequence, event_type, payload_json, created_at) VALUES (?, ?, ?, ?, ?)", command.commandId, state.eventSequence, "ATTACK_RESOLVED", JSON.stringify({ commandId: command.commandId, impact }), now);
      this.writeState(state);
      return { status: 200, body: responseBody, event: { type: "attack_resolved", eventSequence: state.eventSequence, worldVersion: state.worldVersion, snapshot } };
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
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (!env.SESSION_SECRET || !env.AUTHORITY_INTERNAL_SECRET || !env.DB) return json({ error: "Authority secrets or D1 binding are not configured" }, 503);
    const id = env.GLOBAL_SIEGE.idFromName("global-throne-v1");
    const world = env.GLOBAL_SIEGE.get(id);

    if (request.method === "GET" && (url.pathname === "/world" || url.pathname === "/ws")) return world.fetch(request);

    if (request.method === "POST" && url.pathname === "/session") {
      const { session, token } = await sessionFor(request, env);
      await ensurePlayer(env, session);
      return json({ sessionReady: true }, 200, token ? { "Set-Cookie": sessionCookie(token) } : undefined);
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

    if (request.method === "POST" && url.pathname === "/checkout") {
      const { session, token } = await sessionFor(request, env);
      await ensurePlayer(env, session);
      if (!env.DODO_PAYMENTS_API_KEY || !env.DODO_ATTACK_PRODUCT_ID) return withSessionCookie(json({ error: "Dodo Payments is not configured for this environment" }, 503), token);
      const intentId = crypto.randomUUID();
      const now = Date.now();
      await env.DB.prepare("INSERT INTO purchase_intents (intent_id, player_id, purchase_kind, expected_product_id, expected_quantity, expected_amount_minor, expected_currency, status, created_at, updated_at) VALUES (?, ?, 'ATTACK_PACK', ?, 3, 300, 'USD', 'PENDING', ?, ?)").bind(intentId, session.playerId, env.DODO_ATTACK_PRODUCT_ID, now, now).run();
      const response = await fetch(`${dodoBaseUrl(env.DODO_PAYMENTS_ENVIRONMENT)}/checkouts`, { method: "POST", headers: { Authorization: `Bearer ${env.DODO_PAYMENTS_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ product_cart: [{ product_id: env.DODO_ATTACK_PRODUCT_ID, quantity: 1 }], return_url: new URL("/?checkout=return", request.url).toString(), metadata: { purchase_intent_id: intentId } }), cache: "no-store" });
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
      const data = (event.data && typeof event.data === "object" ? event.data : event) as Record<string, unknown>;
      const metadata = (data.metadata && typeof data.metadata === "object" ? data.metadata : {}) as Record<string, unknown>;
      const purchaseIntentId = typeof metadata.purchase_intent_id === "string" ? metadata.purchase_intent_id : null;
      const paymentId = typeof data.payment_id === "string" ? data.payment_id : typeof data.id === "string" ? data.id : null;
      const paid = typeof event.type === "string" && /succeed|success|paid|completed/i.test(event.type);
      if (!purchaseIntentId || !paymentId || !paid) return json({ received: true, duplicate, entitlementIssued: false, reason: "Non-payment or missing purchase intent" }, 202);
      const intent = await env.DB.prepare("SELECT intent_id, player_id, purchase_kind, expected_product_id, expected_quantity, expected_amount_minor, expected_currency, status FROM purchase_intents WHERE intent_id = ?").bind(purchaseIntentId).first<PurchaseIntent>();
      const productCart = Array.isArray(data.product_cart) ? data.product_cart as Array<Record<string, unknown>> : [];
      const productId = typeof data.product_id === "string" ? data.product_id : typeof productCart[0]?.product_id === "string" ? productCart[0].product_id : null;
      const totalAmount = typeof data.total_amount === "number" ? data.total_amount : null;
      const currency = typeof data.currency === "string" ? data.currency : null;
      if (!intent || intent.purchase_kind !== "ATTACK_PACK" || intent.status === "FAILED" || productId !== intent.expected_product_id || totalAmount !== intent.expected_amount_minor || currency?.toUpperCase() !== intent.expected_currency) return json({ received: true, duplicate, entitlementIssued: false, reason: "Payment does not match purchase intent" }, 422);
      const playerId = intent.player_id;
      const quantity = intent.expected_quantity;
      const grantId = `dodo:${paymentId}:ATTACK_PACK`;
      await env.DB.batch([
        env.DB.prepare("INSERT OR IGNORE INTO payments (id, provider, provider_payment_id, player_id, purchase_kind, quantity, status, created_at, updated_at) VALUES (?, 'DODO', ?, ?, 'ATTACK_PACK', ?, 'PAID', ?, ?)").bind(paymentId, paymentId, playerId, quantity, now, now),
        env.DB.prepare("INSERT OR IGNORE INTO entitlement_ledger (id, player_id, payment_id, kind, quantity, status, created_at) VALUES (?, ?, ?, 'ATTACK_PACK', ?, 'PENDING_GRANT', ?)").bind(grantId, playerId, paymentId, quantity, now),
        env.DB.prepare("UPDATE purchase_intents SET status = 'PAID', updated_at = ?, paid_at = COALESCE(paid_at, ?) WHERE intent_id = ?").bind(now, now, purchaseIntentId),
      ]);
      const grantResponse = await world.fetch(new Request(new URL("/internal/grants", request.url), { method: "POST", headers: { "Content-Type": "application/json", "x-authority-secret": env.AUTHORITY_INTERNAL_SECRET }, body: JSON.stringify({ grantId, playerId, kind: "ATTACK_PACK", quantity }) }));
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
};

export default publicWorker;
