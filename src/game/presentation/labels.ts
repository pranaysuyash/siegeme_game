import type { PublicWorldSnapshot } from "../domain/types";

export function impactLabel(targetId: string, damage: number, projectileType: "STANDARD" | "BREAKER" = "STANDARD", snapshot: PublicWorldSnapshot | null = null) {
  const prefix = projectileType === "BREAKER" ? "Breaker · " : "";
  if (targetId === "miss") return `${prefix}Miss`;
  if (targetId === "power-orb") return `${prefix}Power Orb struck${damage > 0 ? ` · −${damage}` : ""}`;
  if (targetId.startsWith("defense:")) {
    const defense = snapshot?.activeDefenses.find((candidate) => `defense:${candidate.id}` === targetId);
    return `${prefix}${defense?.type === "BRACE" ? "Brace held" : "Shield absorbed"}${damage > 0 ? ` · −${damage}` : ""}`;
  }
  if (targetId === "core:main") return `${prefix}Core hit · −${damage}`;
  if (targetId === "core:enclosure") return `${prefix}Core enclosure hit · −${damage}`;
  if (targetId.includes(":")) {
    const [type, side] = targetId.split(":");
    return `${prefix}${type.replaceAll("_", " ")} ${side?.replaceAll("_", " ") ?? ""}`.trim() + ` · −${damage}`;
  }
  return `${prefix}Structure hit · −${damage}`;
}
