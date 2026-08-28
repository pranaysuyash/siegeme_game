import { describe, expect, it } from "vitest";
import { componentStateFromHp } from "@/game/simulation/attack";
import { damageForPower, resolveBallisticShot } from "@/game/simulation/ballistics";
import { parseBallisticTarget } from "@/game/simulation/target";
import { GameConfig } from "@/game/config";
import { applyCoreDamage } from "@/game/simulation/core-damage";
import { createInitialAuthoritativeWorldState, createNewReignAuthoritativeWorldState, projectPublicWorldSnapshot } from "@/game/world/initial-snapshot";
import { generateFortress, worldHash } from "@/game/world/generator";
import { realtimeSequenceAction } from "@/game/client/realtime";

describe("world invariants", () => {
  it("keeps Core Integrity monotonic through a bounded damage sequence", () => {
    const state = createInitialAuthoritativeWorldState();
    let previous = state.reign!.coreIntegrity;
    for (let step = 0; step < 40; step += 1) {
      state.reign!.coreIntegrity = Math.max(0, state.reign!.coreIntegrity - (step % 7));
      const current = projectPublicWorldSnapshot(state).reign!.coreIntegrity;
      expect(current).toBeLessThanOrEqual(previous);
      previous = current;
    }
  });

  it("keeps generated geometry deterministic and preserves one active reign", () => {
    const first = generateFortress("seed:invariant", "fortress-0.1.0");
    const second = generateFortress("seed:invariant", "fortress-0.1.0");
    expect(worldHash(first)).toBe(worldHash(second));
    const next = createNewReignAuthoritativeWorldState(createInitialAuthoritativeWorldState(), new Date("2026-08-28T00:00:00.000Z"), "player-1", { displayName: "Ruler", identityType: "Person", destinationUrl: null, destinationDomain: null, message: null, ctaChoice: null, verified: false }, "identity-1");
    expect(next.phase).toBe("ACTIVE");
    expect(next.currentReignId).toBe("reign:002");
    expect(next.components.filter((component) => component.state === "DESTROYED")).toHaveLength(0);
  });

  it("never emits a component stage outside its finite health states", () => {
    for (let hp = -20; hp <= 140; hp += 5) expect(["INTACT", "DAMAGED", "CRITICAL", "DESTROYED"]).toContain(componentStateFromHp(hp, 100));
  });

  it("preserves finite world invariants across deterministic event sequences", { timeout: 20000 }, () => {
    for (let scenario = 0; scenario < 64; scenario += 1) {
      const state = createInitialAuthoritativeWorldState();
      let previousIntegrity = state.reign!.coreIntegrity;
      let seed = scenario + 1;
      for (let event = 0; event < 40; event += 1) {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        const damage = seed % 17;
        state.reign!.coreIntegrity = Math.max(0, state.reign!.coreIntegrity - damage);
        state.worldVersion += 1;
        const projected = projectPublicWorldSnapshot(state);
        expect(projected.worldVersion).toBe(event + 2);
        expect(projected.reign?.coreIntegrity).toBeLessThanOrEqual(previousIntegrity);
        expect(projected.reign?.coreIntegrity).toBeGreaterThanOrEqual(0);
        expect(projected.components.every((component) => Number.isFinite(component.hp) && Number.isFinite(component.maxHp))).toBe(true);
        previousIntegrity = projected.reign!.coreIntegrity;
      }
    }
  });

  it("keeps realtime sequence decisions deterministic through duplicate and gap churn", () => {
    for (let scenario = 1; scenario <= 256; scenario += 1) {
      let lastSequence = 0;
      let nextSequence = scenario;
      for (let event = 0; event < 100; event += 1) {
        const action = realtimeSequenceAction(lastSequence, nextSequence);
        expect(["apply", "ignore", "resync"]).toContain(action);
        if (action === "apply") {
          expect(nextSequence).toBeGreaterThan(lastSequence);
          lastSequence = nextSequence;
        } else if (action === "resync") {
          expect(nextSequence).toBeGreaterThan(lastSequence + 1);
        } else {
          expect(nextSequence).toBeLessThanOrEqual(lastSequence);
        }
        nextSequence = event % 5 === 0 ? lastSequence : lastSequence + 1;
      }
    }
  });

  it("keeps Core Integrity bounded and monotonic when driven through the real resolver (DM-8)", () => {
    const definition = generateFortress("seed:invariant", "fortress-0.1.0");
    const state = createInitialAuthoritativeWorldState();
    let previous = state.reign!.coreIntegrity;
    let seed = 12345;
    for (let step = 0; step < 200; step += 1) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const input = {
        yaw: ((seed % 100) / 100) * 1.44 - 0.72,
        elevation: 0.5 + ((seed >> 8) % 36) / 100,
        power: 0.25 + ((seed >> 16) % 76) / 100,
      };
      const resolution = resolveBallisticShot(definition, projectPublicWorldSnapshot(state), input);
      const target = parseBallisticTarget(resolution.hit?.componentId ?? "", definition.coreComponentId);
      if (target.kind === "core") {
        applyCoreDamage(state, Math.min(damageForPower(input.power), GameConfig.attack.maxCoreDamage), definition.coreComponentId);
      }
      const coreIntegrity = state.reign!.coreIntegrity;
      expect(coreIntegrity).toBeLessThanOrEqual(previous);
      expect(coreIntegrity).toBeGreaterThanOrEqual(0);
      expect(coreIntegrity).toBeLessThanOrEqual(state.reign!.coreMaxIntegrity);
      previous = coreIntegrity;
    }
  });

  it("keeps worldVersion and eventSequence in lockstep from the first state (DM-10)", () => {
    const state = createInitialAuthoritativeWorldState();
    expect(state.worldVersion).toBe(state.eventSequence);
    const next = createNewReignAuthoritativeWorldState(state, new Date("2026-08-28T00:00:00.000Z"), "player-1", { displayName: "Ruler", identityType: "Person", destinationUrl: null, destinationDomain: null, message: null, ctaChoice: null, verified: false }, "identity-1");
    expect(next.worldVersion).toBe(next.eventSequence);
    expect(next.worldVersion).toBe(state.worldVersion + 1);
    expect(next.eventSequence).toBe(state.eventSequence + 1);
  });
});
