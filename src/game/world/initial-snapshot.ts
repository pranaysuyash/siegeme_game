import type { PublicWorldSnapshot } from "../domain/types";
import { generateFortress } from "./generator";

const definition = generateFortress("seed:founders-hold");

/** The first server-owned world state used when the Cloudflare authority boots. */
export function createInitialWorldSnapshot(now = new Date()): PublicWorldSnapshot {
  return {
    worldId: "world:global",
    worldVersion: 1,
    phase: "ACTIVE",
    generatorVersion: definition.generatorVersion,
    worldSeed: definition.seed,
    currentReignId: "reign:001",
    reign: {
      id: "reign:001",
      ordinal: 1,
      startedAt: new Date(now.getTime() - 1000 * 60 * 47).toISOString(),
      coreIntegrity: 100,
      coreMaxIntegrity: 100,
      siegeCharge: 50,
      royalGuardCharge: 25,
      nextDefensePriceMinor: 300,
    },
    ruler: {
      displayName: "The First Hold",
      identityType: "Community",
      destinationUrl: null,
      destinationDomain: null,
      message: "The first reign is live. Everyone can take a shot.",
      ctaChoice: null,
      verified: false,
    },
    components: definition.components.map((component) => ({
      componentId: component.id,
      hp: component.maxHp,
      maxHp: component.maxHp,
      state: "INTACT",
      version: 1,
    })),
    activeDefenses: [],
  };
}
