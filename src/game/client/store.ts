import { create } from "zustand";
import type { ActiveTurn, PublicWorldDelta, PublicWorldSnapshot } from "@/game/domain/types";
import type { AttackIntent } from "@/game/simulation/attack";
import { authorityApiUrl } from "@/game/client/api";
import { applyWorldDelta, realtimeSequenceAction, type RealtimeMessage } from "@/game/client/realtime";
import { impactLabel } from "@/game/presentation/labels";
import { presentationFlightSeconds } from "@/game/presentation/timing";
import { serverClockSkew } from "@/game/client/server-time";

export type AppMode = "loading" | "spectator" | "empty" | "reconnecting" | "unavailable" | "unsupported" | "attack-aim" | "attack-flight" | "attack-requesting" | "defense-placement" | "defeat-cinematic";
export type LoadingStep = "Connecting" | "Loading world" | "World ready";

type AimState = { yaw: number; elevation: number; power: number; isDragging: boolean };
export type DefensePlacement = { type: "SHIELD" | "BRACE"; slotId: string };
export type ProjectileState = { progress: number; targetId: string; damage: number; commandKey: string; projectileType: "STANDARD" | "BREAKER"; aim: { yaw: number; elevation: number; power: number }; impactPoint: [number, number, number] | null; flightSeconds: number } | null;
export type ImpactEffect = { key: string; targetId: string; damage: number; projectileType: "STANDARD" | "BREAKER"; impactPoint: [number, number, number] | null };
export type ShotRecord = { targetId: string; damage: number };

type SiegeStore = {
  mode: AppMode;
  loadingStep: LoadingStep;
  snapshot: PublicWorldSnapshot | null;
  attackAim: AimState;
  turn: ActiveTurn | null;
  turnStatus: "idle" | "claiming" | "active" | "queued";
  queuePosition: number | null;
  projectile: ProjectileState;
  impactEffect: ImpactEffect | null;
  lastResult: string | null;
  attackError: string | null;
  shotLog: ShotRecord[];
  remainingShots: number | null;
  breakerShotsRemaining: number;
  lastEventSequence: number;
  serverClockSkewMs: number;
  activeSheet: "identity" | "attack" | "defend" | "details" | "coronation" | "recovery" | "how" | "summary" | "share" | null;
  defensePlacement: DefensePlacement | null;
  setLoadingStep: (step: LoadingStep) => void;
  setSnapshot: (snapshot: PublicWorldSnapshot) => void;
  setRealtimeSnapshot: (snapshot: PublicWorldSnapshot, eventSequence?: number) => void;
  setRealtimeDelta: (delta: PublicWorldDelta) => void;
  receiveRealtimeMessage: (message: RealtimeMessage) => "apply" | "ignore" | "resync";
  setMode: (mode: AppMode) => void;
  openSheet: (sheet: NonNullable<SiegeStore["activeSheet"]>) => void;
  closeSheet: () => void;
  beginAttack: () => void;
  beginDefense: (type: DefensePlacement["type"], slotId: string) => void;
  cancelDefense: () => void;
  submitDefensePlacement: () => Promise<void>;
  claimTurn: () => Promise<void>;
  cancelTurn: () => Promise<void>;
  setAim: (aim: Partial<AimState>) => void;
  fireAttack: () => Promise<void>;
  refreshEntitlements: () => Promise<void>;
  showImpact: (effect: ImpactEffect) => void;
  advanceTime: (ms: number) => void;
  completeProjectile: () => void;
  clearImpactEffect: (key: string) => void;
  resetAttack: () => void;
};

const initialAim: AimState = { yaw: 0, elevation: 0.64, power: 0.5, isDragging: false };

type SnapshotSource = "initial" | "http" | "realtime" | "completion";

/** Apply every authority snapshot through one version, mode, and clock policy. */
function applyAuthoritySnapshot(state: SiegeStore, snapshot: PublicWorldSnapshot, source: SnapshotSource, eventSequence?: number): Partial<SiegeStore> {
  if (state.snapshot && snapshot.worldVersion < state.snapshot.worldVersion) return {};

  let mode = state.mode;
  if (source === "initial" || (source === "realtime" && state.mode === "reconnecting")) {
    mode = snapshot.phase === "CORONATION" ? "defeat-cinematic" : "spectator";
  } else if (source === "completion" && state.mode !== "reconnecting") {
    mode = snapshot.phase === "CORONATION" ? "defeat-cinematic" : "spectator";
  } else if (snapshot.phase === "CORONATION" && (state.mode === "spectator" || state.mode === "empty")) {
    mode = "defeat-cinematic";
  } else if (snapshot.phase === "ACTIVE" && state.mode === "defeat-cinematic") {
    mode = "spectator";
  } else if (snapshot.phase !== "ACTIVE" && state.mode !== "attack-flight" && state.mode !== "reconnecting") {
    mode = "empty";
  }

  const clearTurn = snapshot.phase !== "ACTIVE" && state.mode !== "attack-flight";
  return {
    snapshot,
    mode,
    ...(clearTurn ? { turn: null, turnStatus: "idle", queuePosition: null, defensePlacement: null } : {}),
    ...(typeof eventSequence === "number" ? { lastEventSequence: eventSequence } : {}),
    serverClockSkewMs: typeof snapshot.serverNow === "number" ? serverClockSkew(snapshot.serverNow, Date.now()) : state.serverClockSkewMs,
  };
}

function enterRealtimeStale(): Partial<SiegeStore> {
  return {
    mode: "reconnecting",
    turn: null,
    turnStatus: "idle",
    queuePosition: null,
    defensePlacement: null,
    attackError: "Reconnecting to the live world — commands are paused until authority confirms the next version.",
  };
}

export const useSiegeStore = create<SiegeStore>((set, get) => ({
  mode: "loading",
  loadingStep: "Connecting",
  snapshot: null,
  attackAim: initialAim,
  turn: null,
  turnStatus: "idle",
  queuePosition: null,
  projectile: null,
  impactEffect: null,
  lastResult: null,
  attackError: null,
  shotLog: [],
  remainingShots: null,
  breakerShotsRemaining: 0,
  lastEventSequence: 0,
  serverClockSkewMs: 0,
  activeSheet: null,
  defensePlacement: null,
  setLoadingStep: (loadingStep) => set({ loadingStep }),
  setSnapshot: (snapshot) => set((state) => ({ ...applyAuthoritySnapshot(state, snapshot, "initial"), lastEventSequence: 0 })),
  setRealtimeSnapshot: (snapshot, eventSequence) => set((state) => applyAuthoritySnapshot(state, snapshot, "realtime", eventSequence)),
  setRealtimeDelta: (delta) => set((state) => {
    if (!state.snapshot) return state;
    const action = realtimeSequenceAction(state.lastEventSequence, delta.eventSequence);
    if (action === "ignore") return state;
    if (action === "resync") return enterRealtimeStale();
    return { ...applyAuthoritySnapshot(state, applyWorldDelta(state.snapshot, delta), "realtime", delta.eventSequence), lastEventSequence: delta.eventSequence };
  }),
  receiveRealtimeMessage: (message) => {
    const eventSequence = message.eventSequence;
    if (typeof eventSequence !== "number" || !Number.isInteger(eventSequence)) return "ignore";
    const state = get();
    const action = message.snapshot && state.mode === "reconnecting" ? "apply" : realtimeSequenceAction(state.lastEventSequence, eventSequence);
    if (action === "ignore") return action;
    if (action === "resync") {
      set(enterRealtimeStale());
      return action;
    }

    set((current) => {
      let patch: Partial<SiegeStore> = { lastEventSequence: eventSequence };
      if (message.snapshot && (message.type === undefined || ["snapshot", "turn_claimed", "attack_resolved", "reign_started", "world_bootstrapped", "identity_disabled", "turn_cancelled"].includes(message.type))) {
        patch = { lastEventSequence: eventSequence, ...applyAuthoritySnapshot(current, message.snapshot, "realtime", eventSequence) };
      } else if (message.delta && message.type === "defense_placed" && current.snapshot) {
        patch = { lastEventSequence: eventSequence, ...applyAuthoritySnapshot(current, applyWorldDelta(current.snapshot, message.delta), "realtime", eventSequence) };
      }
      const impact = message.impact;
      const showRemoteImpact = message.type === "attack_resolved" && impact && (current.mode === "spectator" || current.mode === "empty") && !current.projectile;
      return showRemoteImpact
        ? { ...patch, impactEffect: { key: `remote-${eventSequence}`, targetId: impact.targetId, damage: impact.damage, projectileType: message.projectileType ?? "STANDARD", impactPoint: impact.point ?? null } }
        : patch;
    });
    return action;
  },
    setMode: (mode) => set(mode === "reconnecting" ? enterRealtimeStale() : { mode }),
  openSheet: (activeSheet) => set({ activeSheet }),
  closeSheet: () => set({ activeSheet: null }),
  beginAttack: () => {
    set({ mode: "attack-aim", activeSheet: null, lastResult: null, attackError: null, attackAim: initialAim });
    void fetch(authorityApiUrl("/session"), { method: "POST", credentials: "include" });
    void get().refreshEntitlements();
  },
  beginDefense: (type, slotId) => set({ mode: "defense-placement", activeSheet: null, defensePlacement: { type, slotId }, attackError: null }),
  cancelDefense: () => set({ mode: "spectator", defensePlacement: null, attackError: null }),
  submitDefensePlacement: async () => {
    const { snapshot, defensePlacement, mode } = get();
    if (mode === "reconnecting") {
      set({ attackError: "Reconnecting to the live world — placement is paused until authority confirms the next version." });
      return;
    }
    if (!snapshot || !defensePlacement) return;
    if (snapshot.phase !== "ACTIVE") {
      set({ mode: "empty", defensePlacement: null, attackError: "The reign has ended before that defense could be placed." });
      return;
    }
    try {
      const response = await fetch(authorityApiUrl("/defense/place"), { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ commandId: crypto.randomUUID(), reignId: snapshot.currentReignId, expectedWorldVersion: snapshot.worldVersion, ...defensePlacement }) });
      const payload = await response.json() as { snapshot?: PublicWorldSnapshot; error?: string };
      if (!response.ok || !payload.snapshot) throw new Error(payload.error ?? "Defense placement was rejected");
      set((state) => ({ ...applyAuthoritySnapshot(state, payload.snapshot!, "http"), mode: "spectator", defensePlacement: null, attackError: null, lastResult: `${defensePlacement.type} anchored` }));
    } catch (error) {
      set({ attackError: error instanceof Error ? error.message : "Defense placement was rejected" });
    }
  },
  claimTurn: async () => {
    const { snapshot, mode } = get();
    if (!snapshot) return;
    if (mode === "reconnecting") {
      set({ attackError: "Reconnecting to the live world — the turn is paused until authority confirms the next version." });
      return;
    }
    set({ turnStatus: "claiming", queuePosition: null, attackError: null });
    try {
      const response = await fetch(authorityApiUrl("/turn/claim"), { method: "POST", credentials: "include" });
      const payload = await response.json() as { status?: "ACTIVE" | "QUEUED"; turn?: ActiveTurn; position?: number; snapshot?: PublicWorldSnapshot; error?: string };
      if (!response.ok) throw new Error(payload.error ?? "The live turn could not be claimed");
      if (payload.status === "ACTIVE" && payload.turn) {
        set((state) => ({ ...(payload.snapshot ? applyAuthoritySnapshot(state, payload.snapshot, "http") : {}), turn: payload.turn, turnStatus: "active", queuePosition: null, mode: "attack-aim", activeSheet: null, lastResult: null, attackError: null, attackAim: initialAim }));
      } else {
        set({ mode: "spectator", turn: null, turnStatus: "queued", queuePosition: payload.position ?? null, attackError: null });
        if (typeof window !== "undefined") window.setTimeout(() => {
          if (get().turnStatus === "queued") void get().claimTurn();
        }, 2000);
      }
    } catch (error) {
      set({ turnStatus: "idle", queuePosition: null, attackError: error instanceof Error ? error.message : "The live turn could not be claimed" });
    }
  },
  cancelTurn: async () => {
    const { turnStatus } = get();
    if (turnStatus !== "active" && turnStatus !== "queued") return;
    try {
      const response = await fetch(authorityApiUrl("/turn/cancel"), { method: "POST", credentials: "include" });
      const payload = await response.json() as { snapshot?: PublicWorldSnapshot; error?: string };
      if (!response.ok || !payload.snapshot) throw new Error(payload.error ?? "The live turn could not be released");
      set((state) => ({ ...(payload.snapshot ? applyAuthoritySnapshot(state, payload.snapshot, "http") : {}), mode: "spectator", turn: null, turnStatus: "idle", queuePosition: null, attackError: null }));
    } catch (error) {
      set({ attackError: error instanceof Error ? error.message : "The live turn could not be released" });
    }
  },
  setAim: (aim) => set((state) => ({ attackAim: { ...state.attackAim, ...aim } })),
  fireAttack: async () => {
    const { snapshot, mode, turn, turnStatus, attackAim, remainingShots, breakerShotsRemaining } = get();
    if (!snapshot || mode !== "attack-aim" || turnStatus !== "active" || !turn) return;
    set({ mode: "attack-requesting", lastResult: null, attackError: null });
    try {
      const response = await fetch(authorityApiUrl("/attack"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ commandId: crypto.randomUUID(), reignId: snapshot.currentReignId, turnId: turn.id, expectedWorldVersion: snapshot.worldVersion, simulationVersion: "ballistic-v1", ...(remainingShots === 0 && breakerShotsRemaining > 0 ? { projectile: "BREAKER" } : {}), ...attackAim }),
      });
      const payload = await response.json() as { error?: string; projectile?: "STANDARD" | "BREAKER"; impact?: AttackIntent; snapshot?: PublicWorldSnapshot };
      if (!response.ok || !payload.impact || !payload.snapshot) {
        set({ mode: "spectator", turn: null, turnStatus: "idle", queuePosition: null, attackError: payload.error ?? "The live siege rejected this attack." });
        return;
      }
      const projectileType = payload.projectile ?? "STANDARD";
      set((state) => ({ ...applyAuthoritySnapshot(state, payload.snapshot!, "http"), mode: "attack-flight", projectile: { progress: 0, targetId: payload.impact!.targetId, damage: payload.impact!.damage, commandKey: crypto.randomUUID(), projectileType, aim: { yaw: attackAim.yaw, elevation: attackAim.elevation, power: attackAim.power }, impactPoint: payload.impact!.point ?? null, flightSeconds: presentationFlightSeconds(payload.impact!.timeSeconds) } }));
    } catch {
      set({ mode: "spectator", turn: null, turnStatus: "idle", queuePosition: null, attackError: "The live siege could not be reached. Try again." });
    }
  },
  refreshEntitlements: async () => {
    try {
      const response = await fetch(authorityApiUrl("/entitlements"), { credentials: "include", cache: "no-store" });
      if (!response.ok) return;
      const payload = await response.json() as { entitlements?: Array<{ kind: string; quantityRemaining: number }> };
      const attack = payload.entitlements?.find((item) => item.kind === "ATTACK_PACK")?.quantityRemaining ?? 0;
      const breaker = payload.entitlements?.find((item) => item.kind === "BREAKER_SHOT")?.quantityRemaining ?? 0;
      set({ remainingShots: attack, breakerShotsRemaining: breaker });
      if (attack === 0 && get().shotLog.length > 0 && !get().activeSheet) set({ activeSheet: "summary" });
    } catch {}
  },
  advanceTime: (ms) => {
    const { mode, projectile } = get();
    if (mode !== "attack-flight" || !projectile) return;
    const progress = projectile.progress + ms / (projectile.flightSeconds * 1000);
    if (progress >= 1) {
      get().completeProjectile();
      return;
    }
    set({ projectile: { ...projectile, progress } });
  },
  completeProjectile: () => {
    const state = get();
    if (state.mode !== "attack-flight" || !state.projectile || !state.snapshot) return;
    const projectile = state.projectile;
    set({
      ...applyAuthoritySnapshot(state, state.snapshot, "completion"),
      projectile: null,
      turn: null,
      turnStatus: "idle",
      queuePosition: null,
      lastResult: impactLabel(projectile.targetId, projectile.damage, projectile.projectileType, state.snapshot),
      impactEffect: { key: projectile.commandKey, targetId: projectile.targetId, damage: projectile.damage, projectileType: projectile.projectileType, impactPoint: projectile.impactPoint },
      shotLog: [...state.shotLog, { targetId: projectile.targetId, damage: projectile.damage }],
    });
    void get().refreshEntitlements();
  },
  clearImpactEffect: (key) => set((state) => state.impactEffect?.key === key ? { impactEffect: null } : state),
  showImpact: (effect) => set({ impactEffect: effect }),
  resetAttack: () => set({ mode: "spectator", projectile: null, turn: null, turnStatus: "idle", queuePosition: null, defensePlacement: null, attackAim: initialAim, lastResult: null, attackError: null, impactEffect: null, shotLog: [], remainingShots: null, breakerShotsRemaining: 0 }),
}));
