import { describe, expect, it } from "vitest";
import { graphicsPolicyFor } from "@/game/client/graphics-policy";

describe("graphics policy", () => {
  it("keeps the full policy for a wide device with enough memory", () => {
    expect(graphicsPolicyFor(1280, 8)).toEqual({ reduced: false, reason: "none", viewportWidth: 1280, deviceMemory: 8 });
  });

  it("reports a narrow viewport before memory as the reduction reason", () => {
    expect(graphicsPolicyFor(390, 2).reason).toBe("narrow-viewport");
  });

  it("reports low device memory for a wide constrained device", () => {
    expect(graphicsPolicyFor(1280, 4)).toMatchObject({ reduced: true, reason: "low-device-memory" });
  });

  it("sanitizes unknown browser memory values without inventing a constraint", () => {
    expect(graphicsPolicyFor(Number.NaN, undefined)).toEqual({ reduced: true, reason: "narrow-viewport", viewportWidth: 0, deviceMemory: null });
  });
});
