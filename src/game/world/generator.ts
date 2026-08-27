import type { WorldDefinition } from "@/game/domain/types";

export const GENERATOR_VERSION = "fortress-0.1.0";

function seedOffset(seed: string, channel: number) {
  let value = channel + 17;
  for (const char of seed) value = (value * 31 + char.charCodeAt(0)) % 997;
  return ((value / 997) - 0.5) * 0.22;
}

function generateV010(seed: string): WorldDefinition {
  const wobble = seedOffset(seed, 1);
  return {
    generatorVersion: GENERATOR_VERSION,
    seed,
    launcherPosition: [0, 0.78, 8.2],
    coreComponentId: "core:main",
    powerOrbPosition: [2.1, 2.8, 4.8],
    components: [
      { id: "foundation:main", type: "FOUNDATION", position: [0, 0.42, 0], size: [10.8, 0.75, 5.8], materialClass: "STONE", maxHp: 999, destructible: false },
      { id: "tower:left", type: "TOWER", position: [-4.1, 2.75, -0.25], size: [1.7, 4.9, 1.7], materialClass: "STONE", maxHp: 180, supportGroup: "outer", destructible: true },
      { id: "tower:right", type: "TOWER", position: [4.1, 2.75, -0.25], size: [1.7, 4.9, 1.7], materialClass: "STONE", maxHp: 180, supportGroup: "outer", destructible: true },
      { id: "wall:front:left", type: "WALL", position: [-2.45, 1.85, 0.35 + wobble], size: [2.25, 2.75, 0.82], materialClass: "STONE", maxHp: 115, supportGroup: "outer", destructible: true },
      { id: "wall:front:center", type: "WALL", position: [0, 1.75, 0.38], size: [2.25, 2.55, 0.82], materialClass: "STONE", maxHp: 115, supportGroup: "outer", destructible: true },
      { id: "wall:front:right", type: "WALL", position: [2.45, 1.85, 0.35 - wobble], size: [2.25, 2.75, 0.82], materialClass: "STONE", maxHp: 115, supportGroup: "outer", destructible: true },
      { id: "gate:main", type: "GATE", position: [0, 1.15, 0.92], size: [1.8, 1.55, 0.48], materialClass: "WOOD", maxHp: 85, supportGroup: "gate", destructible: true },
      { id: "keep:central", type: "KEEP", position: [0, 3.2, -0.62], size: [4.2, 4.9, 1.95], materialClass: "STONE", maxHp: 220, supportGroup: "inner", destructible: true },
      { id: "core:enclosure", type: "CORE_ENCLOSURE", position: [0, 4.15, 0.48], size: [2.15, 1.9, 0.68], materialClass: "STONE", maxHp: 110, supportGroup: "core", destructible: true },
      { id: "core:main", type: "CORE", position: [0, 4.05, 1.03], size: [0.78, 0.78, 0.78], materialClass: "CORE", maxHp: 100, supportGroup: "core", destructible: true },
      { id: "throne:main", type: "THRONE", position: [0, 1.1, -1.58], size: [0.95, 1.5, 0.5], materialClass: "METAL", maxHp: 1, destructible: false },
    ],
    defenseSlots: [
      { id: "shield_slot:core_front", type: "SHIELD", position: [0, 3.15, 1.3], size: [2.8, 2.3, 0.12] },
      { id: "shield_slot:left_approach", type: "SHIELD", position: [-2.5, 1.2, 2.1], size: [1.8, 1.6, 0.12] },
      { id: "shield_slot:right_approach", type: "SHIELD", position: [2.5, 1.2, 2.1], size: [1.8, 1.6, 0.12] },
      { id: "brace_slot:front_left", type: "BRACE", position: [-2.45, 1.85, 0.88], size: [1.65, 2.1, 0.12] },
      { id: "brace_slot:front_center", type: "BRACE", position: [0, 1.75, 0.88], size: [1.65, 2, 0.12] },
      { id: "brace_slot:front_right", type: "BRACE", position: [2.45, 1.85, 0.88], size: [1.65, 2.1, 0.12] },
    ],
  };
}

const GENERATORS: Record<string, (seed: string) => WorldDefinition> = {
  [GENERATOR_VERSION]: generateV010,
};

export function generateFortress(seed: string, generatorVersion = GENERATOR_VERSION): WorldDefinition {
  const generator = GENERATORS[generatorVersion];
  if (!generator) throw new Error(`Unsupported fortress generator version: ${generatorVersion}`);
  return generator(seed);
}

export function worldHash(definition: WorldDefinition) {
  return JSON.stringify({ version: definition.generatorVersion, seed: definition.seed, launcher: definition.launcherPosition, powerOrb: definition.powerOrbPosition, core: definition.coreComponentId, components: definition.components, defenseSlots: definition.defenseSlots });
}
