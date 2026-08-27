import type { PublicWorldSnapshot, Vector3Tuple, WorldDefinition } from "../domain/types";

export const BALLISTIC_SIMULATION_VERSION = "ballistic-v1" as const;
const GRAVITY = -9.81;
const PROJECTILE_RADIUS = 0.22;
const STEP_SECONDS = 1 / 120;
const MAX_TIME_SECONDS = 2.4;

export type BallisticInput = {
  yaw: number;
  elevation: number;
  power: number;
};

export type BallisticHit = {
  componentId: string;
  point: Vector3Tuple;
  timeSeconds: number;
};

export type BallisticResolution = {
  hit: BallisticHit | null;
};

function positionAt(start: Vector3Tuple, velocity: Vector3Tuple, timeSeconds: number): Vector3Tuple {
  return [
    start[0] + velocity[0] * timeSeconds,
    start[1] + velocity[1] * timeSeconds + 0.5 * GRAVITY * timeSeconds * timeSeconds,
    start[2] + velocity[2] * timeSeconds,
  ];
}

function segmentBoxEntry(start: Vector3Tuple, end: Vector3Tuple, min: Vector3Tuple, max: Vector3Tuple) {
  let entry = 0;
  let exit = 1;
  for (let axis = 0; axis < 3; axis += 1) {
    const delta = end[axis] - start[axis];
    if (Math.abs(delta) < 1e-9) {
      if (start[axis] < min[axis] || start[axis] > max[axis]) return null;
      continue;
    }
    const inverse = 1 / delta;
    let near = (min[axis] - start[axis]) * inverse;
    let far = (max[axis] - start[axis]) * inverse;
    if (near > far) [near, far] = [far, near];
    entry = Math.max(entry, near);
    exit = Math.min(exit, far);
    if (entry > exit) return null;
  }
  return entry;
}

function expandedBounds(position: Vector3Tuple, size: Vector3Tuple): [Vector3Tuple, Vector3Tuple] {
  return [
    [position[0] - size[0] / 2 - PROJECTILE_RADIUS, position[1] - size[1] / 2 - PROJECTILE_RADIUS, position[2] - size[2] / 2 - PROJECTILE_RADIUS],
    [position[0] + size[0] / 2 + PROJECTILE_RADIUS, position[1] + size[1] / 2 + PROJECTILE_RADIUS, position[2] + size[2] / 2 + PROJECTILE_RADIUS],
  ];
}

function launchVelocity(input: BallisticInput): Vector3Tuple {
  const speed = 13 + input.power * 12;
  const horizontal = Math.cos(input.elevation);
  return [
    Math.sin(input.yaw) * horizontal * speed,
    Math.sin(input.elevation) * speed,
    -Math.cos(input.yaw) * horizontal * speed,
  ];
}

/**
 * Deterministic server/replay resolver. It checks the first swept projectile
 * intersection against the immutable generator geometry and ignores already
 * destroyed components. Client aim is input only; it cannot choose the hit.
 */
export function resolveBallisticShot(definition: WorldDefinition, snapshot: PublicWorldSnapshot, input: BallisticInput): BallisticResolution {
  const states = new Map(snapshot.components.map((component) => [component.componentId, component.state]));
  const velocity = launchVelocity(input);
  let previous = definition.launcherPosition;

  for (let step = 1; step <= Math.ceil(MAX_TIME_SECONDS / STEP_SECONDS); step += 1) {
    const timeSeconds = step * STEP_SECONDS;
    const current = positionAt(definition.launcherPosition, velocity, timeSeconds);
    let closestEntry = Number.POSITIVE_INFINITY;
    let closestComponent: typeof definition.components[number] | null = null;

    for (const component of definition.components) {
      if (!component.destructible || states.get(component.id) === "DESTROYED") continue;
      const [min, max] = expandedBounds(component.position, component.size);
      const entry = segmentBoxEntry(previous, current, min, max);
      if (entry !== null && entry < closestEntry) {
        closestEntry = entry;
        closestComponent = component;
      }
    }

    for (const defense of snapshot.activeDefenses) {
      const slot = definition.defenseSlots.find((candidate) => candidate.id === defense.slotId);
      if (!slot || defense.hp <= 0) continue;
      const [min, max] = expandedBounds(slot.position, slot.size);
      const entry = segmentBoxEntry(previous, current, min, max);
      if (entry !== null && entry < closestEntry) {
        closestEntry = entry;
        closestComponent = { id: `defense:${defense.id}`, type: "FOUNDATION", position: slot.position, size: slot.size, materialClass: "METAL", maxHp: defense.maxHp, destructible: true };
      }
    }

    if (closestComponent) {
      const hitTime = (step - 1 + closestEntry) * STEP_SECONDS;
      return { hit: { componentId: closestComponent.id, point: positionAt(definition.launcherPosition, velocity, hitTime), timeSeconds: hitTime } };
    }
    previous = current;
  }

  return { hit: null };
}

export function damageForPower(power: number) {
  return Math.round(8 + power * 12);
}
