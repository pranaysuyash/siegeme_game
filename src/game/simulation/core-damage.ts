import type { AuthoritativeWorldState } from "../domain/types";
import { componentStateFromHp } from "./attack";

/**
 * Applies Core damage through one authoritative path so the dual Core-HP source
 * (`reign.coreIntegrity` and `components[core].hp`) can never diverge (DM-6).
 * Clamps to `[0, coreMaxIntegrity]` and keeps the component stage in sync with
 * `componentStateFromHp`. Returns whether the Core was breached.
 */
export function applyCoreDamage(
  state: AuthoritativeWorldState,
  amount: number,
  coreComponentId: string,
  options: { disarmRoyalShieldPulse?: boolean } = {},
): { breached: boolean } {
  const reign = state.reign;
  if (!reign) return { breached: false };
  const safeAmount = Number.isFinite(amount) ? Math.max(0, amount) : 0;
  const nextIntegrity = Math.min(reign.coreMaxIntegrity, Math.max(0, reign.coreIntegrity - safeAmount));
  state.reign = {
    ...reign,
    coreIntegrity: nextIntegrity,
    royalShieldPulseArmed: options.disarmRoyalShieldPulse ? false : reign.royalShieldPulseArmed,
  };
  state.components = state.components.map((component) =>
    component.componentId === coreComponentId
      ? { ...component, hp: nextIntegrity, state: componentStateFromHp(nextIntegrity, reign.coreMaxIntegrity) }
      : component,
  );
  return { breached: nextIntegrity <= 0 };
}
