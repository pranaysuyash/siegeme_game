import { create } from "zustand";
import type { ActiveTurn, PublicWorldDelta, PublicWorldSnapshot } from "@/game/domain/types";
import type { AttackIntent } from "@/game/simulation/attack";
import { authorityApiUrl } from "@/game/client/api";
import { applyWorldDelta } from "@/game/client/realtime";

export type AppMode = "loading" | "spectator" | "empty" | "reconnecting" | "unavailable" | "attack-aim" | "attack-flight" | "attack-requesting";
export type LoadingStep = "Connecting" | "Loading world" | "World ready";

type AimState = { yaw: number; elevation: number; power: number; isDragging: boolean };
type ProjectileState = { progress: number; targetId: string; damage: number; commandKey: string } | null;
export type ImpactEffect = { key: string; targetId: string; damage: number };

type SiegeStore = {
  mode: AppMode;
  loadingStep: LoadingStep;
  snapshot: PublicWorldSnapshot | null;
  attackAim: AimState;
  turn: ActiveTurn | null;
  turnStatus: "idle" | "claiming" | "active" | "queued";
  projectile: ProjectileState;
  pendingSnapshot: PublicWorldSnapshot | null;
  impactEffect: ImpactEffect | null;
  lastResult: string | null;
  attackError: string | null;
  activeSheet: "identity" | "attack" | "defend" | "details" | "coronation" | "recovery" | null;
  setLoadingStep: (step: LoadingStep) => void;
  setSnapshot: (snapshot: PublicWorldSnapshot) => void;
  setRealtimeSnapshot: (snapshot: PublicWorldSnapshot) => void;
  setRealtimeDelta: (delta: PublicWorldDelta) => void;
  setMode: (mode: AppMode) => void;
  openSheet: (sheet: NonNullable<SiegeStore["activeSheet"]>) => void;
  closeSheet: () => void;
  beginAttack: () => void;
  claimTurn: () => Promise<void>;
  setAim: (aim: Partial<AimState>) => void;
  fireAttack: () => Promise<void>;
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
  projectile: null,
  pendingSnapshot: null,
  impactEffect: null,
  lastResult: null,
  attackError: null,
  activeSheet: null,
  setLoadingStep: (loadingStep) => set({ loadingStep }),
  setSnapshot: (snapshot) => set({ snapshot, mode: snapshot.phase === "ACTIVE" ? "spectator" : "empty" }),
  setRealtimeSnapshot: (snapshot) => set((state) => {
    if (state.snapshot && snapshot.worldVersion < state.snapshot.worldVersion) return state;
    return { snapshot, mode: state.mode === "reconnecting" ? snapshot.phase === "ACTIVE" ? "spectator" : "empty" : state.mode };
  }),
  setRealtimeDelta: (delta) => set((state) => state.snapshot ? { snapshot: applyWorldDelta(state.snapshot, delta), mode: state.mode === "reconnecting" ? delta.phase === "ACTIVE" ? "spectator" : "empty" : state.mode } : state),
  setMode: (mode) => set({ mode }),
  openSheet: (activeSheet) => set({ activeSheet }),
  closeSheet: () => set({ activeSheet: null }),
  beginAttack: () => {
    set({ mode: "attack-aim", activeSheet: null, lastResult: null, attackError: null, attackAim: initialAim });
    void fetch(authorityApiUrl("/session"), { method: "POST", credentials: "include" });
  },
  claimTurn: async () => {
    const { snapshot } = get();
    if (!snapshot) return;
    set({ turnStatus: "claiming", attackError: null });
    try {
      const response = await fetch(authorityApiUrl("/turn/claim"), { method: "POST", credentials: "include" });
      const payload = await response.json() as { status?: "ACTIVE" | "QUEUED"; turn?: ActiveTurn; position?: number; error?: string };
      if (!response.ok) throw new Error(payload.error ?? "The live turn could not be claimed");
      if (payload.status === "ACTIVE" && payload.turn) {
        set({ turn: payload.turn, turnStatus: "active", mode: "attack-aim", activeSheet: null, lastResult: null, attackError: null, attackAim: initialAim });
      } else {
        set({ turnStatus: "queued", attackError: `You are queued for the next shot${payload.position ? ` · position ${payload.position}` : ""}.` });
      }
    } catch (error) {
      set({ turnStatus: "idle", attackError: error instanceof Error ? error.message : "The live turn could not be claimed" });
    }
  },
  setAim: (aim) => set((state) => ({ attackAim: { ...state.attackAim, ...aim } })),
  fireAttack: async () => {
    const { snapshot, mode, attackAim } = get();
    if (!snapshot || mode !== "attack-aim") return;
    set({ mode: "attack-requesting", lastResult: null, attackError: null });
    try {
      const response = await fetch(authorityApiUrl("/attack"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ commandId: crypto.randomUUID(), reignId: snapshot.currentReignId, turnId: get().turn?.id ?? "turn:none", expectedWorldVersion: snapshot.worldVersion, simulationVersion: "ballistic-v1", ...attackAim }),
      });
      const payload = await response.json() as { error?: string; impact?: AttackIntent; snapshot?: PublicWorldSnapshot };
      if (!response.ok || !payload.impact || !payload.snapshot) {
        set({ mode: "spectator", attackError: payload.error ?? "The live siege rejected this attack." });
        return;
      }
      set({ mode: "attack-flight", projectile: { progress: 0, targetId: payload.impact.targetId, damage: payload.impact.damage, commandKey: crypto.randomUUID() }, pendingSnapshot: payload.snapshot.worldVersion >= snapshot.worldVersion ? payload.snapshot : null });
    } catch {
      set({ mode: "spectator", attackError: "The live siege could not be reached. Try again." });
    }
  },
  advanceTime: (ms) => {
    const { mode, projectile, snapshot, pendingSnapshot } = get();
    if (mode !== "attack-flight" || !projectile || !snapshot) return;
    const progress = projectile.progress + ms / 850;
    if (progress < 1) {
      set({ projectile: { ...projectile, progress } });
      return;
    }
    const resultLabel = `${projectile.targetId.replace(":", " ")} −${projectile.damage}`;
    const nextSnapshot = pendingSnapshot && pendingSnapshot.worldVersion >= snapshot.worldVersion ? pendingSnapshot : snapshot;
    set({ snapshot: nextSnapshot, pendingSnapshot: null, projectile: null, turn: null, turnStatus: "idle", mode: "spectator", lastResult: resultLabel, impactEffect: { key: projectile.commandKey, targetId: projectile.targetId, damage: projectile.damage } });
  },
  completeProjectile: () => {
    const state = get();
    if (state.mode !== "attack-flight" || !state.projectile || !state.snapshot) return;
    const projectile = state.projectile;
    const nextSnapshot = state.pendingSnapshot && state.pendingSnapshot.worldVersion >= state.snapshot.worldVersion ? state.pendingSnapshot : state.snapshot;
    set({ snapshot: nextSnapshot, pendingSnapshot: null, projectile: null, turn: null, turnStatus: "idle", mode: "spectator", lastResult: `${projectile.targetId.replace(":", " ")} −${projectile.damage}`, impactEffect: { key: projectile.commandKey, targetId: projectile.targetId, damage: projectile.damage } });
  },
  clearImpactEffect: (key) => set((state) => state.impactEffect?.key === key ? { impactEffect: null } : state),
  resetAttack: () => set({ mode: "spectator", projectile: null, pendingSnapshot: null, turn: null, turnStatus: "idle", attackAim: initialAim, lastResult: null, attackError: null, impactEffect: null }),
}));
