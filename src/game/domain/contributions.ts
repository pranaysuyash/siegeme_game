import type { ReignContribution } from "./types";

export function contributionTitles(records: ReignContribution[], decisivePlayerId: string | null) {
  const titles = new Map<string, string[]>();
  const add = (playerId: string, title: string) => titles.set(playerId, [...(titles.get(playerId) ?? []), title]);
  if (decisivePlayerId) add(decisivePlayerId, "Conqueror");
  const highestDamage = [...records].sort((a, b) => b.damage - a.damage)[0];
  if (highestDamage && highestDamage.damage > 0) add(highestDamage.playerId, "Siege MVP");
  const highestOrb = [...records].sort((a, b) => b.powerOrbHits - a.powerOrbHits)[0];
  if (highestOrb && highestOrb.powerOrbHits > 0) add(highestOrb.playerId, "Breaker");
  const highestDefense = [...records].sort((a, b) => b.defensesPlaced - a.defensesPlaced)[0];
  if (highestDefense && highestDefense.defensesPlaced > 0) add(highestDefense.playerId, "Royal Guard MVP");
  return records.map((record) => ({ ...record, titles: titles.get(record.playerId) ?? [] }));
}
