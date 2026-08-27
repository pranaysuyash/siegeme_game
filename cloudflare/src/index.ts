import type { DurableObjectNamespace, DurableObjectState } from "@cloudflare/workers-types";
import type { PublicWorldSnapshot } from "../../src/game/domain/types";
import { createInitialWorldSnapshot } from "../../src/game/world/initial-snapshot";

export type SiegeAuthorityEnv = {
  GLOBAL_SIEGE: DurableObjectNamespace;
};

type AttackRequest = { yaw: number; elevation: number; power: number };

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

function validAttackRequest(value: unknown): value is AttackRequest {
  if (!value || typeof value !== "object") return false;
  const input = value as Record<string, unknown>;
  return [input.yaw, input.elevation, input.power].every((item) => typeof item === "number" && Number.isFinite(item));
}

export class GlobalSiege {
  private readonly state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  async fetch(request: Request) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/world") {
      const snapshot = await this.readSnapshot();
      return json(url.searchParams.get("empty") === "1" ? { ...snapshot, phase: "CORONATION", currentReignId: null, reign: null, ruler: null } : snapshot);
    }
    if (request.method === "POST" && url.pathname === "/attack") {
      return this.handleAttack(request);
    }
    return json({ error: "Not found" }, 404);
  }

  private async readSnapshot() {
    const existing = await this.state.storage.get<PublicWorldSnapshot>("world_snapshot");
    if (existing) return existing;
    const initial = createInitialWorldSnapshot();
    await this.state.storage.put("world_snapshot", initial);
    return initial;
  }

  private async handleAttack(request: Request) {
    if (!request.headers.get("authorization")) return json({ error: "Player authentication is required" }, 401);
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Attack intent must be valid JSON" }, 400);
    }
    if (!validAttackRequest(body)) return json({ error: "Attack aim is invalid" }, 422);

    // Dodo webhook-confirmed shot balances and identity authorization are the next
    // gate. Never turn an unauthenticated browser intent into a world mutation.
    return json({ error: "No confirmed attack entitlement is available" }, 402);
  }
}

const worker = {
  async fetch(request: Request, env: SiegeAuthorityEnv) {
    const id = env.GLOBAL_SIEGE.idFromName("world:global");
    return env.GLOBAL_SIEGE.get(id).fetch(request);
  },
};

export default worker;
