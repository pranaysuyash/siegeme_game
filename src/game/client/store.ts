import { create } from "zustand";
import type { ActiveTurn, PublicWorldDelta, PublicWorldSnapshot } from "@/game/domain/types";
import type { AttackIntent } from "@/game/simulation/attack";
import { authorityApiUrl } from "@/game/client/api";
import { applyWorldDelta } from "@/game/client/realtime";
import { impactLabel } from "@/game/presentation/labels";
import { presentationFlightSeconds } from "@/game/presentation/timing";

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
  pendingSnapshot: PublicWorldSnapshot | null;
  impactEffect: ImpactEffect | null;
  lastResult: string | null;
  attackError: string | null;
  shotLog: ShotRecord[];
  remainingShots: number | null;
  breakerShotsRemaining: number;
  resyncing: boolean;
  serverClockSkewMs: number;
  activeSheet: "identity" | "attack" | "defend" | "details" | "coronation" | "recovery" | "how" | "summary" | "share" | null;
  defensePlacement: DefensePlacement | null;
  setLoadingStep: (step: LoadingStep) => void;
  setSnapshot: (snapshot: PublicWorldSnapshot) => void;
  setRealtimeSnapshot: (snapshot: PublicWorldSnapshot) => void;
  setRealtimeDelta: (delta: PublicWorldDelta) => void;
  setMode: (mode: AppMode) => void;
  openSheet: (sheet: NonNullable<SiegeStore["activeSheet"]>) => void;
  closeSheet: () => void;
  beginAttack: () => void;
  beginDefense: (type: DefensePlacement["type"], slotId: string) => void;
  cancelDefense: () => void;
  submitDefensePlacement: () => Promise<void>;
  claimTurn: () => Promise<void>;
  setAim: (aim: Partial<AimState>) => void;
  fireAttack: () => Promise<void>;
  refreshEntitlements: () => Promise<void>;
  showImpact: (effect: ImpactEffect) => void;
  setResyncing: (resyncing: boolean) => void;
  advanceTime: (ms: number) => void;
  completeProjectile: () => void;
  clearImpactEffect: (key: string) => void;
  resetAttack: () => void;
};

const initialAim: AimState = { yaw: 0, elevation: 0.64, power: 0.5, isDragging: false };

export const useSiegeStore = create<SiegeStore>((set, get) => ({
  mode: "loading",
  loadingStep: "Connecting",
  snapshot: null,
  attackAim: initialAim,
  turn: null,
  turnStatus: "idle",
  queuePosition: null,
  projectile: null,
  pendingSnapshot: null,
  impactEffect: null,
  lastResult: null,
  attackError: null,
  shotLog: [],
  remainingShots: null,
  breakerShotsRemaining: 0,
  resyncing: false,
  serverClockSkewMs: 0,
  activeSheet: null,
  defensePlacement: null,
  setLoadingStep: (loadingStep) => set({ loadingStep }),
  setSnapshot: (snapshot) => set((state) => {
    if (state.snapshot && snapshot.worldVersion < state.snapshot.worldVersion) return state;
    return { snapshot, mode: snapshot.phase === "ACTIVE" ? "spectator" : "empty", resyncing: false, serverClockSkewMs: typeof snapshot.serverNow === "number" ? snapshot.serverNow - Date.now() : state.serverClockSkewMs };
  }),
  setRealtimeSnapshot: (snapshot) => set((state) => {
    if (state.snapshot && snapshot.worldVersion < state.snapshot.worldVersion) return state;
    return { snapshot, resyncing: false, serverClockSkewMs: typeof snapshot.serverNow === "number" ? snapshot.serverNow - Date.now() : state.serverClockSkewMs, mode: state.mode === "reconnecting" ? snapshot.phase === "ACTIVE" ? "spectator" : "empty" : state.mode };
  }),
  setRealtimeDelta: (delta) => set((state) => state.snapshot ? { snapshot: applyWorldDelta(state.snapshot, delta), mode: state.mode === "reconnecting" ? delta.phase === "ACTIVE" ? "spectator" : "empty" : state.mode } : state),
  setMode: (mode) => set({ mode }),
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
    const { snapshot, defensePlacement } = get();
    if (!snapshot || !defensePlacement || snapshot.phase !== "ACTIVE") return;
    try {
      const response = await fetch(authorityApiUrl("/defense/place"), { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ commandId: crypto.randomUUID(), reignId: snapshot.currentReignId, expectedWorldVersion: snapshot.worldVersion, ...defensePlacement }) });
      const payload = await response.json() as { snapshot?: PublicWorldSnapshot; error?: string };
      if (!response.ok || !payload.snapshot) throw new Error(payload.error ?? "Defense placement was rejected");
      set({ snapshot: payload.snapshot, mode: "spectator", defensePlacement: null, attackError: null, lastResult: `${defensePlacement.type} anchored` });
    } catch (error) {
      set({ attackError: error instanceof Error ? error.message : "Defense placement was rejected" });
    }
  },
  claimTurn: async () => {
    const { snapshot } = get();
    if (!snapshot) return;
    set({ turnStatus: "claiming", queuePosition: null, attackError: null });
    try {
      const response = await fetch(authorityApiUrl("/turn/claim"), { method: "POST", credentials: "include" });
      const payload = await response.json() as { status?: "ACTIVE" | "QUEUED"; turn?: ActiveTurn; position?: number; error?: string };
      if (!response.ok) throw new Error(payload.error ?? "The live turn could not be claimed");
      if (payload.status === "ACTIVE" && payload.turn) {
        set({ turn: payload.turn, turnStatus: "active", queuePosition: null, mode: "attack-aim", activeSheet: null, lastResult: null, attackError: null, attackAim: initialAim });
      } else {
        set({ turnStatus: "queued", queuePosition: payload.position ?? null, attackError: null });
        if (typeof window !== "undefined") window.setTimeout(() => {
          if (get().turnStatus === "queued") void get().claimTurn();
        }, 2000);
      }
    } catch (error) {
      set({ turnStatus: "idle", queuePosition: null, attackError: error instanceof Error ? error.message : "The live turn could not be claimed" });
    }
  },
  setAim: (aim) => set((state) => ({ attackAim: { ...state.attackAim, ...aim } })),
  fireAttack: async () => {
    const { snapshot, mode, attackAim, remainingShots, breakerShotsRemaining } = get();
    if (!snapshot || mode !== "attack-aim") return;
    if (get().resyncing) {
      set({ attackError: "Reconnecting to the live world — try again in a moment." });
      return;
    }
    set({ mode: "attack-requesting", lastResult: null, attackError: null });
    try {
      const response = await fetch(authorityApiUrl("/attack"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ commandId: crypto.randomUUID(), reignId: snapshot.currentReignId, turnId: get().turn?.id ?? "turn:none", expectedWorldVersion: snapshot.worldVersion, simulationVersion: "ballistic-v1", ...(remainingShots === 0 && breakerShotsRemaining > 0 ? { projectile: "BREAKER" } : {}), ...attackAim }),
      });
      const payload = await response.json() as { error?: string; projectile?: "STANDARD" | "BREAKER"; impact?: AttackIntent; snapshot?: PublicWorldSnapshot };
      if (!response.ok || !payload.impact || !payload.snapshot) {
        set({ mode: "spectator", attackError: payload.error ?? "The live siege rejected this attack." });
        return;
      }
      const projectileType = payload.projectile ?? "STANDARD";
      set({ mode: "attack-flight", projectile: { progress: 0, targetId: payload.impact.targetId, damage: payload.impact.damage, commandKey: crypto.randomUUID(), projectileType, aim: { yaw: attackAim.yaw, elevation: attackAim.elevation, power: attackAim.power }, impactPoint: payload.impact.point ?? null, flightSeconds: presentationFlightSeconds(payload.impact.timeSeconds) }, pendingSnapshot: payload.snapshot.worldVersion >= snapshot.worldVersion ? payload.snapshot : null });
    } catch {
      set({ mode: "spectator", attackError: "The live siege could not be reached. Try again." });
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
    const { mode, projectile, snapshot, pendingSnapshot } = get();
    if (mode !== "attack-flight" || !projectile || !snapshot) return;
    const progress = projectile.progress + ms / (projectile.flightSeconds * 1000);
    if (progress < 1) {
      set({ projectile: { ...projectile, progress } });
      return;
    }
    const nextSnapshot = pendingSnapshot && pendingSnapshot.worldVersion >= snapshot.worldVersion ? pendingSnapshot : snapshot;
    set({ snapshot: nextSnapshot, pendingSnapshot: null, projectile: null, turn: null, turnStatus: "idle", queuePosition: null, mode: nextSnapshot.phase === "CORONATION" ? "defeat-cinematic" : "spectator", activeSheet: nextSnapshot.phase === "CORONATION" ? null : get().activeSheet, lastResult: impactLabel(projectile.targetId, projectile.damage, projectile.projectileType, nextSnapshot), impactEffect: { key: projectile.commandKey, targetId: projectile.targetId, damage: projectile.damage, projectileType: projectile.projectileType, impactPoint: projectile.impactPoint }, shotLog: [...get().shotLog, { targetId: projectile.targetId, damage: projectile.damage }] });
    void get().refreshEntitlements();
  },
  completeProjectile: () => {
    const state = get();
    if (state.mode !== "attack-flight" || !state.projectile || !state.snapshot) return;
    const projectile = state.projectile;
    const nextSnapshot = state.pendingSnapshot && state.pendingSnapshot.worldVersion >= state.snapshot.worldVersion ? state.pendingSnapshot : state.snapshot;
    set({ snapshot: nextSnapshot, pendingSnapshot: null, projectile: null, turn: null, turnStatus: "idle", queuePosition: null, mode: nextSnapshot.phase === "CORONATION" ? "defeat-cinematic" : "spectator", activeSheet: nextSnapshot.phase === "CORONATION" ? null : state.activeSheet, lastResult: impactLabel(projectile.targetId, projectile.damage, projectile.projectileType, nextSnapshot), impactEffect: { key: projectile.commandKey, targetId: projectile.targetId, damage: projectile.damage, projectileType: projectile.projectileType, impactPoint: projectile.impactPoint }, shotLog: [...state.shotLog, { targetId: projectile.targetId, damage: projectile.damage }] });
    void get().refreshEntitlements();
  },
  clearImpactEffect: (key) => set((state) => state.impactEffect?.key === key ? { impactEffect: null } : state),
  showImpact: (effect) => set({ impactEffect: effect }),
  setResyncing: (resyncing) => set({ resyncing }),
  resetAttack: () => set({ mode: "spectator", projectile: null, pendingSnapshot: null, turn: null, turnStatus: "idle", queuePosition: null, defensePlacement: null, attackAim: initialAim, lastResult: null, attackError: null, impactEffect: null, shotLog: [], remainingShots: null, breakerShotsRemaining: 0 }),
}));
