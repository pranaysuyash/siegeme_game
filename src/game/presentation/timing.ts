export const PRESENTATION_TIMING = {
  flightDefaultSeconds: 0.85,
  impactMs: 700,
  cameraShakeMs: 850,
  rubbleMs: 650,
  launcherRecoilMs: 180,
} as const;

/**
 * Converts server simulation time into a readable client presentation time.
 * The server remains authoritative for the hit and its physical time. The
 * client adds a bounded floor so a fast local collision still has a visible
 * release-to-impact beat.
 */
export function presentationFlightSeconds(timeSeconds: number | null | undefined) {
  if (!Number.isFinite(timeSeconds) || (timeSeconds ?? 0) <= 0) return PRESENTATION_TIMING.flightDefaultSeconds;
  return Math.min(2.4, Math.max(0.85, (timeSeconds as number) * 1.35));
}
