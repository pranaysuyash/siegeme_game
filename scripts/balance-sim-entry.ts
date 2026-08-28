import { generateFortress } from "../src/game/world/generator";
import { BALLISTIC_SIMULATION_VERSION, damageForPower, resolveBallisticShot } from "../src/game/simulation/ballistics";
import { createInitialWorldSnapshot } from "../src/game/world/initial-snapshot";

// Deterministic RNG so every run of the simulator is reproducible.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rng: () => number) {
  const a = Math.max(rng(), 1e-9);
  return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * rng());
}

type Aim = { yaw: number; elevation: number; power: number };
type ShotOutcome = { hit: boolean; targetId: string | null; damage: number };

function fire(aim: Aim): ShotOutcome {
  const snapshot = createInitialWorldSnapshot();
  const definition = generateFortress(snapshot.worldSeed, snapshot.generatorVersion);
  const resolution = resolveBallisticShot(definition, snapshot, { ...aim, simulationVersion: BALLISTIC_SIMULATION_VERSION });
  if (!resolution.hit) return { hit: false, targetId: null, damage: 0 };
  return { hit: true, targetId: resolution.hit.componentId, damage: damageForPower(aim.power) };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const snapshot = createInitialWorldSnapshot();
const definition = generateFortress(snapshot.worldSeed, snapshot.generatorVersion);
const enclosure = definition.components.find((component) => component.id === "core:enclosure");
const core = definition.components.find((component) => component.id === "core:main");

// Coarse grid: the strongest single aim against the intact fortress (weighting
// Core-line progress above all, since that is the win condition).
let best: Aim & { score: number } = { yaw: 0, elevation: 0.64, power: 0.5, score: -1 };
for (let yaw = -0.72; yaw <= 0.721; yaw += 0.09) {
  for (let elevation = 0.5; elevation <= 0.861; elevation += 0.04) {
    for (const power of [0.25, 0.5, 0.75, 1]) {
      const outcome = fire({ yaw, elevation, power });
      const score = outcome.targetId === "core:main" ? outcome.damage * 10 : outcome.targetId === "core:enclosure" ? outcome.damage * 2 : outcome.damage;
      if (score > best.score) best = { yaw, elevation, power, score };
    }
  }
}

const personas: Record<string, { sigma: number; shots: number }> = {
  novice: { sigma: 0.12, shots: 1500 },
  average: { sigma: 0.06, shots: 1500 },
  expert: { sigma: 0.02, shots: 1500 },
};

const rows: Array<Record<string, number | string>> = [];
const coreMax = core?.maxHp ?? 100;
const enclosureMax = enclosure?.maxHp ?? 110;
const coreCap = 20;

for (const [persona, { sigma, shots }] of Object.entries(personas)) {
  const rng = mulberry32(20260828 + sigma * 1000);
  let hits = 0;
  let damageTotal = 0;
  let enclosureHits = 0;
  let enclosureDamage = 0;
  let coreHits = 0;
  let coreDamage = 0;
  let orbHits = 0;

  for (let index = 0; index < shots; index += 1) {
    const aim: Aim = {
      yaw: clamp(best.yaw + gaussian(rng) * sigma, -0.72, 0.72),
      elevation: clamp(best.elevation + gaussian(rng) * sigma * 0.5, 0.5, 0.86),
      power: clamp(best.power + gaussian(rng) * 0.08, 0.25, 1),
    };
    const outcome = fire(aim);
    if (!outcome.hit) continue;
    hits += 1;
    damageTotal += outcome.damage;
    if (outcome.targetId === "core:enclosure") {
      enclosureHits += 1;
      enclosureDamage += outcome.damage;
    }
    if (outcome.targetId === "core:main") {
      coreHits += 1;
      coreDamage += Math.min(outcome.damage, coreCap);
    }
    if (outcome.targetId === "power-orb") orbHits += 1;
  }

  const enclosureShotsToClear = enclosureDamage > 0 ? Math.ceil(enclosureMax / (enclosureDamage / enclosureHits)) : Infinity;
  const coreShotsToKill = coreDamage > 0 ? Math.ceil(coreMax / (coreDamage / coreHits)) : Infinity;
  const perShotCoreProgress = coreDamage / shots;

  rows.push({
    persona,
    hitRate: `${((hits / shots) * 100).toFixed(1)}%`,
    avgDamagePerShot: (damageTotal / shots).toFixed(2),
    enclosureHitRate: `${((enclosureHits / shots) * 100).toFixed(1)}%`,
    coreHitRate: `${((coreHits / shots) * 100).toFixed(1)}%`,
    orbHitRate: `${((orbHits / shots) * 100).toFixed(1)}%`,
    shotsToClearEnclosure: Number.isFinite(enclosureShotsToClear) ? enclosureShotsToClear : "never",
    coreHitsToKill: Number.isFinite(coreShotsToKill) ? coreShotsToKill : "never",
    perShotCoreProgress: perShotCoreProgress.toFixed(3),
    estShotsToBreach: Number.isFinite(enclosureShotsToClear) && Number.isFinite(coreShotsToKill) ? Math.ceil(enclosureShotsToClear + coreShotsToKill) : "never",
  });
}

console.log(`best structural aim: yaw=${best.yaw.toFixed(2)} elevation=${best.elevation.toFixed(2)} power=${best.power.toFixed(2)}`);
console.table(rows);
console.log("notes: shotsToClearEnclosure assumes repeated perfect-arc shots at an intact fortress; estShotsToBreach = enclosure clear + core kill at measured per-hit damage (Core damage capped). Real reigns add shields, braces, defenders, and queue pacing.");
