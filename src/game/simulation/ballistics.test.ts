import { describe, expect, it } from "vitest";
import { damageForPower, resolveBallisticShot } from "@/game/simulation/ballistics";
import { createInitialWorldSnapshot } from "@/game/world/initial-snapshot";
import { generateFortress } from "@/game/world/generator";

describe("authoritative ballistic resolver", () => {
  it("resolves against generator-derived geometry rather than a client target", () => {
    const snapshot = createInitialWorldSnapshot();
    const resolution = resolveBallisticShot(generateFortress(snapshot.worldSeed, snapshot.generatorVersion), snapshot, { yaw: 0, elevation: 0.64, power: 0.5 });
    expect(resolution.hit?.componentId).toBe("core:enclosure");
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
});
