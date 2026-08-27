import type { PublicWorldSnapshot, Vector3Tuple, WorldDefinition } from "../domain/types";
import { powerOrbPosition } from "../simulation/ballistics";

export type PresentationTargetKind = "component" | "power-orb" | "defense" | "miss" | "unknown";

export function presentationTargetKind(targetId: string | null | undefined): PresentationTargetKind {
  if (!targetId) return "unknown";
  if (targetId === "power-orb") return "power-orb";
  if (targetId === "miss") return "miss";
  if (targetId.startsWith("defense:")) return "defense";
  if (targetId.includes(":")) return "component";
  return "unknown";
}

/** Resolve every authority target into the same scene-space position. */
export function presentationTargetPosition(definition: WorldDefinition, snapshot: PublicWorldSnapshot | null, targetId: string | null | undefined): Vector3Tuple | null {
  if (!targetId) return null;
  const component = definition.components.find((candidate) => candidate.id === targetId);
  if (component) return component.position;
  if (targetId === "power-orb") return powerOrbPosition(definition, snapshot?.worldVersion ?? 1);
  if (targetId.startsWith("defense:")) {
    const defense = snapshot?.activeDefenses.find((candidate) => `defense:${candidate.id}` === targetId);
    const slot = defense ? definition.defenseSlots.find((candidate) => candidate.id === defense.slotId) : null;
    return slot?.position ?? null;
  }
  return null;
}
