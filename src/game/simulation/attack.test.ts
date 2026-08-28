import { describe, expect, it } from "vitest";
import { componentStateFromHp } from "@/game/simulation/attack";

describe("attack intent contract", () => {
  it("uses explicit visual damage stages", () => {
    expect(componentStateFromHp(115, 115)).toBe("INTACT");
    expect(componentStateFromHp(75, 115)).toBe("DAMAGED");
    expect(componentStateFromHp(20, 115)).toBe("CRITICAL");
    expect(componentStateFromHp(0, 115)).toBe("DESTROYED");
  });
});
