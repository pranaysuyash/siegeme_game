import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSiegeStore } from "@/game/client/store";
import { createInitialWorldSnapshot } from "@/game/world/initial-snapshot";

const snapshot = createInitialWorldSnapshot();

describe("client attack safety during resync", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    useSiegeStore.setState({
      mode: "attack-aim",
      snapshot,
      turn: { id: "turn-resync", playerId: "player-1", reignId: snapshot.currentReignId ?? "reign:001", startedAt: 1, expiresAt: Date.now() + 10_000, shotNumber: 1 },
      resyncing: true,
      attackError: null,
    });
  });

  afterEach(() => {
    useSiegeStore.setState({ resyncing: false, attackError: null, mode: "spectator", turn: null });
  });

  it("blocks firing while a sequence-gap resync is in flight and never calls the authority", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    await useSiegeStore.getState().fireAttack();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(useSiegeStore.getState().mode).toBe("attack-aim");
    expect(useSiegeStore.getState().attackError).toContain("Reconnecting");
    vi.unstubAllGlobals();
  });

  it("clears the resync guard when the authority sends a fresh snapshot", () => {
    useSiegeStore.getState().setRealtimeSnapshot({ ...snapshot, serverNow: Date.now() + 500 });
    expect(useSiegeStore.getState().resyncing).toBe(false);
    expect(useSiegeStore.getState().serverClockSkewMs).toBeGreaterThan(0);
  });

  it("refreshes the authority clock from a newer realtime delta", () => {
    useSiegeStore.getState().setRealtimeDelta({
      worldVersion: snapshot.worldVersion + 1,
      eventSequence: 1,
      phase: snapshot.phase,
      currentReignId: snapshot.currentReignId,
      reign: snapshot.reign,
      ruler: snapshot.ruler,
      coronation: null,
      activeDefenses: snapshot.activeDefenses,
      activeAttack: snapshot.activeAttack,
      serverNow: Date.now() + 750,
      changes: [],
    });
    expect(useSiegeStore.getState().serverClockSkewMs).toBeGreaterThan(0);
  });
});
