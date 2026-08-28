import { describe, expect, it } from "vitest";
import { parseBallisticTarget } from "@/game/simulation/target";

describe("parseBallisticTarget (DM-14)", () => {
  it("classifies the Power Orb", () => {
    expect(parseBallisticTarget("power-orb", "core:main")).toEqual({ kind: "power-orb", componentId: "power-orb" });
  });

  it("classifies the core component", () => {
    expect(parseBallisticTarget("core:main", "core:main")).toEqual({ kind: "core", componentId: "core:main" });
  });

  it("extracts the defense id from the synthetic prefix", () => {
    expect(parseBallisticTarget("defense:shield-1", "core:main")).toEqual({ kind: "defense", componentId: "defense:shield-1", defenseId: "shield-1" });
  });

  it("falls back to a generic component for everything else", () => {
    expect(parseBallisticTarget("wall:front:center", "core:main")).toEqual({ kind: "component", componentId: "wall:front:center" });
  });
});
