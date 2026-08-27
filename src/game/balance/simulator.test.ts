import { describe, expect, it } from "vitest";
import { simulateBalance } from "@/game/balance/simulator";

describe("offline balance simulator", () => {
  it("is deterministic for a fixed scenario and seed", () => {
    const scenario = { reigns: 12, maxShotsPerReign: 200, hitRate: 0.6, seed: 42 };
    expect(simulateBalance(scenario)).toEqual(simulateBalance(scenario));
  });

  it("keeps zero-hit scenarios bounded instead of looping forever", () => {
    const result = simulateBalance({ reigns: 2, maxShotsPerReign: 7, hitRate: 0, defensePlacementsPerReign: 0 });
    expect(result.breachedReigns).toBe(0);
    expect(result.cappedReigns).toBe(2);
    expect(result.averageShots).toBe(7);
    expect(result.totalRevenueMinor).toBe(2 * 3 * 300);
  });

  it("reports a stronger outcome when hit probability increases", () => {
    const low = simulateBalance({ reigns: 40, hitRate: 0.2, seed: 9 });
    const high = simulateBalance({ reigns: 40, hitRate: 0.9, seed: 9 });
    expect(high.breachedReigns).toBeGreaterThanOrEqual(low.breachedReigns);
    expect(high.averageShots).toBeLessThanOrEqual(low.averageShots);
  });
});
