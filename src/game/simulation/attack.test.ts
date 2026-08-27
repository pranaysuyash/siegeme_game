import { describe, expect, it } from "vitest";
import { componentStateFromHp, resolveAttackIntent } from "@/game/simulation/attack";
import { createInitialWorldSnapshot } from "@/game/world/initial-snapshot";

describe("attack intent contract", () => {
  it("maps aim to a semantic target without mutating the world", () => {
    const result = resolveAttackIntent(createInitialWorldSnapshot(), 0, 0.64, 1);
    expect(result.targetId).toBe("wall:front:center");
    expect(result.damage).toBe(20);
    expect(result.coreDamage).toBe(0);
  });

  it("targets the enclosure until the server snapshot exposes the Core", () => {
    const snapshot = createInitialWorldSnapshot();
    const result = resolveAttackIntent(snapshot, 0, 0.86, 1);
    expect(result.targetId).toBe("core:enclosure");
    expect(result.coreDamage).toBe(0);
  });

  it("uses explicit visual damage stages", () => {
    expect(componentStateFromHp(115, 115)).toBe("INTACT");
    expect(componentStateFromHp(75, 115)).toBe("DAMAGED");
    expect(componentStateFromHp(20, 115)).toBe("CRITICAL");
    expect(componentStateFromHp(0, 115)).toBe("DESTROYED");
  });
});
