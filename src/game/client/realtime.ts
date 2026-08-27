import type { PublicWorldDelta, PublicWorldSnapshot } from "../domain/types";

export type RealtimeSequenceAction = "apply" | "ignore" | "resync";

/** Decide sequence handling before mutating the canonical client snapshot. */
export function realtimeSequenceAction(lastEventSequence: number, incomingEventSequence: number): RealtimeSequenceAction {
  if (!Number.isInteger(incomingEventSequence) || incomingEventSequence <= lastEventSequence) return "ignore";
  if (lastEventSequence > 0 && incomingEventSequence > lastEventSequence + 1) return "resync";
  return "apply";
}

/** Apply only an authority-produced delta. Older events can never roll the client back. */
export function applyWorldDelta(snapshot: PublicWorldSnapshot, delta: PublicWorldDelta): PublicWorldSnapshot {
  if (delta.worldVersion <= snapshot.worldVersion) return snapshot;
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
    activeAttack: delta.activeAttack,
    serverNow: delta.serverNow,
    components: snapshot.components.map((component) => changed.get(component.componentId) ?? component),
  };
}

/** Unwrap a coalesced authority broadcast into individual messages. */
export function flattenRealtimeMessages(raw: unknown): Array<Record<string, unknown>> {
  if (!raw || typeof raw !== "object") return [];
  const message = raw as Record<string, unknown>;
  if (message.type === "batch" && Array.isArray(message.events)) {
    return message.events.filter((event): event is Record<string, unknown> => Boolean(event && typeof event === "object"));
  }
  return [message];
}
