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
    royalShieldPulseArmed: boolean;
    defensePriceTier: number;
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
  coronation: { protectedUntil: number } | null;
};

export type PublicWorldDelta = {
  worldVersion: number;
  eventSequence: number;
  phase: WorldPhase;
  currentReignId: string | null;
  reign: PublicWorldSnapshot["reign"];
  ruler: RulerIdentity | null;
  coronation: PublicWorldSnapshot["coronation"];
  activeDefenses: PublicWorldSnapshot["activeDefenses"];
  changes: WorldComponentState[];
};

export type ActiveTurn = {
  id: string;
  playerId: string;
  reignId: string;
  startedAt: number;
  expiresAt: number;
  shotNumber: number;
};

export type AttackQueueEntry = {
  playerId: string;
  queuedAt: number;
};

export type AuthoritativeWorldState = PublicWorldSnapshot & {
  gameConfigVersion: string;
  schemaVersion: number;
  eventSequence: number;
  rulerPlayerId: string | null;
  attackQueue: AttackQueueEntry[];
  activeTurn: ActiveTurn | null;
  succession: { status: "STABLE" | "CORE_BREACHED"; decisiveCommandId: string | null };
  coronationState: { status: "NONE" | "AWAITING_IDENTITY" | "PROTECTED"; conquerorPlayerId: string | null; openedAt: number | null; protectedUntil: number | null };
  publicIdentityId: string | null;
  publicIdentityStatus: "NONE" | "PENDING" | "APPROVED" | "REJECTED";
  liveEntitlements: Array<{ grantId: string; playerId: string; kind: "ATTACK_PACK" | "DEFENSE_PACK"; quantityRemaining: number }>;
};
