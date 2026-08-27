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
  return { response, payload: await response.json() as { accepted?: boolean; projectile?: string; impact?: { targetId: string; damage: number }; snapshot?: WorldSnapshot; error?: string; replay?: boolean } };
}

async function claim(call: Call) {
  const response = await call("/turn/claim", { method: "POST" });
  return { response, payload: await response.json() as { status?: string; turn?: { id: string }; position?: number; error?: string } };
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
  it("issues a silent HttpOnly Secure SameSite=Lax session without a login wall", async () => {
    const response = await harness.fetch("/session", { method: "POST" });
    expect(response.status).toBe(200);
    const setCookie = response.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("Secure");
    expect(setCookie).toContain("SameSite=Lax");
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

    const outsiderPublish = await outsider("/identity", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ displayName: "Not The Conqueror", identityType: "Person" }),
    });
    expect(outsiderPublish.status).toBe(403);

    const publish = await conqueror("/identity", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ displayName: "Harness Ruler", identityType: "Person", message: "Claimed through the harness." }),
    });
    expect(publish.status).toBe(200);
    const coronated = await publish.json() as { coronated: boolean; snapshot: WorldSnapshot };
    expect(coronated.coronated).toBe(true);
    expect(coronated.snapshot.phase).toBe("ACTIVE");
    expect(coronated.snapshot.ruler?.displayName).toBe("Harness Ruler");
    expect(coronated.snapshot.reign?.ordinal).toBe((defeated.reign?.ordinal ?? 0) + 1);
    expect(coronated.snapshot.reign?.coreIntegrity).toBe(coronated.snapshot.reign?.coreMaxIntegrity);

    const archived = await env.DB.prepare("SELECT id FROM reign_archive WHERE id = ?").bind(defeatedReignId).all();
    expect(archived.results.length).toBe(1);

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
    const entitlements = await (await call("/entitlements")).json() as { entitlements: Array<{ kind: string; quantityRemaining: number }> };
    expect(entitlements.entitlements.find((item) => item.kind === "ATTACK_PACK")).toBeUndefined();
  }, SLOW);
});
