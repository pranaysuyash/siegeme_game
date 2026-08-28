import { describe, expect, it } from "vitest";
import { applyCoreDamage } from "@/game/simulation/core-damage";
import { createInitialAuthoritativeWorldState } from "@/game/world/initial-snapshot";
import { generateFortress } from "@/game/world/generator";

function withCore() {
  const state = createInitialAuthoritativeWorldState();
  const definition = generateFortress(state.worldSeed, state.generatorVersion);
  return { state, coreComponentId: definition.coreComponentId };
}

describe("applyCoreDamage (DM-6)", () => {
  it("updates both reign integrity and the core component hp atomically", () => {
    const { state, coreComponentId } = withCore();
    state.reign!.coreIntegrity = 100;
    applyCoreDamage(state, 30, coreComponentId);
    const core = state.components.find((component) => component.componentId === coreComponentId)!;
    expect(state.reign!.coreIntegrity).toBe(70);
    expect(core.hp).toBe(70);
    expect(core.state).toBe("DAMAGED");
  });

  it("clamps at zero and reports a breach", () => {
    const { state, coreComponentId } = withCore();
    const { breached } = applyCoreDamage(state, 999, coreComponentId);
    expect(state.reign!.coreIntegrity).toBe(0);
    expect(breached).toBe(true);
  });

  it("never lets malformed negative damage raise integrity", () => {
    const { state, coreComponentId } = withCore();
    state.reign!.coreIntegrity = 95;
    applyCoreDamage(state, -20, coreComponentId);
    expect(state.reign!.coreIntegrity).toBe(95);
  });

  it("disarms the Royal Shield Pulse when requested", () => {
    const { state, coreComponentId } = withCore();
    state.reign!.royalShieldPulseArmed = true;
    applyCoreDamage(state, 5, coreComponentId, { disarmRoyalShieldPulse: true });
    expect(state.reign!.royalShieldPulseArmed).toBe(false);
  });
});
