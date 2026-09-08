import { describe, expect, it } from "vitest";
import { cameraPresetFor, easeOutHandoff, flightShakeOffset } from "@/game/camera";
import { PerspectiveCamera, Vector3 } from "three";

describe("camera presentation contract", () => {
  it("tightens the lens during aim without changing world coordinates", () => {
    const live = cameraPresetFor({ mode: "spectator", phase: "ACTIVE", viewportWidth: 1280 });
    const aim = cameraPresetFor({ mode: "attack-aim", phase: "ACTIVE", viewportWidth: 1280 });
    expect(aim.fov).toBeLessThan(live.fov);
    expect(live.target).toEqual([0, 2.1, 0]);
  });

  it("uses the decisive impact framing when the staged authority result opens coronation", () => {
    const preset = cameraPresetFor({ mode: "attack-flight", phase: "ACTIVE", pendingPhase: "CORONATION", viewportWidth: 1280 });
    expect(preset.target).toEqual([0, 4.05, 0.85]);
    expect(preset.fov).toBe(31);
  });

  it("keeps mobile framing bounded and easing monotonic", () => {
    const desktop = cameraPresetFor({ mode: "defense-placement", phase: "ACTIVE", viewportWidth: 1280 });
    const mobile = cameraPresetFor({ mode: "defense-placement", phase: "ACTIVE", viewportWidth: 390 });
    expect(mobile.position[2]).toBeGreaterThan(desktop.position[2]);
    expect(easeOutHandoff(0)).toBe(0);
    expect(easeOutHandoff(0.5)).toBeGreaterThan(0.5);
    expect(easeOutHandoff(1)).toBe(1);
  });

  it("fits both tower silhouettes in portrait, landscape, and desktop framing", () => {
    for (const [width, height] of [[390, 844], [844, 390], [1440, 1000], [320, 568]]) {
      const preset = cameraPresetFor({ mode: "spectator", phase: "ACTIVE", viewportWidth: width, viewportHeight: height });
      const camera = new PerspectiveCamera(preset.fov, width / height, 0.1, 180);
      camera.position.fromArray(preset.position);
      camera.lookAt(new Vector3(...preset.target));
      camera.updateMatrixWorld();
      for (const x of [-5.2, 5.2]) for (const y of [0.8, 6.7]) for (const z of [-1.2, 1.2]) {
        const screen = new Vector3(x, y, z).project(camera);
        expect(Math.abs(screen.x), `${width}x${height} horizontal crop`).toBeLessThan(0.92);
        expect(Math.abs(screen.y), `${width}x${height} vertical crop`).toBeLessThan(0.86);
      }
    }
  });

  it("keeps shake presentation-only and fully disabled for reduced motion", () => {
    expect(flightShakeOffset(100, false)).toEqual([0, 0, 0]);
    expect(flightShakeOffset(100, true)).not.toEqual([0, 0, 0]);
    expect(flightShakeOffset(900, true)).toEqual([0, 0, 0]);
  });

  it("keeps flight shake finite and bounded across the active window", () => {
    const samples = Array.from({ length: 19 }, (_, index) => flightShakeOffset(index * 50, true));
    expect(samples.at(-1)).toEqual([0, 0, 0]);
    for (const offset of samples) {
      expect(offset.every(Number.isFinite)).toBe(true);
      expect(offset.every((value) => Math.abs(value) <= 0.12)).toBe(true);
    }
  });
});
