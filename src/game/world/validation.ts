import type { AuthoritativeWorldState } from "../domain/types";

export type AuthoritativeStateValidation =
  | { ok: true }
  | { ok: false; errors: string[] };

/**
 * Final persistence-boundary checks for the private world state. Gameplay
 * reducers remain responsible for transitions; this guard only rejects states
 * that cannot be coherent enough to publish or reconstruct.
 */
export function validateAuthoritativeWorldState(state: AuthoritativeWorldState): AuthoritativeStateValidation {
  const errors: string[] = [];
  if (!Number.isInteger(state.worldVersion) || state.worldVersion < 1) errors.push("worldVersion must be a positive integer");
  if (!Number.isInteger(state.eventSequence) || state.eventSequence < 1) errors.push("eventSequence must be a positive integer");
  if (state.worldVersion !== state.eventSequence) errors.push("worldVersion and eventSequence must remain in lockstep");
  if (state.phase !== "ACTIVE" && state.phase !== "CORONATION") errors.push("phase is invalid");

  const core = state.components.find((component) => component.componentId === "core:main");
  if (!core) errors.push("core:main component is required");
  if (state.reign) {
    if (state.currentReignId !== state.reign.id) errors.push("currentReignId must match reign.id");
    if (!Number.isFinite(state.reign.coreIntegrity) || state.reign.coreIntegrity < 0 || state.reign.coreIntegrity > state.reign.coreMaxIntegrity) errors.push("Core Integrity is outside its bounds");
    if (!Number.isFinite(state.reign.coreMaxIntegrity) || state.reign.coreMaxIntegrity <= 0) errors.push("Core max integrity must be positive");
  } else if (state.currentReignId !== null) {
    errors.push("a state without a reign cannot have a currentReignId");
  }

  const queuePlayers = new Set<string>();
  for (const entry of state.attackQueue) {
    if (!entry.playerId || queuePlayers.has(entry.playerId)) errors.push("attack queue players must be unique and non-empty");
    queuePlayers.add(entry.playerId);
  }
  if (state.activeTurn && (!state.currentReignId || state.activeTurn.reignId !== state.currentReignId || queuePlayers.has(state.activeTurn.playerId))) {
    errors.push("active turn must belong to the current reign and not also be queued");
  }
  if (state.phase === "CORONATION" && state.activeTurn) errors.push("coronation cannot retain an active attack turn");

  const defenseIds = new Set<string>();
  const defenseSlots = new Set<string>();
  for (const defense of state.activeDefenses) {
    if (defenseIds.has(defense.id) || defenseSlots.has(defense.slotId)) errors.push("active defense ids and slots must be unique");
    if (!Number.isFinite(defense.hp) || !Number.isFinite(defense.maxHp) || defense.hp < 0 || defense.hp > defense.maxHp) errors.push("active defense health is outside its bounds");
    defenseIds.add(defense.id);
    defenseSlots.add(defense.slotId);
  }
  if (state.breakerShots.some((shot) => !Number.isInteger(shot.quantityRemaining) || shot.quantityRemaining < 0 || shot.reignId !== state.currentReignId)) errors.push("breaker inventory must be non-negative and reign-scoped");
  return errors.length ? { ok: false, errors } : { ok: true };
}

export function assertAuthoritativeWorldState(state: AuthoritativeWorldState) {
  const validation = validateAuthoritativeWorldState(state);
  if (!validation.ok) throw new Error(`Invalid authoritative world state: ${validation.errors.join("; ")}`);
}
