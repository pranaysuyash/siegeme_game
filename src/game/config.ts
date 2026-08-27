export const GAME_CONFIG_VERSION = "game-config-0.1.0" as const;

export const GameConfig = {
  version: GAME_CONFIG_VERSION,
  attack: {
    turnDurationMs: 20_000,
    minElevation: 0.5,
    maxElevation: 0.86,
    minPower: 0.25,
    maxPower: 1,
    minYaw: -0.72,
    maxYaw: 0.72,
    baseDamage: 8,
    powerDamage: 12,
    maxCoreDamage: 20,
    powerOrbCharge: 25,
    breakerStructureMultiplier: 1.5,
    breakerCoreDamageCapFraction: 0.25,
  },
  defense: {
    priceLadderMinor: [300, 600, 1200, 2200, 3400] as const,
    royalGuardPerPlacement: 25,
    royalGuardMax: 100,
    shieldHits: 2,
    braceHits: 1,
    braceDamageMultiplier: 0.65,
  },
  coronation: {
    protectedSetupMs: 120_000,
    identityTimeoutMs: 120_000,
  },
  retention: {
    worldEventsKeep: 500,
    commandRetentionMs: 30 * 24 * 60 * 60 * 1000,
  },
  realtime: {
    broadcastBatchWindowMs: 100,
    broadcastBatchMaxEvents: 32,
    broadcastBatchMaxBytes: 64_000,
  },
} as const;

export function defensePriceForTier(tier: number) {
  const safeTier = Number.isInteger(tier) && tier >= 0 ? tier : 0;
  return GameConfig.defense.priceLadderMinor[Math.min(safeTier, GameConfig.defense.priceLadderMinor.length - 1)];
}

export function nextDefenseTier(tier: number) {
  return Math.min(Math.max(0, tier) + 1, GameConfig.defense.priceLadderMinor.length - 1);
}
