import type { PublicWorldSnapshot } from "../domain/types";

/** Presentation guidance only; never chooses targets or changes shot strength. */
export function battlefieldHint(snapshot: PublicWorldSnapshot): string {
  if (snapshot.activeDefenses.some((defense) => defense.type === "SHIELD")) return "Shields absorb impacts. Choose your approach.";
  if (snapshot.components.some((part) => part.componentId === "core:enclosure" && part.state === "DESTROYED")) return "The Core is exposed. Make your angle count.";
  if ((snapshot.reign?.siegeCharge ?? 0) >= 80) return "Strike the Power Orb to build shared Siege Charge.";
  return "Break the walls. Expose the Core. Claim the throne.";
}

/** Retained damage is history, not proof that somebody is attacking now. */
export function isBattleActive(snapshot: PublicWorldSnapshot | null, inFlight: boolean): boolean {
  return Boolean(snapshot?.phase === "ACTIVE" && (snapshot.activeAttack || inFlight));
}
