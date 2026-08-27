import type { PublicWorldSnapshot } from "../domain/types";
import { GameConfig } from "../config";

export type AttackIntent = {
  targetId: string;
  damage: number;
  coreDamage: number;
  point?: [number, number, number] | null;
  timeSeconds?: number | null;
  blockedByRoyalShieldPulse?: boolean;
};

/**
 * Legacy threshold fixture used by focused unit tests and design experiments.
 * Live Worker attacks use resolveBallisticShot, which sweeps generator geometry
 * and returns the authoritative hit point and flight time.
 */
export function resolveAttackIntent(snapshot: PublicWorldSnapshot, yaw: number, elevation: number, power: number): AttackIntent {
  const coreIsExposed = snapshot.components.find((component) => component.componentId === "core:enclosure")?.state === "DESTROYED";
  const targetId = elevation > 0.78
    ? coreIsExposed ? "core:main" : "core:enclosure"
    : yaw < -0.28 ? "wall:front:left" : yaw > 0.28 ? "wall:front:right" : "wall:front:center";
  const damage = Math.round(GameConfig.attack.baseDamage + power * GameConfig.attack.powerDamage);
  return {
    targetId,
    damage,
    coreDamage: targetId === "core:main" && coreIsExposed ? Math.min(damage, GameConfig.attack.maxCoreDamage) : 0,
  };
}

export function componentStateFromHp(hp: number, maxHp: number) {
  if (hp <= 0) return "DESTROYED" as const;
  if (hp / maxHp <= 0.25) return "CRITICAL" as const;
  if (hp / maxHp < 0.8) return "DAMAGED" as const;
  return "INTACT" as const;
}
