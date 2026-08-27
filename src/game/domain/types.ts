export type WorldPhase = "CORONATION" | "ACTIVE";
export type ComponentState = "INTACT" | "DAMAGED" | "CRITICAL" | "DESTROYED";
export type MaterialClass = "STONE" | "WOOD" | "METAL" | "CORE";
export type ComponentType =
  | "FOUNDATION"
  | "KEEP"
  | "TOWER"
  | "WALL"
  | "GATE"
  | "CORE_ENCLOSURE"
  | "CORE"
  | "THRONE";

export type Vector3Tuple = [number, number, number];

export type RulerIdentity = {
  displayName: string;
  identityType: string;
  destinationUrl: string | null;
  destinationDomain: string | null;
  message: string | null;
  ctaChoice: string | null;
  verified: boolean;
};

export type WorldComponentDefinition = {
  id: string;
  type: ComponentType;
  position: Vector3Tuple;
  size: Vector3Tuple;
  materialClass: MaterialClass;
  maxHp: number;
  supportGroup?: string;
  destructible: boolean;
};

export type WorldComponentState = {
  componentId: string;
  hp: number;
  maxHp: number;
  state: ComponentState;
  version: number;
};

export type DefenseSlotDefinition = {
  id: string;
  type: "SHIELD" | "BRACE";
  position: Vector3Tuple;
  size: Vector3Tuple;
};

export type WorldDefinition = {
  generatorVersion: string;
  seed: string;
  components: WorldComponentDefinition[];
  defenseSlots: DefenseSlotDefinition[];
  coreComponentId: string;
  launcherPosition: Vector3Tuple;
};

export type PublicWorldSnapshot = {
  worldId: string;
  worldVersion: number;
  phase: WorldPhase;
  generatorVersion: string;
  worldSeed: string;
  currentReignId: string | null;
  reign: {
    id: string;
    ordinal: number;
    startedAt: string;
    coreIntegrity: number;
    coreMaxIntegrity: number;
    siegeCharge: number;
    royalGuardCharge: number;
    nextDefensePriceMinor: number;
  } | null;
  ruler: RulerIdentity | null;
  components: WorldComponentState[];
  activeDefenses: Array<{
    id: string;
    type: "SHIELD" | "BRACE";
    slotId: string;
    hp: number;
    maxHp: number;
  }>;
};
