import { describe, expect, it } from "vitest";
import { contributionTitles } from "@/game/domain/contributions";

describe("reign contribution titles", () => {
  it("awards deterministic titles from authoritative counters", () => {
    const result = contributionTitles([
      { playerId: "attacker", shots: 3, hits: 3, damage: 40, coreDamage: 20, powerOrbHits: 1, defensesPlaced: 0 },
      { playerId: "defender", shots: 0, hits: 0, damage: 0, coreDamage: 0, powerOrbHits: 0, defensesPlaced: 2 },
    ], "attacker");
    expect(result[0].titles).toEqual(["Conqueror", "Siege MVP", "Breaker"]);
    expect(result[1].titles).toEqual(["Royal Guard MVP"]);
  });

  it("does not invent a title for zero-contribution records", () => {
    expect(contributionTitles([{ playerId: "spectator", shots: 0, hits: 0, damage: 0, coreDamage: 0, powerOrbHits: 0, defensesPlaced: 0 }], null)[0].titles).toEqual([]);
  });
});
