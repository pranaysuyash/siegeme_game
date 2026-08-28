import type { Vector3Tuple } from "../domain/types";

export type DebrisFragment = {
  position: Vector3Tuple;
  velocity: Vector3Tuple;
  rotation: Vector3Tuple;
  angularVelocity: Vector3Tuple;
};

export type DebrisTransform = { position: Vector3Tuple; rotation: Vector3Tuple; bounced: boolean };

const GRAVITY = 4.2;
const FLOOR_Y = 0.08;
const BOUNCE_DAMPING = 0.34;

function clampTime(seconds: number) { return Math.min(1.5, Math.max(0, Number.isFinite(seconds) ? seconds : 0)); }

/** Deterministic cosmetic debris transform with one damped floor bounce. */
export function debrisTransform(fragment: DebrisFragment, elapsedSeconds: number): DebrisTransform {
  const time = clampTime(elapsedSeconds);
  const [x, y, z] = fragment.position;
  const [vx, vy, vz] = fragment.velocity;
  const [rx, ry, rz] = fragment.rotation;
  const [ax, ay, az] = fragment.angularVelocity;
  const collisionA = -GRAVITY;
  const collisionB = vy;
  const collisionC = y - FLOOR_Y;
  const discriminant = collisionB * collisionB - 4 * collisionA * collisionC;
  const collisionTime = discriminant >= 0 ? (-collisionB - Math.sqrt(discriminant)) / (2 * collisionA) : Number.POSITIVE_INFINITY;
  const bounced = collisionTime >= 0 && collisionTime < time;
  const localTime = bounced ? time - collisionTime : time;
  const vertical = bounced
    ? FLOOR_Y + Math.max(0, -vy - GRAVITY * collisionTime) * BOUNCE_DAMPING * localTime - 0.5 * GRAVITY * localTime * localTime
    : y + vy * time - 0.5 * GRAVITY * time * time;
  return {
    position: [x + vx * time, Math.max(FLOOR_Y, vertical), z + vz * time],
    rotation: [rx + ax * time, ry + ay * time, rz + az * time],
    bounced,
  };
}
