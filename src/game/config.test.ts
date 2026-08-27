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
});
