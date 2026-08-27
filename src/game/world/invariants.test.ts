import { describe, expect, it } from "vitest";
import { componentStateFromHp } from "@/game/simulation/attack";
import { createInitialAuthoritativeWorldState, createNewReignAuthoritativeWorldState, projectPublicWorldSnapshot } from "@/game/world/initial-snapshot";
import { generateFortress, worldHash } from "@/game/world/generator";

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
});
