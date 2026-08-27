import { describe, expect, it } from "vitest";
import { attackCommandFingerprint } from "@/game/simulation/command-fingerprint";

const base = {
  commandId: "command-12345678",
  reignId: "reign:001",
  turnId: "turn-12345678",
  expectedWorldVersion: 4,
  simulationVersion: "ballistic-v1",
  yaw: 0.123456,
  elevation: 0.64,
  power: 0.5,
};

describe("attack command fingerprint", () => {
  it("treats harmless transport float noise as the same retry", () => {
    expect(attackCommandFingerprint(base)).toBe(attackCommandFingerprint({ ...base, yaw: base.yaw + 0.0000000004 }));
  });

  it("keeps meaningful aim and projectile changes distinct", () => {
    expect(attackCommandFingerprint(base)).not.toBe(attackCommandFingerprint({ ...base, yaw: base.yaw + 0.000002 }));
    expect(attackCommandFingerprint(base)).not.toBe(attackCommandFingerprint({ ...base, projectile: "BREAKER" }));
  });

  it("normalizes an omitted projectile to the standard projectile identity", () => {
    expect(attackCommandFingerprint(base)).toBe(attackCommandFingerprint({ ...base, projectile: "STANDARD" }));
  });
});
