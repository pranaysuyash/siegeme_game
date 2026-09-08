import type { Vector3Tuple } from "../domain/types";
import { trajectoryPreview, type BallisticInput } from "../simulation/ballistics";

/** Replay a confirmed shot; presentation must not determine its hit or damage. */
export function flightPosition(from: Vector3Tuple, to: Vector3Tuple, aim: BallisticInput, progress: number): Vector3Tuple {
  const p = Math.min(1, Math.max(0, progress));
  if (p === 0) return [...from];
  if (p === 1) return [...to];
  // Horizontal velocity is constant. Recover physical time from the confirmed
  // endpoint; the slower presentation duration does not change the trajectory.
  const oneSecond = trajectoryPreview(aim, 1, 1)[0];
  const speed = Math.hypot(oneSecond[0], oneSecond[2]);
  const seconds = Math.hypot(to[0] - from[0], to[2] - from[2]) / Math.max(0.001, speed);
  const offset = trajectoryPreview(aim, 1, seconds * p)[0];
  const endpoint = trajectoryPreview(aim, 1, seconds)[0];
  // Swept collision sampling can introduce a small endpoint difference.
  return offset.map((value, i) => from[i] + value + (to[i] - from[i] - endpoint[i]) * p) as Vector3Tuple;
}
