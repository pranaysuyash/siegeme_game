import { describe, expect, it } from "vitest";
import { damageForPower, powerOrbPosition, resolveBallisticShot, trajectoryPreview } from "@/game/simulation/ballistics";
import { createInitialWorldSnapshot } from "@/game/world/initial-snapshot";
import { generateFortress } from "@/game/world/generator";

describe("authoritative ballistic resolver", () => {
  it("resolves against generator-derived geometry rather than a client target", () => {
    const snapshot = createInitialWorldSnapshot();
    const resolution = resolveBallisticShot(generateFortress(snapshot.worldSeed, snapshot.generatorVersion), snapshot, { yaw: 0, elevation: 0.64, power: 0.5 });
    expect(resolution.hit?.componentId).toBe("core:enclosure");
    expect(resolution.hit?.point).toHaveLength(3);
    expect(resolution.hit?.timeSeconds).toBeGreaterThan(0);
  });

  it("can reach the exposed core only after the enclosure is destroyed", () => {
    const snapshot = createInitialWorldSnapshot();
    snapshot.components = snapshot.components.map((component) => component.componentId !== "core:main" && component.componentId !== "foundation:main" && component.componentId !== "throne:main" ? { ...component, hp: 0, state: "DESTROYED" } : component);
    const resolution = resolveBallisticShot(generateFortress(snapshot.worldSeed, snapshot.generatorVersion), snapshot, { yaw: 0, elevation: 0.55, power: 0.25 });
    expect(resolution.hit?.componentId).toBe("core:main");
  });

  it("ignores destroyed geometry so a hole is a real hole", () => {
    const snapshot = createInitialWorldSnapshot();
    snapshot.components = snapshot.components.map((component) => component.componentId === "wall:front:center" ? { ...component, hp: 0, state: "DESTROYED" } : component);
    const resolution = resolveBallisticShot(generateFortress(snapshot.worldSeed, snapshot.generatorVersion), snapshot, { yaw: 0, elevation: 0.64, power: 0.5 });
    expect(resolution.hit?.componentId).not.toBe("wall:front:center");
  });

  it("uses bounded power for deterministic damage", () => {
    expect(damageForPower(0.25)).toBe(11);
    expect(damageForPower(1)).toBe(20);
  });

  it("never exceeds maxCoreDamage even with out-of-bounds power (DM-2)", () => {
    expect(damageForPower(999)).toBe(damageForPower(1));
    expect(damageForPower(-5)).toBe(damageForPower(0.25));
  });

  it("clamps out-of-envelope aim to configured bounds and stays deterministic (DM-3)", () => {
    const snapshot = createInitialWorldSnapshot();
    const definition = generateFortress(snapshot.worldSeed, snapshot.generatorVersion);
    const wild = resolveBallisticShot(definition, snapshot, { yaw: 50, elevation: -10, power: 999 });
    const wildAgain = resolveBallisticShot(definition, snapshot, { yaw: 50, elevation: -10, power: 999 });
    expect(wildAgain).toEqual(wild);
    expect(damageForPower(999)).toBe(damageForPower(1));
  });

  it("exposes only a deterministic early trajectory preview", () => {
    const preview = trajectoryPreview({ yaw: 0, elevation: 0.64, power: 0.5 });
    expect(preview).toHaveLength(12);
    expect(preview[0][1]).toBeGreaterThan(0);
    expect(preview[0]).toEqual(trajectoryPreview({ yaw: 0, elevation: 0.64, power: 0.5 })[0]);
  });

  it("resolves an active defense before the structure behind it", () => {
    const snapshot = createInitialWorldSnapshot();
    snapshot.activeDefenses = [{ id: "shield-1", type: "SHIELD", slotId: "shield_slot:core_front", hp: 2, maxHp: 2 }];
    const definition = generateFortress(snapshot.worldSeed, snapshot.generatorVersion);
    const aimInputs = [0.5, 0.58, 0.64, 0.7, 0.76, 0.82, 0.86].flatMap((elevation) => [0.25, 0.5, 0.75, 1].map((power) => ({ yaw: 0, elevation, power })));
    const resolution = aimInputs.map((input) => resolveBallisticShot(definition, snapshot, input)).find((candidate) => candidate.hit?.componentId === "defense:shield-1");
    expect(resolution?.hit?.componentId).toBe("defense:shield-1");
  });

  it("moves the Power Orb deterministically with the authoritative world version", () => {
    const snapshot = createInitialWorldSnapshot();
    const definition = generateFortress(snapshot.worldSeed, snapshot.generatorVersion);
    expect(powerOrbPosition(definition, 1)).toEqual(powerOrbPosition(definition, 1));
    expect(powerOrbPosition(definition, 2)).not.toEqual(powerOrbPosition(definition, 1));
  });

  it("can be reached as a real secondary collider instead of a UI-only target", () => {
    const snapshot = createInitialWorldSnapshot();
    const definition = generateFortress(snapshot.worldSeed, snapshot.generatorVersion);
    const inputs = [-0.72, -0.54, -0.36, -0.18, 0, 0.18, 0.36, 0.54, 0.72].flatMap((yaw) => [0.5, 0.58, 0.66, 0.74, 0.82].map((elevation) => ({ yaw, elevation, power: 0.75 })));
    expect(inputs.map((input) => resolveBallisticShot(definition, snapshot, input)).some((result) => result.hit?.componentId === "power-orb")).toBe(true);
  });

  it("is deterministic and returns bounded finite impact data across a representative aim matrix", () => {
    const snapshot = createInitialWorldSnapshot();
    const definition = generateFortress(snapshot.worldSeed, snapshot.generatorVersion);
    const inputs = [-0.72, -0.36, 0, 0.36, 0.72].flatMap((yaw) => [0.5, 0.64, 0.78].map((elevation) => ({ yaw, elevation, power: 0.25 + (Math.abs(yaw) + elevation) % 0.75 })));

    for (const input of inputs) {
      const first = resolveBallisticShot(definition, snapshot, input);
      const second = resolveBallisticShot(definition, snapshot, input);
      expect(second).toEqual(first);
      if (first.hit) {
        expect(first.hit.timeSeconds).toBeGreaterThan(0);
        expect(first.hit.timeSeconds).toBeLessThanOrEqual(2.4);
        expect(first.hit.point.every(Number.isFinite)).toBe(true);
        expect(definition.components.some((component) => component.id === first.hit?.componentId) || first.hit.componentId === "power-orb").toBe(true);
      }
    }
  });
});
