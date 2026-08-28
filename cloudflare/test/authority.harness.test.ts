import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createTestHarness, type TestHarness } from "wrangler";
import { Webhook } from "standardwebhooks";
import type { PublicWorldSnapshot } from "../../src/game/domain/types";
import { issueSession, SESSION_COOKIE } from "../src/session";
import { BALLISTIC_SIMULATION_VERSION, resolveBallisticShot } from "../../src/game/simulation/ballistics";
import { generateFortress } from "../../src/game/world/generator";

const SESSION_SECRET = "harness-session-secret-0123456789abcdef";
const INTERNAL_SECRET = "harness-internal-secret-0123456789abcdef";
const WEBHOOK_SECRET = `whsec_${Buffer.from("harness-webhook-secret-0123456789").toString("base64")}`;
const ATTACK_PRODUCT = "prod_attack_harness";
const DEFENSE_PRODUCT = "prod_defense_harness";
const SLOW = 180_000;

type LedgerEnv = {
  DB: {
    prepare(query: string): {
      run(): Promise<unknown>;
      bind(...values: unknown[]): { run(): Promise<unknown>; first<T = Record<string, unknown>>(): Promise<T | null>; all<T = Record<string, unknown>>(): Promise<{ results: T[] }> };
    };
    exec(query: string): Promise<unknown>;
  };
};

type WorldSnapshot = {
  worldVersion: number;
  phase: string;
  generatorVersion: string;
  worldSeed: string;
  currentReignId: string;
  reign: { ordinal: number; coreIntegrity: number; coreMaxIntegrity: number } | null;
  ruler: { displayName: string } | null;
  activeDefenses: PublicWorldSnapshot["activeDefenses"];
  activeAttack: PublicWorldSnapshot["activeAttack"];
  components: Array<{ componentId: string; state: string }>;
};

let harness: TestHarness;
let env: LedgerEnv;

type HarnessInit = Parameters<TestHarness["fetch"]>[1];
type HarnessResponse = Awaited<ReturnType<TestHarness["fetch"]>>;
type Call = (path: string, init?: HarnessInit) => Promise<HarnessResponse>;

// The authority rate limits mutating paths (20/min); the harness behaves like
// a real client and backs off on 429 instead of hammering through.
async function callThrough(path: string, init: HarnessInit = {}): Promise<HarnessResponse> {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const response = await harness.fetch(path, { ...init, redirect: "manual" });
    if (response.status !== 429) return response;
    await new Promise((resolve) => setTimeout(resolve, 5_000));
  }
  throw new Error(`Harness call kept receiving 429: ${path}`);
}

async function player(playerId: string): Promise<Call> {
  const token = await issueSession(playerId, SESSION_SECRET);
  const cookie = `${SESSION_COOKIE}=${token}`;
  return (path, init = {}) => callThrough(path, {
    ...init,
    headers: { ...(init.headers as Record<string, string> | undefined), cookie },
  });
}

async function grant(playerId: string, kind: "ATTACK_PACK" | "DEFENSE_PACK", quantity: number) {
  const response = await harness.fetch("/internal/grants", {
    method: "POST",
    headers: { "content-type": "application/json", "x-authority-secret": INTERNAL_SECRET },
    body: JSON.stringify({ grantId: `harness:${playerId}:${kind}:${crypto.randomUUID()}`, playerId, kind, quantity }),
  });
  void response;
  expect(response.status).toBe(200);
}

async function seedIntent(playerId: string, kind: "ATTACK_PACK" | "DEFENSE_PACK", quantity: number, amountMinor: number, productId: string) {
  const id = crypto.randomUUID();
  await env.DB.prepare("INSERT INTO purchase_intents (intent_id, player_id, purchase_kind, expected_product_id, expected_quantity, expected_amount_minor, expected_currency, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 'USD', 'PENDING', ?, ?)")
    .bind(id, playerId, kind, productId, quantity, amountMinor, Date.now(), Date.now()).run();
  return id;
}

async function signedWebhook(event: Record<string, unknown>) {
  const body = JSON.stringify(event);
  const id = typeof event.id === "string" ? event.id : crypto.randomUUID();
  const signature = new Webhook(WEBHOOK_SECRET).sign(id, new Date(), body);
  return harness.fetch("/webhooks/dodo", {
    method: "POST",
    headers: { "content-type": "application/json", "webhook-id": id, "webhook-timestamp": String(Math.floor(Date.now() / 1000)), "webhook-signature": signature },
    body,
  });
}

async function world(): Promise<WorldSnapshot> {
  return await (await harness.fetch("/world")).json() as WorldSnapshot;
}

async function fireShot(call: Call, aim: { yaw: number; elevation: number; power: number }, turnId: string, commandId = crypto.randomUUID(), projectile?: "STANDARD" | "BREAKER") {
  const snapshot = await world();
  const response = await call("/attack", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ commandId, reignId: snapshot.currentReignId, turnId, expectedWorldVersion: snapshot.worldVersion, simulationVersion: BALLISTIC_SIMULATION_VERSION, ...(projectile ? { projectile } : {}), ...aim }),
  });
  return { response, payload: await response.json() as { accepted?: boolean; projectile?: string; impact?: { targetId: string; damage: number; point: [number, number, number] | null; timeSeconds: number | null }; snapshot?: WorldSnapshot; error?: string; replay?: boolean } };
}

async function claim(call: Call) {
  const response = await call("/turn/claim", { method: "POST" });
  return { response, payload: await response.json() as { status?: string; turn?: { id: string }; position?: number; error?: string } };
}

async function cancel(call: Call) {
  const response = await call("/turn/cancel", { method: "POST" });
  return { response, payload: await response.json() as { cancelled?: boolean; wasActive?: boolean; wasQueued?: boolean; error?: string } };
}

beforeAll(async () => {
  harness = createTestHarness({
    workers: [{
      configPath: "cloudflare/wrangler.toml",
      secrets: {
        SESSION_SECRET,
        AUTHORITY_INTERNAL_SECRET: INTERNAL_SECRET,
        DODO_PAYMENTS_WEBHOOK_KEY: WEBHOOK_SECRET,
        DODO_PAYMENTS_API_KEY: "harness-dodo-key",
        DODO_ATTACK_PRODUCT_ID: ATTACK_PRODUCT,
        DODO_DEFENSE_PRODUCT_ID: DEFENSE_PRODUCT,
        MODERATOR_SECRET: "harness-moderator-secret",
      },
    }],
  });
  await harness.listen();
}, SLOW);

beforeEach(async () => {
  await harness.reset();
  env = (await harness.getWorker().getEnv()) as LedgerEnv;
  const migrations = readdirSync(join(process.cwd(), "cloudflare", "migrations")).filter((name) => name.endsWith(".sql")).sort();
  for (const migration of migrations) {
    const sql = readFileSync(join(process.cwd(), "cloudflare", "migrations", migration), "utf8");
    for (const statement of sql.split(";").map((part) => part.trim()).filter(Boolean)) {
      await env.DB.prepare(statement).run();
    }
  }
}, SLOW);

afterAll(async () => {
  await harness.close();
}, SLOW);

describe("siege authority harness (real Worker + Durable Object + D1)", () => {
  it("supports a one-time operator bootstrap, locks identity changes, and serves a public share card", async () => {
    const boot = await harness.fetch("/internal/bootstrap", {
      method: "POST",
      headers: { "content-type": "application/json", "x-authority-secret": INTERNAL_SECRET },
      body: JSON.stringify({ worldSeed: "seed:harness-bootstrap", generatorVersion: "fortress-0.1.0", playerId: "operator-ruler", identityId: "identity:harness-bootstrap", identity: { displayName: "Harness Hold", identityType: "Community", message: "Bootstrapped by the operator." } }),
    });
    expect(boot.status).toBe(200);
    const bootBody = await boot.json() as { snapshot: WorldSnapshot };
    expect(bootBody.snapshot.worldSeed).toBe("seed:harness-bootstrap");
    expect(bootBody.snapshot.ruler?.displayName).toBe("Harness Hold");

    const duplicate = await harness.fetch("/internal/bootstrap", { method: "POST", headers: { "content-type": "application/json", "x-authority-secret": INTERNAL_SECRET }, body: JSON.stringify({ worldSeed: "seed:should-not-replace", playerId: "other-ruler", identityId: "identity:other", identity: { displayName: "Other", identityType: "Person" } }) });
    expect(duplicate.status).toBe(409);

    const disabled = await harness.fetch("/moderation/identities/identity:harness-bootstrap", { method: "POST", headers: { "content-type": "application/json", "x-moderator-secret": "harness-moderator-secret" }, body: JSON.stringify({ status: "DISABLED", reason: "Operator safety review", actor: "moderator-1" }) });
    expect(disabled.status).toBe(200);
    expect((await world()).ruler).toBeNull();

    const share = await harness.fetch("/share-card/current.svg");
    expect(share.status).toBe(200);
    expect(share.headers.get("content-type")).toContain("image/svg+xml");
    expect(await share.text()).toContain("Siege Me");
  }, SLOW);

  it("issues a silent HttpOnly Secure SameSite=Lax session without a login wall", async () => {
    const response = await harness.fetch("/session", { method: "POST" });
    expect(response.status).toBe(200);
    const setCookie = response.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("Secure");
    expect(setCookie).toContain("SameSite=Lax");
  }, SLOW);

  it("keeps uploaded ruler assets owner-scoped and deletes both blob and metadata", async () => {
    const owner = await player("asset-owner");
    const other = await player("asset-other");
    const png = new Uint8Array([
      137, 80, 78, 71, 13, 10, 26, 10,
      0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137,
      0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
    ]);
    const upload = await owner("/assets/upload", { method: "POST", headers: { "content-type": "image/png" }, body: png });
    expect(upload.status).toBe(200);
    const assetKey = (await upload.json() as { assetKey: string }).assetKey;
    expect((await harness.fetch(`/assets/${assetKey}`)).status).toBe(200);
    expect((await other(`/assets/${assetKey}`, { method: "DELETE" })).status).toBe(403);
    expect((await owner(`/assets/${assetKey}`, { method: "DELETE" })).status).toBe(200);
    expect((await harness.fetch(`/assets/${assetKey}`)).status).toBe(404);
  }, SLOW);

  it("rejects attacks and turn claims without a confirmed entitlement (402)", async () => {
    const call = await player("player-boundary");
    const attack = await fireShot(call, { yaw: 0, elevation: 0.64, power: 0.5 }, "turn:none");
    expect(attack.response.status).toBe(402);
    expect(String(attack.payload.error)).toContain("entitlement");
    const claimAttempt = await claim(call);
    expect(claimAttempt.response.status).toBe(402);
  }, SLOW);

  it("grants a signed DEFENSE_PACK webhook exactly once and rejects amount mismatches", async () => {
    const call = await player("player-defender");
    const intentId = await seedIntent("player-defender", "DEFENSE_PACK", 1, 300, DEFENSE_PRODUCT);
    const event = { id: "evt_harness_defense_1", type: "payment.succeeded", data: { payment_id: "pay_harness_defense_1", total_amount: 300, currency: "USD", product_id: DEFENSE_PRODUCT, metadata: { purchase_intent_id: intentId } } };
    const granted = await signedWebhook(event);
    expect(granted.status).toBe(200);
    expect(await granted.json() as { entitlementIssued: boolean }).toMatchObject({ entitlementIssued: true });

    const entitlements = await (await call("/entitlements")).json() as { entitlements: Array<{ kind: string; quantityRemaining: number }> };
    expect(entitlements.entitlements).toContainEqual({ kind: "DEFENSE_PACK", quantityRemaining: 1 });

    const definition = generateFortress((await world()).worldSeed, (await world()).generatorVersion);
    const braceSlot = definition.defenseSlots.find((slot) => slot.type === "BRACE");
    expect(braceSlot).toBeTruthy();
    const invalidBrace = await call("/defense/place", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ commandId: crypto.randomUUID(), reignId: (await world()).currentReignId, expectedWorldVersion: (await world()).worldVersion, type: "BRACE", slotId: braceSlot?.id }),
    });
    expect(invalidBrace.status).toBe(409);
    const invalidBraceBody = await invalidBrace.json() as { error?: string };
    expect(invalidBraceBody.error).toContain("damaged");
    const afterInvalidBrace = await (await call("/entitlements")).json() as typeof entitlements;
    expect(afterInvalidBrace.entitlements).toContainEqual({ kind: "DEFENSE_PACK", quantityRemaining: 1 });

    const replayed = await signedWebhook(event);
    expect(replayed.status).toBe(200);
    const replayedBody = await replayed.json() as { duplicate: boolean; entitlementIssued: boolean };
    expect(replayedBody.duplicate).toBe(true);
    const after = await (await call("/entitlements")).json() as typeof entitlements;
    expect(after.entitlements).toContainEqual({ kind: "DEFENSE_PACK", quantityRemaining: 1 });

    const attackIntentId = await seedIntent("player-defender", "ATTACK_PACK", 3, 300, ATTACK_PRODUCT);
    const mismatched = await signedWebhook({ id: "evt_harness_mismatch", type: "payment.succeeded", data: { payment_id: "pay_harness_mismatch", total_amount: 500, currency: "USD", product_id: ATTACK_PRODUCT, metadata: { purchase_intent_id: attackIntentId } } });
    expect(mismatched.status).toBe(422);
  }, SLOW);

  it("reconciles refunds by revoking unused entitlement and releasing the live turn", async () => {
    const call = await player("player-refund");
    const intentId = await seedIntent("player-refund", "ATTACK_PACK", 3, 300, ATTACK_PRODUCT);
    const paid = await signedWebhook({ id: "evt_harness_refund_paid", type: "payment.succeeded", data: { payment_id: "pay_harness_refund", total_amount: 300, currency: "USD", product_id: ATTACK_PRODUCT, metadata: { purchase_intent_id: intentId } } });
    expect(paid.status).toBe(200);
    expect((await claim(call)).response.status).toBe(200);

    const refunded = await signedWebhook({ id: "evt_harness_refund_1", type: "payment.refunded", data: { payment_id: "pay_harness_refund" } });
    expect(refunded.status).toBe(200);
    expect(await refunded.json() as { entitlementRevoked: boolean }).toMatchObject({ entitlementRevoked: true });
    const entitlements = await (await call("/entitlements")).json() as { entitlements: Array<{ kind: string; quantityRemaining: number }> };
    expect(entitlements.entitlements).toEqual([]);
    expect((await claim(call)).response.status).toBe(402);

    const duplicateRefund = await signedWebhook({ id: "evt_harness_refund_1", type: "payment.refunded", data: { payment_id: "pay_harness_refund" } });
    expect(duplicateRefund.status).toBe(200);
    expect(await duplicateRefund.json() as { entitlementRevoked: boolean; duplicate: boolean }).toMatchObject({ entitlementRevoked: false, duplicate: true });
  }, SLOW);

  it("claims a turn, consumes one shot, replays the stored result, and rejects input reuse", async () => {
    const call = await player("player-attacker");
    await grant("player-attacker", "ATTACK_PACK", 3);

    const firstClaim = await claim(call);
    expect(firstClaim.response.status).toBe(200);
    expect(firstClaim.payload.status).toBe("ACTIVE");
    const turnId = firstClaim.payload.turn?.id as string;

    const snapshot = await world();
    const commandId = crypto.randomUUID();
    const fireBody = { commandId, reignId: snapshot.currentReignId, turnId, expectedWorldVersion: snapshot.worldVersion, simulationVersion: BALLISTIC_SIMULATION_VERSION, yaw: 0, elevation: 0.64, power: 0.5 };
    const fired = await call("/attack", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(fireBody) });
    expect(fired.status).toBe(200);
    const firedPayload = await fired.json() as { accepted: boolean; snapshot: WorldSnapshot };
    expect(firedPayload.accepted).toBe(true);

    const events = await (await call("/events?limit=1")).json() as { events: Array<{ type: string; targetId: string | null; projectileType: string; point: [number, number, number] | null; timeSeconds: number | null }> };
    expect(events.events[0]).toMatchObject({ type: "ATTACK_RESOLVED", projectileType: "STANDARD" });
    expect(events.events[0].targetId).toBeTruthy();
    if (events.events[0].targetId !== "miss") {
      expect(events.events[0].point).toHaveLength(3);
      expect(events.events[0].timeSeconds).toBeGreaterThan(0);
    }

    const entitlements = await (await call("/entitlements")).json() as { entitlements: Array<{ kind: string; quantityRemaining: number }> };
    expect(entitlements.entitlements).toContainEqual({ kind: "ATTACK_PACK", quantityRemaining: 2 });

    const replayed = await call("/attack", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(fireBody) });
    expect(replayed.status).toBe(200);
    expect(await replayed.json() as { replay: boolean }).toMatchObject({ replay: true });
    expect((await world()).worldVersion).toBe(firedPayload.snapshot.worldVersion);

    const tampered = await call("/attack", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...fireBody, power: 0.9 }) });
    expect(tampered.status).toBe(409);

    const noTurn = await fireShot(call, { yaw: 0, elevation: 0.64, power: 0.5 }, "turn:none");
    expect(noTurn.response.status).toBe(409);
    expect(String(noTurn.payload.error)).toContain("turn");
  }, SLOW);

  it("does not consume defense inventory on replay and preserves inventory on stale attacks", async () => {
    const defender = await player("player-defense-replay");
    await grant("player-defense-replay", "DEFENSE_PACK", 1);
    const defenseSnapshot = await world();
    const defenseCommand = {
      commandId: crypto.randomUUID(),
      reignId: defenseSnapshot.currentReignId,
      expectedWorldVersion: defenseSnapshot.worldVersion,
      type: "SHIELD" as const,
      slotId: "shield_slot:left_approach",
    };
    const placed = await defender("/defense/place", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(defenseCommand) });
    expect(placed.status).toBe(200);
    const placedBody = await placed.json() as { accepted: boolean; snapshot: WorldSnapshot };
    expect(placedBody.accepted).toBe(true);

    const replay = await defender("/defense/place", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(defenseCommand) });
    expect(replay.status).toBe(200);
    expect(await replay.json() as { replay: boolean }).toMatchObject({ replay: true });
    const afterDefenseReplay = await (await defender("/entitlements")).json() as { entitlements: Array<{ kind: string; quantityRemaining: number }> };
    expect(afterDefenseReplay.entitlements).not.toContainEqual({ kind: "DEFENSE_PACK", quantityRemaining: 0 });

    const attacker = await player("player-stale-attack");
    await grant("player-stale-attack", "ATTACK_PACK", 1);
    const beforeClaim = await world();
    const turn = await claim(attacker);
    expect(turn.response.status).toBe(200);
    const stale = await attacker("/attack", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ commandId: crypto.randomUUID(), reignId: beforeClaim.currentReignId, turnId: turn.payload.turn?.id, expectedWorldVersion: beforeClaim.worldVersion, simulationVersion: BALLISTIC_SIMULATION_VERSION, yaw: 0, elevation: 0.64, power: 0.5 }),
    });
    expect(stale.status).toBe(409);
    expect(String((await stale.json() as { error?: string }).error)).toContain("stale");
    const afterStale = await (await attacker("/entitlements")).json() as { entitlements: Array<{ kind: string; quantityRemaining: number }> };
    expect(afterStale.entitlements).toContainEqual({ kind: "ATTACK_PACK", quantityRemaining: 1 });
  }, SLOW);

  it("queues a second attacker, locks defense placement during the turn, and promotes the queue on resolution", async () => {
    const attacker = await player("player-queue-a");
    const queued = await player("player-queue-b");
    await grant("player-queue-a", "ATTACK_PACK", 2);
    await grant("player-queue-b", "ATTACK_PACK", 2);
    await grant("player-queue-a", "DEFENSE_PACK", 1);

    const active = await claim(attacker);
    expect(active.payload.status).toBe("ACTIVE");

    const second = await claim(queued);
    expect(second.response.status).toBe(202);
    expect(second.payload.status).toBe("QUEUED");
    expect(second.payload.position).toBe(1);

    const placement = await attacker("/defense/place", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ commandId: crypto.randomUUID(), reignId: (await world()).currentReignId, expectedWorldVersion: (await world()).worldVersion, type: "SHIELD", slotId: "shield_slot:core_front" }),
    });
    expect(placement.status).toBe(409);

    const shot = await fireShot(attacker, { yaw: -0.4, elevation: 0.6, power: 0.8 }, active.payload.turn?.id as string);
    expect(shot.response.status).toBe(200);

    const promoted = await claim(queued);
    expect(promoted.response.status).toBe(200);
    expect(promoted.payload.status).toBe("ACTIVE");
    const promotedShot = await fireShot(queued, { yaw: 0.4, elevation: 0.6, power: 0.8 }, promoted.payload.turn?.id as string);
    expect(promotedShot.response.status).toBe(200);
  }, SLOW);

  it("releases active and queued turns atomically without consuming a shot", async () => {
    const activePlayer = await player("player-cancel-active");
    const queuedPlayer = await player("player-cancel-queued");
    await grant("player-cancel-active", "ATTACK_PACK", 1);
    await grant("player-cancel-queued", "ATTACK_PACK", 1);
    expect((await claim(activePlayer)).response.status).toBe(200);
    expect((await claim(queuedPlayer)).response.status).toBe(202);

    const queuedCancel = await cancel(queuedPlayer);
    expect(queuedCancel.response.status).toBe(200);
    expect(queuedCancel.payload).toMatchObject({ cancelled: true, wasQueued: true, wasActive: false });
    expect((await (await queuedPlayer("/queue")).json() as { queued: boolean }).queued).toBe(false);

    const activeCancel = await cancel(activePlayer);
    expect(activeCancel.response.status).toBe(200);
    expect(activeCancel.payload).toMatchObject({ cancelled: true, wasQueued: false, wasActive: true });
    expect((await world()).activeAttack).toBeNull();
    const entitlements = await (await activePlayer("/entitlements")).json() as { entitlements: Array<{ kind: string; quantityRemaining: number }> };
    expect(entitlements.entitlements).toContainEqual({ kind: "ATTACK_PACK", quantityRemaining: 1 });
  }, SLOW);

  it("arms one reign-scoped Breaker Shot when the moving Power Orb fills Siege Charge", async () => {
    const call = await player("player-breaker");
    await grant("player-breaker", "ATTACK_PACK", 8);
    const aimInputs = [-0.72, -0.54, -0.36, -0.18, 0, 0.18, 0.36, 0.54, 0.72].flatMap((yaw) => [0.5, 0.58, 0.66, 0.74, 0.82].map((elevation) => ({ yaw, elevation, power: 0.75 })));

    for (let orb = 0; orb < 2; orb += 1) {
      const snapshot = await world() as WorldSnapshot & { components: Array<{ componentId: string; state: string }> };
      const definition = generateFortress(snapshot.worldSeed, snapshot.generatorVersion);
      const aim = aimInputs.find((input) => resolveBallisticShot(definition, snapshot as unknown as PublicWorldSnapshot, input).hit?.componentId === "power-orb");
      expect(aim).toBeTruthy();
      const turn = await claim(call);
      expect(turn.response.status).toBe(200);
      const result = await fireShot(call, aim!, turn.payload.turn?.id as string);
      expect(result.response.status).toBe(200);
      expect(result.payload.impact?.targetId).toBe("power-orb");
    }

    const armed = await (await call("/entitlements")).json() as { entitlements: Array<{ kind: string; quantityRemaining: number }> };
    expect(armed.entitlements).toContainEqual({ kind: "BREAKER_SHOT", quantityRemaining: 1 });
    const turn = await claim(call);
    expect(turn.response.status).toBe(200);
    const breaker = await fireShot(call, { yaw: 0, elevation: 0.64, power: 0.5 }, turn.payload.turn?.id as string, crypto.randomUUID(), "BREAKER");
    expect(breaker.response.status).toBe(200);
    expect(breaker.payload.projectile).toBe("BREAKER");
    const spent = await (await call("/entitlements")).json() as { entitlements: Array<{ kind: string; quantityRemaining: number }> };
    expect(spent.entitlements.some((item) => item.kind === "BREAKER_SHOT")).toBe(false);
  }, SLOW);

  it("denies recovery codes to non-conquerors", async () => {
    const call = await player("player-recovery");
    const response = await call("/recovery/create", { method: "POST" });
    expect(response.status).toBe(409);
  }, SLOW);

  it("reconstructs the durable world and active turn after instance eviction", async () => {
    const call = await player("player-restart");
    await grant("player-restart", "ATTACK_PACK", 1);
    const claimed = await claim(call);
    expect(claimed.response.status).toBe(200);
    expect(claimed.payload.turn).toBeTruthy();
    const beforeEviction = await world();

    await harness.getWorker().evictDurableObject("SiegeWorld", { name: "global-throne-v1", webSockets: "close" });

    const afterEviction = await world();
    expect(afterEviction.worldVersion).toBe(beforeEviction.worldVersion);
    expect(afterEviction.currentReignId).toBe(beforeEviction.currentReignId);
    expect(afterEviction.activeAttack).toEqual(beforeEviction.activeAttack);
    const result = await fireShot(call, { yaw: 0, elevation: 0.86, power: 1 }, claimed.payload.turn?.id as string);
    expect(result.response.status).toBe(200);
  }, SLOW);

  it("runs succession: repeated shots breach the Core, the decisive attacker publishes, and the reign archives", async () => {
    const conqueror = await player("player-conqueror");
    const outsider = await player("player-outsider");
    let breached = false;

    for (let shot = 0; shot < 180 && !breached; shot += 1) {
      await grant("player-conqueror", "ATTACK_PACK", 1);
      const turn = await claim(conqueror);
      if (turn.response.status !== 200 || !turn.payload.turn) continue;
      const current = await world();
      const enclosure = current.components.find((component) => component.componentId === "core:enclosure");
      const aim = enclosure?.state !== "DESTROYED" ? { yaw: 0, elevation: 0.64, power: 0.5 } : { yaw: 0, elevation: 0.55, power: 0.25 };
      const result = await fireShot(conqueror, aim, turn.payload.turn.id);
      if (result.response.status !== 200) continue;
      const after = await world();
      breached = after.phase === "CORONATION";
    }
    expect(breached, `succession fixture did not breach: ${JSON.stringify(await world())}`).toBe(true);

    const defeated = await world();
    const defeatedReignId = defeated.currentReignId;

    const recoveryCreate = await conqueror("/recovery/create", { method: "POST" });
    expect(recoveryCreate.status).toBe(200);
    const recoveryPayload = await recoveryCreate.json() as { recoveryCode: string };
    expect(recoveryPayload.recoveryCode).toMatch(/^SIEGE-[A-Z0-9]{24}$/);

    const [outsiderPublish, publish] = await Promise.all([
      outsider("/identity", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ displayName: "Not The Conqueror", identityType: "Person" }),
      }),
      conqueror("/identity", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ displayName: "Harness Ruler", identityType: "Person", message: "Claimed through the harness." }),
      }),
    ]);
    expect(outsiderPublish.status).toBe(403);
    expect(publish.status).toBe(200);
    const coronated = await publish.json() as { coronated: boolean; snapshot: WorldSnapshot };
    expect(coronated.coronated).toBe(true);
    expect(coronated.snapshot.phase).toBe("ACTIVE");
    expect(coronated.snapshot.ruler?.displayName).toBe("Harness Ruler");
    expect(coronated.snapshot.reign?.ordinal).toBe((defeated.reign?.ordinal ?? 0) + 1);
    expect(coronated.snapshot.reign?.coreIntegrity).toBe(coronated.snapshot.reign?.coreMaxIntegrity);

    const archived = await env.DB.prepare("SELECT id FROM reign_archive WHERE id = ?").bind(defeatedReignId).all();
    expect(archived.results.length).toBe(1);

    const recoveryClaim = await outsider("/recovery/claim", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: recoveryPayload.recoveryCode.toLowerCase() }),
    });
    expect(recoveryClaim.status).toBe(200);
    expect(await recoveryClaim.json()).toMatchObject({ recovered: true });

    const reusedRecovery = await outsider("/recovery/claim", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: recoveryPayload.recoveryCode }),
    });
    // Used tokens intentionally collapse into the invalid/expired response so
    // recovery-code state is not disclosed to an attacker.
    expect(reusedRecovery.status).toBe(401);

    const activeIdentity = await outsider("/identity", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ displayName: "Should Not Be Stored", identityType: "Person" }),
    });
    expect(activeIdentity.status).toBe(409);
    const rejectedRows = await env.DB.prepare("SELECT id FROM public_identities WHERE display_name = ? AND moderation_status = 'APPROVED'").bind("Should Not Be Stored").all();
    expect(rejectedRows.results.length).toBe(0);

    const protectedClaim = await claim(conqueror);
    expect(protectedClaim.response.status).toBe(409);
    expect(String(protectedClaim.payload.error)).toContain("protected");
  }, SLOW);

  it("consumes a paid shot even when the projectile misses everything", async () => {
    const call = await player("player-miss");
    await grant("player-miss", "ATTACK_PACK", 1);
    const turn = await claim(call);
    expect(turn.response.status).toBe(200);
    // Verified max-arc aim: flies over the fortress and resolves as a miss.
    const result = await fireShot(call, { yaw: 0, elevation: 0.86, power: 1 }, turn.payload.turn?.id as string);
    expect(result.response.status).toBe(200);
    expect(result.payload.impact?.targetId).toBe("miss");
    expect(result.payload.impact?.point).toBeNull();
    expect(result.payload.impact?.timeSeconds).toBeNull();
    const entitlements = await (await call("/entitlements")).json() as { entitlements: Array<{ kind: string; quantityRemaining: number }> };
    expect(entitlements.entitlements.find((item) => item.kind === "ATTACK_PACK")).toBeUndefined();
  }, SLOW);
});
