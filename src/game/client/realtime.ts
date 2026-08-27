import type { PublicWorldDelta, PublicWorldSnapshot } from "../domain/types";

/** Apply only an authority-produced delta. Older events can never roll the client back. */
export function applyWorldDelta(snapshot: PublicWorldSnapshot, delta: PublicWorldDelta): PublicWorldSnapshot {
  if (delta.worldVersion < snapshot.worldVersion) return snapshot;
  const changed = new Map(delta.changes.map((component) => [component.componentId, component]));
  return {
    ...snapshot,
    worldVersion: delta.worldVersion,
    phase: delta.phase,
    currentReignId: delta.currentReignId,
    reign: delta.reign,
    ruler: delta.ruler,
    coronation: delta.coronation,
    activeDefenses: delta.activeDefenses,
    components: snapshot.components.map((component) => changed.get(component.componentId) ?? component),
  };
}
