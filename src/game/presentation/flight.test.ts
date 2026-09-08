import { describe, expect, it } from "vitest";
import { flightPosition } from "./flight";
import { trajectoryPreview } from "../simulation/ballistics";
import type { Vector3Tuple } from "../domain/types";

describe("confirmed projectile presentation", () => {
  it("follows gravity at half flight rather than inventing a decorative hump", () => {
    const from: Vector3Tuple = [0, 0.78, 8.2];
    const aim = { yaw: 0, elevation: 0.4, power: 0.65 };
    const speed = 13 + aim.power * 12;
    const duration = 0.4;
    const to: Vector3Tuple = [0, from[1] + Math.sin(0.4) * speed * duration - 4.905 * duration ** 2, from[2] - Math.cos(0.4) * speed * duration];
    const middle = flightPosition(from, to, aim, 0.5);
    expect(middle[1]).toBeCloseTo(from[1] + Math.sin(0.4) * speed * 0.2 - 4.905 * 0.2 ** 2, 5);
    expect(middle[2]).toBeCloseTo(from[2] - Math.cos(0.4) * speed * 0.2, 5);
  });
  it("lands exactly on the committed impact across aim and frame-rate extremes", () => {
    for (const yaw of [-0.6, 0, 0.6]) {
      const aim = { yaw, elevation: 0.5, power: 0.75 };
      const from: Vector3Tuple = [0, 0.78, 8.2];
      const to = trajectoryPreview(aim, 1, 0.35)[0].map((value, i) => value + from[i]) as Vector3Tuple;
      expect(flightPosition(from, to, aim, 0)).toEqual(from);
      flightPosition(from, to, aim, 0.02);
      flightPosition(from, to, aim, 0.8);
      expect(flightPosition(from, to, aim, 1)).toEqual(to);
      expect(flightPosition(from, to, aim, 2)).toEqual(to);
    }
  });
});
