import { describe, expect, it } from "vitest";
import { PRESENTATION_TIMING, presentationFlightSeconds } from "@/game/presentation/timing";

describe("presentation timing", () => {
  it("keeps fast authoritative hits visible without exceeding the bounded presentation window", () => {
    expect(presentationFlightSeconds(0.1)).toBe(PRESENTATION_TIMING.flightDefaultSeconds);
    expect(presentationFlightSeconds(1)).toBe(1.35);
    expect(presentationFlightSeconds(10)).toBe(2.4);
  });

  it("uses the default for misses and malformed timing values", () => {
    expect(presentationFlightSeconds(null)).toBe(PRESENTATION_TIMING.flightDefaultSeconds);
    expect(presentationFlightSeconds(Number.NaN)).toBe(PRESENTATION_TIMING.flightDefaultSeconds);
  });
});
