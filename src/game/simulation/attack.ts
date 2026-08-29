export type AttackIntent = {
  targetId: string;
  damage: number;
  coreDamage: number;
  point?: [number, number, number] | null;
  timeSeconds?: number | null;
  blockedByRoyalShieldPulse?: boolean;
  defenseType?: "SHIELD" | "BRACE";
};

export function componentStateFromHp(hp: number, maxHp: number) {
  if (hp <= 0) return "DESTROYED" as const;
  if (hp / maxHp <= 0.25) return "CRITICAL" as const;
  if (hp / maxHp < 0.8) return "DAMAGED" as const;
  return "INTACT" as const;
}
