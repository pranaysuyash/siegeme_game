import type { AuthoritativeWorldState, PublicWorldSnapshot } from "../domain/types";
import { generateFortress } from "./generator";
import { componentStateFromHp } from "@/game/simulation/attack";
import { defensePriceForTier, GameConfig } from "../config";

const definition = generateFortress("seed:founders-hold");
export const AUTHORITATIVE_STATE_SCHEMA_VERSION = 5;

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
      royalShieldPulseArmed: false,
      defensePriceTier: 0,
      nextDefensePriceMinor: defensePriceForTier(0),
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
    })),
    activeDefenses: [],
    coronation: null,
    activeAttack: null,
    serverNow: now.getTime(),
  };
}

export function createInitialAuthoritativeWorldState(now = new Date()): AuthoritativeWorldState {
  return {
    ...createInitialWorldSnapshot(now),
    schemaVersion: AUTHORITATIVE_STATE_SCHEMA_VERSION,
    gameConfigVersion: GameConfig.version,
    eventSequence: 1,
    rulerPlayerId: null,
    attackQueue: [],
    activeTurn: null,
    succession: { status: "STABLE", decisiveCommandId: null },
    coronationState: { status: "NONE", conquerorPlayerId: null, openedAt: null, protectedUntil: null },
    publicIdentityId: null,
    publicIdentityStatus: "APPROVED",
    breakerShots: [],
    contributions: [],
  };
}

export function createNewReignAuthoritativeWorldState(previous: AuthoritativeWorldState, now: Date, rulerPlayerId: string, ruler: NonNullable<PublicWorldSnapshot["ruler"]>, publicIdentityId: string): AuthoritativeWorldState {
  const ordinal = (previous.reign?.ordinal ?? 0) + 1;
  const reignId = `reign:${String(ordinal).padStart(3, "0")}`;
  const next = createInitialAuthoritativeWorldState(now);
  return {
    ...next,
    worldVersion: previous.worldVersion + 1,
    eventSequence: previous.eventSequence + 1,
    currentReignId: reignId,
    worldSeed: `seed:reign:${ordinal}:${rulerPlayerId}`,
    ruler,
    rulerPlayerId,
    publicIdentityId,
    publicIdentityStatus: "APPROVED",
    coronationState: { status: "PROTECTED", conquerorPlayerId: rulerPlayerId, openedAt: now.getTime(), protectedUntil: now.getTime() + GameConfig.coronation.protectedSetupMs },
    breakerShots: [],
    contributions: [],
    reign: next.reign ? { ...next.reign, id: reignId, ordinal, startedAt: now.toISOString() } : null,
  };
}

export function projectPublicWorldSnapshot(state: AuthoritativeWorldState, now = Date.now()): PublicWorldSnapshot {
  const coreIntegrity = state.reign?.coreIntegrity ?? 0;
  const protectionActive = state.coronationState?.status === "PROTECTED" && typeof state.coronationState.protectedUntil === "number" && state.coronationState.protectedUntil > now;
  const turn = state.activeTurn;
  const activeAttack = turn && turn.expiresAt > now && turn.reignId === state.currentReignId
    ? { label: `Attacker #${turn.shotNumber}`, shotNumber: turn.shotNumber, expiresAt: turn.expiresAt }
    : null;
  return {
    serverNow: now,
    worldId: state.worldId,
    worldVersion: state.worldVersion,
    phase: state.phase,
    generatorVersion: state.generatorVersion,
    worldSeed: state.worldSeed,
    currentReignId: state.currentReignId,
    reign: state.reign,
    ruler: state.ruler,
    components: state.components.map((component) => component.componentId === "core:main" ? { ...component, hp: coreIntegrity, maxHp: state.reign?.coreMaxIntegrity ?? component.maxHp, state: componentStateFromHp(coreIntegrity, state.reign?.coreMaxIntegrity ?? component.maxHp) } : component),
    activeDefenses: state.activeDefenses,
    coronation: protectionActive && state.coronationState?.protectedUntil ? { protectedUntil: state.coronationState.protectedUntil } : null,
    activeAttack,
  };
}

export function migrateAuthoritativeWorldState(value: unknown): AuthoritativeWorldState | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<AuthoritativeWorldState>;
  if ((candidate.schemaVersion === 3 || candidate.schemaVersion === 4 || candidate.schemaVersion === AUTHORITATIVE_STATE_SCHEMA_VERSION) && Array.isArray(candidate.components) && Array.isArray(candidate.attackQueue)) {
    return {
      ...(value as AuthoritativeWorldState),
      schemaVersion: AUTHORITATIVE_STATE_SCHEMA_VERSION,
      gameConfigVersion: typeof candidate.gameConfigVersion === "string" ? candidate.gameConfigVersion : GameConfig.version,
      reign: candidate.reign ? {
        ...candidate.reign,
        royalShieldPulseArmed: candidate.reign.royalShieldPulseArmed === true,
        defensePriceTier: Number.isInteger(candidate.reign.defensePriceTier) ? candidate.reign.defensePriceTier : 0,
        nextDefensePriceMinor: typeof candidate.reign.nextDefensePriceMinor === "number" ? candidate.reign.nextDefensePriceMinor : defensePriceForTier(0),
      } : null,
      publicIdentityId: typeof candidate.publicIdentityId === "string" ? candidate.publicIdentityId : null,
      publicIdentityStatus: candidate.publicIdentityStatus === "PENDING" || candidate.publicIdentityStatus === "APPROVED" || candidate.publicIdentityStatus === "REJECTED" || candidate.publicIdentityStatus === "DISABLED" ? candidate.publicIdentityStatus : "NONE",
      coronationState: candidate.coronationState ?? { status: "NONE", conquerorPlayerId: null, openedAt: null, protectedUntil: null },
      breakerShots: Array.isArray(candidate.breakerShots) ? candidate.breakerShots : [],
      contributions: Array.isArray(candidate.contributions) ? candidate.contributions : [],
    };
  }
  if (typeof candidate.worldVersion !== "number" || !Array.isArray(candidate.components)) return null;
  const legacyReign = candidate.reign ? {
    ...candidate.reign,
    royalShieldPulseArmed: candidate.reign.royalShieldPulseArmed === true,
    defensePriceTier: Number.isInteger(candidate.reign.defensePriceTier) ? candidate.reign.defensePriceTier : 0,
    nextDefensePriceMinor: typeof candidate.reign.nextDefensePriceMinor === "number" ? candidate.reign.nextDefensePriceMinor : defensePriceForTier(0),
  } : null;
  return {
    ...(value as PublicWorldSnapshot),
    schemaVersion: AUTHORITATIVE_STATE_SCHEMA_VERSION,
    gameConfigVersion: GameConfig.version,
    reign: legacyReign,
    eventSequence: candidate.worldVersion,
    rulerPlayerId: null,
    attackQueue: Array.isArray(candidate.attackQueue) ? candidate.attackQueue : [],
    activeTurn: null,
    succession: { status: "STABLE", decisiveCommandId: null },
    coronationState: { status: "NONE", conquerorPlayerId: null, openedAt: null, protectedUntil: null },
    publicIdentityId: typeof candidate.publicIdentityId === "string" ? candidate.publicIdentityId : null,
    publicIdentityStatus: candidate.publicIdentityStatus === "PENDING" || candidate.publicIdentityStatus === "APPROVED" || candidate.publicIdentityStatus === "REJECTED" || candidate.publicIdentityStatus === "DISABLED" ? candidate.publicIdentityStatus : "NONE",
    breakerShots: [],
    contributions: [],
  };
}
