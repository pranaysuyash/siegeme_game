import type { AuthoritativeWorldState, PublicWorldSnapshot } from "../domain/types";
import { generateFortress } from "./generator";

const definition = generateFortress("seed:founders-hold");

/** The first server-owned world state used when the Cloudflare authority boots. */
export function createInitialWorldSnapshot(now = new Date()): PublicWorldSnapshot {
  return {
    worldId: "world:global",
    worldVersion: 1,
    phase: "ACTIVE",
    generatorVersion: definition.generatorVersion,
    worldSeed: definition.seed,
    currentReignId: "reign:001",
    reign: {
      id: "reign:001",
      ordinal: 1,
      startedAt: new Date(now.getTime() - 1000 * 60 * 47).toISOString(),
      coreIntegrity: 100,
      coreMaxIntegrity: 100,
      siegeCharge: 50,
      royalGuardCharge: 25,
      nextDefensePriceMinor: 300,
    },
    ruler: {
      displayName: "The First Hold",
      identityType: "Community",
      destinationUrl: null,
      destinationDomain: null,
      message: "The first reign is live. Everyone can take a shot.",
      ctaChoice: null,
      verified: false,
    },
    components: definition.components.map((component) => ({
      componentId: component.id,
      hp: component.maxHp,
      maxHp: component.maxHp,
      state: "INTACT",
      version: 1,
    })),
    activeDefenses: [],
  };
}

export function createInitialAuthoritativeWorldState(now = new Date()): AuthoritativeWorldState {
  return {
    ...createInitialWorldSnapshot(now),
    schemaVersion: 3,
    eventSequence: 0,
    rulerPlayerId: null,
    attackQueue: [],
    activeTurn: null,
    succession: { status: "STABLE", decisiveCommandId: null },
    liveEntitlements: [],
  };
}

export function projectPublicWorldSnapshot(state: AuthoritativeWorldState): PublicWorldSnapshot {
  const coreIntegrity = state.reign?.coreIntegrity ?? 0;
  return {
    worldId: state.worldId,
    worldVersion: state.worldVersion,
    phase: state.phase,
    generatorVersion: state.generatorVersion,
    worldSeed: state.worldSeed,
    currentReignId: state.currentReignId,
    reign: state.reign,
    ruler: state.ruler,
    components: state.components.map((component) => component.componentId === "core:main" ? { ...component, hp: coreIntegrity, maxHp: state.reign?.coreMaxIntegrity ?? component.maxHp, state: coreIntegrity <= 0 ? "DESTROYED" : coreIntegrity / (state.reign?.coreMaxIntegrity ?? component.maxHp) <= 0.25 ? "CRITICAL" : coreIntegrity / (state.reign?.coreMaxIntegrity ?? component.maxHp) < 0.8 ? "DAMAGED" : "INTACT" } : component),
    activeDefenses: state.activeDefenses,
  };
}

export function migrateAuthoritativeWorldState(value: unknown): AuthoritativeWorldState | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<AuthoritativeWorldState>;
  if (candidate.schemaVersion === 3 && Array.isArray(candidate.components) && Array.isArray(candidate.attackQueue)) return value as AuthoritativeWorldState;
  if (typeof candidate.worldVersion !== "number" || !Array.isArray(candidate.components)) return null;
  return {
    ...(value as PublicWorldSnapshot),
    schemaVersion: 3,
    eventSequence: candidate.worldVersion,
    rulerPlayerId: null,
    attackQueue: Array.isArray(candidate.attackQueue) ? candidate.attackQueue : [],
    activeTurn: null,
    succession: { status: "STABLE", decisiveCommandId: null },
    liveEntitlements: [],
  };
}
