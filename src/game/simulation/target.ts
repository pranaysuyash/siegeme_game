export type BallisticTarget =
  | { kind: "core"; componentId: string }
  | { kind: "power-orb"; componentId: "power-orb" }
  | { kind: "defense"; componentId: string; defenseId: string }
  | { kind: "component"; componentId: string };

const DEFENSE_PREFIX = "defense:";

/**
 * Normalizes the synthetic collision ids the resolver returns ("power-orb",
 * "defense:<id>", the core component id, or a generic component id) into a typed
 * target so the application never string-parses them inline (DM-14). A misparse
 * would otherwise make the orb damage the Core or leave defenses undepleted.
 */
export function parseBallisticTarget(componentId: string, coreComponentId: string): BallisticTarget {
  if (componentId === "power-orb") return { kind: "power-orb", componentId };
  if (componentId === coreComponentId) return { kind: "core", componentId };
  if (componentId.startsWith(DEFENSE_PREFIX)) {
    return { kind: "defense", componentId, defenseId: componentId.slice(DEFENSE_PREFIX.length) };
  }
  return { kind: "component", componentId };
}
