import { describe, expect, it } from "vitest";
import { createInitialWorldSnapshot } from "../world/initial-snapshot";
import { battlefieldHint, isBattleActive } from "./battlefield";

describe("battlefield communication", () => {
  it("does not turn historical Core damage into a claim of active combat", () => {
    const world = createInitialWorldSnapshot();
    world.reign!.coreIntegrity = 18;
    expect(isBattleActive(world, false)).toBe(false);
    expect(isBattleActive(world, true)).toBe(true);
    world.phase = "CORONATION";
    expect(isBattleActive(world, true)).toBe(false);
    expect(isBattleActive(null, true)).toBe(false);
  });
  it("introduces the goal before advanced shared-charge tactics", () => {
    const world = createInitialWorldSnapshot();
    expect(battlefieldHint(world)).toContain("Break the walls");
    world.reign!.siegeCharge = 85;
    expect(battlefieldHint(world)).toContain("Power Orb");
    world.components.find((part) => part.componentId === "core:enclosure")!.state = "DESTROYED";
    expect(battlefieldHint(world)).toContain("Core is exposed");
  });
});
