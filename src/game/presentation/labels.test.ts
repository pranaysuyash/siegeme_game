import { describe, expect, it } from "vitest";
import { impactLabel } from "@/game/presentation/labels";
import { createInitialWorldSnapshot } from "@/game/world/initial-snapshot";

describe("impact labels", () => {
  it("keeps misses readable and does not show fake damage", () => {
    expect(impactLabel("miss", 0)).toBe("Miss");
  });

  it("distinguishes special targets and projectile types", () => {
    expect(impactLabel("power-orb", 0, "BREAKER")).toBe("Breaker · Power Orb struck");
    expect(impactLabel("core:main", 12)).toBe("Core hit · −12");
    const snapshot = createInitialWorldSnapshot();
    snapshot.activeDefenses = [{ id: "brace-1", type: "BRACE", slotId: "brace_slot:left", hp: 1, maxHp: 1 }];
    expect(impactLabel("defense:brace-1", 0, "STANDARD", snapshot)).toBe("Brace held");
  });
});
