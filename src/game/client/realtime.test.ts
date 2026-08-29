import { describe, expect, it } from "vitest";
import { applyWorldDelta, flattenRealtimeMessages, MAX_REALTIME_BATCH_EVENTS, realtimeSequenceAction } from "@/game/client/realtime";
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
    const next = applyWorldDelta(snapshot, { worldVersion: 2, eventSequence: 1, phase: "ACTIVE", currentReignId: snapshot.currentReignId, reign: snapshot.reign, ruler: snapshot.ruler, coronation: null, activeDefenses: [], activeAttack: snapshot.activeAttack, serverNow: snapshot.serverNow, changes: [{ ...changed, hp: 40, state: "DAMAGED" }] });
    expect(next.worldVersion).toBe(2);
    expect(next.components.find((component) => component.componentId === changed.componentId)?.hp).toBe(40);
    expect(next.components.find((component) => component.componentId === untouched?.componentId)).toEqual(untouched);
  });

  it("does not roll the canonical snapshot backward", () => {
    const snapshot = createInitialWorldSnapshot();
    const delta = { worldVersion: 1, eventSequence: 1, phase: "CORONATION" as const, currentReignId: null, reign: null, ruler: null, coronation: null, activeDefenses: [], activeAttack: null, serverNow: snapshot.serverNow, changes: [] };
    expect(applyWorldDelta({ ...snapshot, worldVersion: 3 }, delta)).toEqual({ ...snapshot, worldVersion: 3 });
  });

  it("keeps delta projection isolated through repeated event churn", () => {
    const initial = createInitialWorldSnapshot();
    let current = initial;
    const changedIds = ["gate:main", "wall:front:center", "tower:left", "core:enclosure"];
    for (let event = 0; event < 128; event += 1) {
      const changedId = changedIds[event % changedIds.length];
      const changed = initial.components.find((component) => component.componentId === changedId)!;
      const previousComponents = current.components;
      current = applyWorldDelta(current, {
        worldVersion: event + 2,
        eventSequence: event + 1,
        phase: "ACTIVE",
        currentReignId: initial.currentReignId,
        reign: initial.reign,
        ruler: initial.ruler,
        coronation: null,
        activeDefenses: [],
        activeAttack: null,
        serverNow: initial.serverNow + event,
        changes: [{ ...changed, hp: Math.max(0, changed.maxHp - event), state: event > changed.maxHp / 2 ? "DAMAGED" : "INTACT" }],
      });
      expect(current.worldVersion).toBe(event + 2);
      expect(current.components.filter((component) => component.componentId !== changedId)).toEqual(previousComponents.filter((component) => component.componentId !== changedId));
      expect(current.components.every((component) => Number.isFinite(component.hp) && Number.isFinite(component.maxHp))).toBe(true);
    }
  });

  it("never treats a missing realtime sequence as an ordinary apply", () => {
    let lastSequence = 0;
    for (let event = 1; event <= 256; event += 1) {
      const candidate = event % 7 === 0 ? lastSequence + 2 : lastSequence + 1;
      const action = realtimeSequenceAction(lastSequence, candidate);
      expect(action).toBe(candidate === lastSequence + 1 ? "apply" : "resync");
      if (action === "apply") lastSequence = candidate;
    }
    expect(lastSequence).toBeGreaterThan(0);
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
    const next = applyWorldDelta(snapshot, { worldVersion: 5, eventSequence: 4, phase: "ACTIVE", currentReignId: snapshot.currentReignId, reign: snapshot.reign, ruler: snapshot.ruler, coronation: null, activeDefenses: [], activeAttack: { label: "Attacker-ab12", shotNumber: 1, expiresAt: 999 }, serverNow: 12345, changes: [{ ...changed, hp: 10, state: "CRITICAL" }] });
    expect(next.worldVersion).toBe(5);
    expect(next.activeAttack).toEqual({ label: "Attacker-ab12", shotNumber: 1, expiresAt: 999 });
    expect(next.serverNow).toBe(12345);
  });

  it("applies phase and reign changes without requiring component changes", () => {
    const snapshot = createInitialWorldSnapshot();
    const next = applyWorldDelta(snapshot, { worldVersion: 4, eventSequence: 3, phase: "CORONATION", currentReignId: null, reign: null, ruler: null, coronation: { protectedUntil: 123 }, activeDefenses: [], activeAttack: null, serverNow: 9876, changes: [] });
    expect(next).toMatchObject({ worldVersion: 4, phase: "CORONATION", currentReignId: null, reign: null, ruler: null, coronation: { protectedUntil: 123 }, serverNow: 9876 });
    expect(next.components).toEqual(snapshot.components);
  });

  it("caps an untrusted batch before it reaches sequence processing", () => {
    const events = Array.from({ length: MAX_REALTIME_BATCH_EVENTS + 4 }, (_, index) => ({ type: "defense_placed", eventSequence: index + 1 }));
    expect(flattenRealtimeMessages({ type: "batch", events })).toHaveLength(MAX_REALTIME_BATCH_EVENTS);
  });
});
