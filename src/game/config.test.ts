import { describe, expect, it } from "vitest";
import { defensePriceForTier, GameConfig, nextDefenseTier } from "@/game/config";

describe("versioned game config", () => {
  it("keeps the defense ladder finite, increasing, and capped", () => {
    const prices = [...GameConfig.defense.priceLadderMinor];
    expect(prices[0]).toBe(300);
    expect(prices.at(-1)).toBe(3400);
    expect(prices.every((price, index) => index === 0 || price > prices[index - 1])).toBe(true);
    expect(defensePriceForTier(999)).toBe(3400);
    expect(nextDefenseTier(999)).toBe(prices.length - 1);
  });

  it("does not allow a malformed price tier to escape the base price", () => {
    expect(defensePriceForTier(-1)).toBe(300);
    expect(defensePriceForTier(Number.NaN)).toBe(300);
    expect(nextDefenseTier(-4)).toBe(1);
  });

  it("keeps brace mitigation bounded and finite", () => {
    expect(GameConfig.defense.braceDamageMultiplier).toBeGreaterThan(0);
    expect(GameConfig.defense.braceDamageMultiplier).toBeLessThan(1);
  });

  it("keeps Breaker Shot multipliers explicit and bounded", () => {
    expect(GameConfig.attack.breakerStructureMultiplier).toBe(1.5);
    expect(GameConfig.attack.breakerCoreDamageCapFraction).toBeGreaterThan(0);
    expect(GameConfig.attack.breakerCoreDamageCapFraction).toBeLessThanOrEqual(1);
  });

  it("bounds spectator broadcast coalescing", () => {
    expect(GameConfig.realtime.broadcastBatchWindowMs).toBeGreaterThan(0);
    expect(GameConfig.realtime.broadcastBatchMaxEvents).toBeGreaterThan(0);
    expect(GameConfig.realtime.broadcastBatchMaxBytes).toBeGreaterThan(1024);
  });
});
