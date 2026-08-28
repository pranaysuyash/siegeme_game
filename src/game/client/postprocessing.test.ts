import { describe, expect, it } from "vitest";
import { BLOOM_CONFIG, postProcessingPolicyFor } from "@/game/client/postprocessing";

describe("post-processing policy", () => {
  it("keeps bloom selective and avoids an unused normal pass", () => {
    expect(BLOOM_CONFIG.luminanceThreshold).toBeGreaterThanOrEqual(0.88);
    expect(BLOOM_CONFIG.enableNormalPass).toBe(false);
    expect(BLOOM_CONFIG.multisampling).toBe(0);
  });

  it("enables the single bloom path only for the full desktop presentation", () => {
    expect(postProcessingPolicyFor(false, false)).toEqual({ enabled: true, reason: "enabled" });
  });

  it("disables bloom for reduced graphics and reduced motion", () => {
    expect(postProcessingPolicyFor(true, false)).toEqual({ enabled: false, reason: "reduced-graphics" });
    expect(postProcessingPolicyFor(false, true)).toEqual({ enabled: false, reason: "reduced-motion" });
    expect(postProcessingPolicyFor(true, true)).toEqual({ enabled: false, reason: "reduced-motion" });
  });
});
