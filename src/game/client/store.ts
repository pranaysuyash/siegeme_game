import { create } from "zustand";
import type { PublicWorldSnapshot } from "@/game/domain/types";
import type { AttackIntent } from "@/game/simulation/attack";
import { authorityApiUrl } from "@/game/client/api";

export type AppMode = "loading" | "spectator" | "empty" | "reconnecting" | "unavailable" | "attack-aim" | "attack-flight" | "attack-requesting";
export type LoadingStep = "Connecting" | "Loading world" | "World ready";

type AimState = { yaw: number; elevation: number; power: number; isDragging: boolean };
type ProjectileState = { progress: number; targetId: string; damage: number } | null;

type SiegeStore = {
  mode: AppMode;
  loadingStep: LoadingStep;
  snapshot: PublicWorldSnapshot | null;
  attackAim: AimState;
  projectile: ProjectileState;
  pendingSnapshot: PublicWorldSnapshot | null;
  lastResult: string | null;
  attackError: string | null;
  activeSheet: "identity" | "attack" | "defend" | "details" | null;
  setLoadingStep: (step: LoadingStep) => void;
  setSnapshot: (snapshot: PublicWorldSnapshot) => void;
  setRealtimeSnapshot: (snapshot: PublicWorldSnapshot) => void;
  setMode: (mode: AppMode) => void;
  openSheet: (sheet: NonNullable<SiegeStore["activeSheet"]>) => void;
  closeSheet: () => void;
  beginAttack: () => void;
  setAim: (aim: Partial<AimState>) => void;
  fireAttack: () => Promise<void>;
  advanceTime: (ms: number) => void;
  resetAttack: () => void;
};

const initialAim: AimState = { yaw: 0, elevation: 0.64, power: 0.5, isDragging: false };

export const useSiegeStore = create<SiegeStore>((set, get) => ({
  mode: "loading",
  loadingStep: "Connecting",
  snapshot: null,
  attackAim: initialAim,
  projectile: null,
  pendingSnapshot: null,
  lastResult: null,
  attackError: null,
  activeSheet: null,
  setLoadingStep: (loadingStep) => set({ loadingStep }),
  setSnapshot: (snapshot) => set({ snapshot, mode: snapshot.phase === "ACTIVE" ? "spectator" : "empty" }),
  setRealtimeSnapshot: (snapshot) => set((state) => {
    if (state.snapshot && snapshot.worldVersion < state.snapshot.worldVersion) return state;
    return { snapshot, mode: state.mode === "reconnecting" ? snapshot.phase === "ACTIVE" ? "spectator" : "empty" : state.mode };
  }),
  setMode: (mode) => set({ mode }),
  openSheet: (activeSheet) => set({ activeSheet }),
  closeSheet: () => set({ activeSheet: null }),
  beginAttack: () => {
    set({ mode: "attack-aim", activeSheet: null, lastResult: null, attackError: null, attackAim: initialAim });
    void fetch(authorityApiUrl("/session"), { method: "POST", credentials: "include" });
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
        body: JSON.stringify({ commandId: crypto.randomUUID(), reignId: snapshot.currentReignId, turnId: "turn:none", expectedWorldVersion: snapshot.worldVersion, simulationVersion: "ballistic-v1", ...attackAim }),
      });
      const payload = await response.json() as { error?: string; impact?: AttackIntent; snapshot?: PublicWorldSnapshot };
      if (!response.ok || !payload.impact || !payload.snapshot) {
        set({ mode: "spectator", attackError: payload.error ?? "The live siege rejected this attack." });
        return;
      }
      set({ mode: "attack-flight", projectile: { progress: 0, targetId: payload.impact.targetId, damage: payload.impact.damage }, pendingSnapshot: payload.snapshot.worldVersion >= snapshot.worldVersion ? payload.snapshot : null });
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
    set({ snapshot: nextSnapshot, pendingSnapshot: null, projectile: null, mode: "spectator", lastResult: resultLabel });
  },
  resetAttack: () => set({ mode: "spectator", projectile: null, pendingSnapshot: null, attackAim: initialAim, lastResult: null, attackError: null }),
}));
