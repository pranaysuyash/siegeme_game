export type GraphicsReductionReason = "none" | "narrow-viewport" | "low-device-memory";

export type GraphicsPolicy = {
  reduced: boolean;
  reason: GraphicsReductionReason;
  viewportWidth: number;
  deviceMemory: number | null;
};

/** Keep graphics degradation explainable and independent from motion preference. */
export function graphicsPolicyFor(viewportWidth: number, deviceMemory: number | null | undefined): GraphicsPolicy {
  const safeViewportWidth = Number.isFinite(viewportWidth) ? Math.max(0, viewportWidth) : 0;
  const safeDeviceMemory = typeof deviceMemory === "number" && Number.isFinite(deviceMemory) && deviceMemory > 0 ? deviceMemory : null;
  const reason = safeViewportWidth < 700 ? "narrow-viewport" : safeDeviceMemory !== null && safeDeviceMemory <= 4 ? "low-device-memory" : "none";
  return { reduced: reason !== "none", reason, viewportWidth: safeViewportWidth, deviceMemory: safeDeviceMemory };
}
