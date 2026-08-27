import { defensePriceForTier, GameConfig } from "../config";

export type BalanceScenario = {
  reigns: number;
  maxShotsPerReign: number;
  hitRate: number;
  attackPackShots: number;
  attackPackPriceMinor: number;
  baseDamage: number;
  powerDamage: number;
  defensePlacementsPerReign: number;
  defenseDamageMultiplier: number;
  turnDurationMs: number;
  seed: number;
};

export type BalanceSimulationResult = {
  scenario: BalanceScenario;
  completedReigns: number;
  breachedReigns: number;
  averageShots: number;
  averageHits: number;
  averageReignSeconds: number;
  averageAttackRevenueMinor: number;
  averageDefenseRevenueMinor: number;
  totalRevenueMinor: number;
  cappedReigns: number;
};

const DEFAULT_SCENARIO: BalanceScenario = {
  reigns: 100,
  maxShotsPerReign: 500,
  hitRate: 0.55,
  attackPackShots: 3,
  attackPackPriceMinor: 300,
  baseDamage: GameConfig.attack.baseDamage,
  powerDamage: GameConfig.attack.powerDamage,
  defensePlacementsPerReign: 3,
  defenseDamageMultiplier: GameConfig.defense.braceDamageMultiplier,
  turnDurationMs: GameConfig.attack.turnDurationMs,
  seed: 17,
};

function clampProbability(value: number) {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
}

function nextRandom(state: { value: number }) {
  state.value |= 0;
  state.value = Math.imul(state.value ^ (state.value >>> 15), 1 | state.value);
  state.value ^= state.value + Math.imul(state.value ^ (state.value >>> 7), 61 | state.value);
  return ((state.value ^ (state.value >>> 14)) >>> 0) / 4_294_967_296;
}

/**
 * Deterministic offline model for exploring balance, not estimating production.
 * It treats every successful hit as direct Core damage and models each planned
 * defense placement as a multiplicative mitigation layer. The live authority
 * remains the only source of actual outcomes and revenue.
 */
export function simulateBalance(input: Partial<BalanceScenario> = {}): BalanceSimulationResult {
  const scenario: BalanceScenario = { ...DEFAULT_SCENARIO, ...input };
  const reigns = Math.max(0, Math.floor(scenario.reigns));
  const maxShotsPerReign = Math.max(1, Math.floor(scenario.maxShotsPerReign));
  const hitRate = clampProbability(scenario.hitRate);
  const mitigation = Math.min(1, Math.max(0, Number.isFinite(scenario.defenseDamageMultiplier) ? scenario.defenseDamageMultiplier : 1));
  const random = { value: scenario.seed | 0 };
  let breachedReigns = 0;
  let cappedReigns = 0;
  let totalShots = 0;
  let totalHits = 0;
  let totalSeconds = 0;
  let totalAttackRevenueMinor = 0;
  let totalDefenseRevenueMinor = 0;

  for (let reign = 0; reign < reigns; reign += 1) {
    let coreIntegrity = 100;
    let shots = 0;
    let hits = 0;
    while (coreIntegrity > 0 && shots < maxShotsPerReign) {
      shots += 1;
      if (nextRandom(random) > hitRate) continue;
      hits += 1;
      const power = 0.25 + nextRandom(random) * 0.75;
      const damage = Math.max(0, Math.round((scenario.baseDamage + power * scenario.powerDamage) * Math.pow(mitigation, Math.min(reign === 0 ? 0 : scenario.defensePlacementsPerReign, 8))));
      coreIntegrity = Math.max(0, coreIntegrity - damage);
    }
    if (coreIntegrity <= 0) breachedReigns += 1;
    else cappedReigns += 1;
    totalShots += shots;
    totalHits += hits;
    totalSeconds += shots * scenario.turnDurationMs / 1000;
    totalAttackRevenueMinor += Math.ceil(shots / Math.max(1, Math.floor(scenario.attackPackShots))) * Math.max(0, scenario.attackPackPriceMinor);
    for (let placement = 0; placement < Math.max(0, Math.floor(scenario.defensePlacementsPerReign)); placement += 1) totalDefenseRevenueMinor += defensePriceForTier(placement);
  }

  const divisor = Math.max(1, reigns);
  return {
    scenario,
    completedReigns: reigns,
    breachedReigns,
    averageShots: totalShots / divisor,
    averageHits: totalHits / divisor,
    averageReignSeconds: totalSeconds / divisor,
    averageAttackRevenueMinor: totalAttackRevenueMinor / divisor,
    averageDefenseRevenueMinor: totalDefenseRevenueMinor / divisor,
    totalRevenueMinor: totalAttackRevenueMinor + totalDefenseRevenueMinor,
    cappedReigns,
  };
}
