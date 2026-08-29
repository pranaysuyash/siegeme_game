import { describe, expect, it } from "vitest";
import { debrisTransform, type DebrisFragment } from "@/game/presentation/debris";

const fragment: DebrisFragment = { position: [0, 0.22, 0], velocity: [1, 1.3, 0], rotation: [0, 0, 0], angularVelocity: [1.8, 2.2, 1.5] };

describe("cosmetic debris transform", () => {
  it("keeps debris above the floor and advances its angular motion", () => {
    const result = debrisTransform(fragment, 0.1);
    expect(result.position[1]).toBeGreaterThanOrEqual(0.08);
    expect(result.position[0]).toBeCloseTo(0.1);
    expect(result.rotation[1]).toBeCloseTo(0.22);
  });

  it("produces a bounded damped bounce after the first arc", () => {
    const result = debrisTransform(fragment, 0.8);
    expect(result.bounced).toBe(true);
    expect(result.position.every(Number.isFinite)).toBe(true);
    expect(result.position[1]).toBeGreaterThanOrEqual(0.08);
  });

  it("stays deterministic and finite across a complete collapse cycle", () => {
    for (let step = 0; step <= 30; step += 1) {
      const elapsed = step / 20;
      const first = debrisTransform(fragment, elapsed);
      const second = debrisTransform(fragment, elapsed);
      expect(first).toEqual(second);
      expect(first.position.every(Number.isFinite)).toBe(true);
      expect(first.rotation.every(Number.isFinite)).toBe(true);
      expect(first.position[1]).toBeGreaterThanOrEqual(0.08);
      expect(Math.abs(first.position[0])).toBeLessThanOrEqual(1.6);
      expect(Math.abs(first.position[2])).toBeLessThanOrEqual(1.6);
    }
  });
});
