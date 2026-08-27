import { describe, expect, it } from "vitest";
import { applyWorldDelta } from "@/game/client/realtime";
import { createInitialWorldSnapshot } from "@/game/world/initial-snapshot";

describe("realtime world deltas", () => {
  it("changes only the authority-listed component and carries the current reign projection", () => {
    const snapshot = createInitialWorldSnapshot();
    const untouched = snapshot.components.find((component) => component.componentId === "tower:left");
    const changed = snapshot.components.find((component) => component.componentId === "wall:front:center")!;
    const next = applyWorldDelta(snapshot, { worldVersion: 2, eventSequence: 1, phase: "ACTIVE", currentReignId: snapshot.currentReignId, reign: snapshot.reign, ruler: snapshot.ruler, coronation: null, activeDefenses: [], changes: [{ ...changed, hp: 40, state: "DAMAGED", version: changed.version + 1 }] });
    expect(next.worldVersion).toBe(2);
    expect(next.components.find((component) => component.componentId === changed.componentId)?.hp).toBe(40);
    expect(next.components.find((component) => component.componentId === untouched?.componentId)).toEqual(untouched);
  });

  it("does not roll the canonical snapshot backward", () => {
    const snapshot = createInitialWorldSnapshot();
    const delta = { worldVersion: 1, eventSequence: 1, phase: "CORONATION" as const, currentReignId: null, reign: null, ruler: null, coronation: null, activeDefenses: [], changes: [] };
    expect(applyWorldDelta({ ...snapshot, worldVersion: 3 }, delta)).toEqual({ ...snapshot, worldVersion: 3 });
  });
});
