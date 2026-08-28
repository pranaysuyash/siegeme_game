export const BLOOM_CONFIG = {
  luminanceThreshold: 0.9,
  luminanceSmoothing: 0.12,
  intensity: 0.42,
  mipmapBlur: true,
  multisampling: 0,
  enableNormalPass: false,
} as const;

export type PostProcessingPolicy = {
  enabled: boolean;
  reason: "enabled" | "reduced-graphics" | "reduced-motion";
};

/** Keep the full-screen effect policy explicit and independently testable. */
export function postProcessingPolicyFor(reducedGraphics: boolean, motionReduced: boolean): PostProcessingPolicy {
  if (motionReduced) return { enabled: false, reason: "reduced-motion" };
  if (reducedGraphics) return { enabled: false, reason: "reduced-graphics" };
  return { enabled: true, reason: "enabled" };
}
