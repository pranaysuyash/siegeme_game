import { describe, expect, it } from "vitest";
import { applyWorldDelta, flattenRealtimeMessages, realtimeSequenceAction } from "@/game/client/realtime";
import { createInitialWorldSnapshot } from "@/game/world/initial-snapshot";

describe("realtime world deltas", () => {
  it("requests a resync for a sequence gap without advancing the gap marker", () => {
    expect(realtimeSequenceAction(4, 6)).toBe("resync");
    expect(realtimeSequenceAction(4, 5)).toBe("apply");
    expect(realtimeSequenceAction(6, 5)).toBe("ignore");
  });

  it("changes only the authority-listed component and carries the current reign projection", () => {
    const snapshot = createInitialWorldSnapshot();
    const untouched = snapshot.components.find((component) => component.componentId === "tower:left");
    const changed = snapshot.components.find((component) => component.componentId === "wall:front:center")!;
    const next = applyWorldDelta(snapshot, { worldVersion: 2, eventSequence: 1, phase: "ACTIVE", currentReignId: snapshot.currentReignId, reign: snapshot.reign, ruler: snapshot.ruler, coronation: null, activeDefenses: [], activeAttack: snapshot.activeAttack, serverNow: snapshot.serverNow, changes: [{ ...changed, hp: 40, state: "DAMAGED", version: changed.version + 1 }] });
    expect(next.worldVersion).toBe(2);
    expect(next.components.find((component) => component.componentId === changed.componentId)?.hp).toBe(40);
    expect(next.components.find((component) => component.componentId === untouched?.componentId)).toEqual(untouched);
  });

  it("does not roll the canonical snapshot backward", () => {
    const snapshot = createInitialWorldSnapshot();
    const delta = { worldVersion: 1, eventSequence: 1, phase: "CORONATION" as const, currentReignId: null, reign: null, ruler: null, coronation: null, activeDefenses: [], activeAttack: null, serverNow: snapshot.serverNow, changes: [] };
    expect(applyWorldDelta({ ...snapshot, worldVersion: 3 }, delta)).toEqual({ ...snapshot, worldVersion: 3 });
  });
});

describe("coalesced authority broadcasts", () => {
  it("unwraps a batch into individual messages and passes singles through", () => {
    const single = { type: "defense_placed", eventSequence: 2 };
    expect(flattenRealtimeMessages(single)).toEqual([single]);
    const batch = { type: "batch", events: [{ type: "attack_resolved", eventSequence: 3 }, { type: "defense_placed", eventSequence: 4 }, "junk", null] };
    expect(flattenRealtimeMessages(batch)).toEqual([{ type: "attack_resolved", eventSequence: 3 }, { type: "defense_placed", eventSequence: 4 }]);
    expect(flattenRealtimeMessages("garbage")).toEqual([]);
  });

  it("carries activeAttack and serverNow through a delta application", () => {
    const snapshot = createInitialWorldSnapshot();
    const changed = snapshot.components.find((component) => component.componentId === "gate:main")!;
    const next = applyWorldDelta(snapshot, { worldVersion: 5, eventSequence: 4, phase: "ACTIVE", currentReignId: snapshot.currentReignId, reign: snapshot.reign, ruler: snapshot.ruler, coronation: null, activeDefenses: [], activeAttack: { label: "Attacker-ab12", shotNumber: 1, expiresAt: 999 }, serverNow: 12345, changes: [{ ...changed, hp: 10, state: "CRITICAL", version: changed.version + 1 }] });
    expect(next.worldVersion).toBe(5);
    expect(next.activeAttack).toEqual({ label: "Attacker-ab12", shotNumber: 1, expiresAt: 999 });
    expect(next.serverNow).toBe(12345);
  });
});
