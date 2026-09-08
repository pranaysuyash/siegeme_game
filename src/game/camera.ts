import type { Vector3Tuple, WorldPhase } from "./domain/types";
import { PRESENTATION_TIMING } from "./presentation/timing";

export type CameraPresentationMode =
  | "spectator"
  | "attack-aim"
  | "attack-flight"
  | "defense-placement"
  | "coronation"
  | "defeat-cinematic";

export type CameraPreset = {
  position: Vector3Tuple;
  target: Vector3Tuple;
  fov: number;
  transitionMs: number;
};

type CameraPresetInput = {
  mode: CameraPresentationMode | string;
  phase: WorldPhase;
  pendingPhase?: WorldPhase;
  viewportWidth: number;
  viewportHeight?: number;
};

const LIVE: CameraPreset = { position: [13.5, 10.8, 18.5], target: [0, 2.1, 0], fov: 39, transitionMs: 620 };
const ATTACK: CameraPreset = { position: [7.4, 8.4, 21], target: [0, 2.35, 1.5], fov: 36, transitionMs: 480 };
const DEFENSE: CameraPreset = { position: [11, 13, 18], target: [0, 2.45, 0.35], fov: 37, transitionMs: 480 };
const CORONATION: CameraPreset = { position: [7.3, 5.3, 8.5], target: [0, 3.45, -0.2], fov: 32, transitionMs: 780 };
const DEFEAT: CameraPreset = { position: [5.9, 4.35, 6.8], target: [0, 4.05, 0.85], fov: 31, transitionMs: 680 };

function mobilePreset(preset: CameraPreset, viewportWidth: number, viewportHeight = 800): CameraPreset {
  // Fit horizontal extent on portrait screens. Moving closer crops both towers.
  const aspect = Math.max(0.3, viewportWidth / Math.max(1, viewportHeight));
  const fit = Math.max(1, 0.96 / aspect);
  if (fit === 1) return preset;
  return {
    ...preset,
    position: preset.position.map((value, axis) => preset.target[axis] + (value - preset.target[axis]) * fit) as Vector3Tuple,
  };
}

/**
 * Selects presentation only. It never reads or mutates component health,
 * projectile inputs, or any authoritative world value besides phase.
 */
export function cameraPresetFor(input: CameraPresetInput): CameraPreset {
  const defeat = input.mode === "defeat-cinematic" || input.pendingPhase === "CORONATION";
  const coronation = input.mode === "coronation" || input.phase === "CORONATION";
  const base = defeat ? DEFEAT : coronation ? CORONATION : input.mode === "attack-aim" || input.mode === "attack-flight" ? ATTACK : input.mode === "defense-placement" ? DEFENSE : LIVE;
  return mobilePreset(base, input.viewportWidth, input.viewportHeight);
}

export function easeOutHandoff(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  return 1 - Math.pow(1 - clamped, 1.8);
}

export function flightShakeOffset(elapsedMs: number, enabled: boolean): Vector3Tuple {
  if (!enabled) return [0, 0, 0];
  const elapsed = Math.max(0, elapsedMs);
  const envelope = Math.max(0, 1 - elapsed / PRESENTATION_TIMING.cameraShakeMs);
  if (envelope === 0) return [0, 0, 0];
  const intensity = envelope * 0.045;
  return [
    Math.sin(elapsed * 0.08) * intensity,
    Math.cos(elapsed * 0.11) * intensity * 0.7,
    Math.sin(elapsed * 0.13) * intensity,
  ];
}
