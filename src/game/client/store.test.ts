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
      turnStatus: "active",
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

  it("commits the claim snapshot before a fast first shot can use a stale world version", async () => {
    const claimedSnapshot = { ...snapshot, worldVersion: snapshot.worldVersion + 1, serverNow: Date.now() + 250 };
    const turn = { id: "turn-claimed", playerId: "player-1", reignId: snapshot.currentReignId ?? "reign:001", startedAt: Date.now(), expiresAt: Date.now() + 20_000, shotNumber: 1 };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: "ACTIVE", turn, snapshot: claimedSnapshot }), { status: 200, headers: { "Content-Type": "application/json" } })));

    await useSiegeStore.getState().claimTurn();

    expect(useSiegeStore.getState().mode).toBe("attack-aim");
    expect(useSiegeStore.getState().turn).toEqual(turn);
    expect(useSiegeStore.getState().snapshot?.worldVersion).toBe(claimedSnapshot.worldVersion);
    vi.unstubAllGlobals();
  });

  it("does not replace a newer realtime snapshot with an older claim response", async () => {
    const newer = { ...snapshot, worldVersion: snapshot.worldVersion + 2, serverNow: Date.now() + 500 };
    const staleClaim = { ...snapshot, worldVersion: snapshot.worldVersion + 1, serverNow: Date.now() + 250 };
    useSiegeStore.setState({ snapshot: newer, mode: "attack-aim" });
    const turn = { id: "turn-stale-claim", playerId: "player-1", reignId: snapshot.currentReignId ?? "reign:001", startedAt: Date.now(), expiresAt: Date.now() + 20_000, shotNumber: 1 };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: "ACTIVE", turn, snapshot: staleClaim }), { status: 200, headers: { "Content-Type": "application/json" } })));

    await useSiegeStore.getState().claimTurn();

    expect(useSiegeStore.getState().snapshot?.worldVersion).toBe(newer.worldVersion);
    vi.unstubAllGlobals();
  });

  it("fails closed while a claim is queued instead of presenting a fireable turn", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: "QUEUED", position: 2 }), { status: 202, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchSpy);

    await useSiegeStore.getState().claimTurn();
    expect(useSiegeStore.getState()).toMatchObject({ mode: "spectator", turn: null, turnStatus: "queued", queuePosition: 2 });

    await useSiegeStore.getState().fireAttack();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(useSiegeStore.getState().attackError).toBeNull();
    vi.unstubAllGlobals();
  });

  it("carries authoritative projectile metadata through flight, impact copy, and cleanup", async () => {
    const resolvedSnapshot = { ...snapshot, worldVersion: snapshot.worldVersion + 1, serverNow: Date.now() + 300 };
    useSiegeStore.setState({
      mode: "attack-aim",
      snapshot,
      turn: { id: "turn-breaker", playerId: "player-1", reignId: snapshot.currentReignId ?? "reign:001", startedAt: Date.now(), expiresAt: Date.now() + 20_000, shotNumber: 3 },
      turnStatus: "active",
      remainingShots: 0,
      breakerShotsRemaining: 1,
      resyncing: false,
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      projectile: "BREAKER",
      impact: { targetId: "power-orb", damage: 18, coreDamage: 0, point: [2, 3, 4], timeSeconds: 0.2 },
      snapshot: resolvedSnapshot,
    }), { status: 200, headers: { "Content-Type": "application/json" } })));

    await useSiegeStore.getState().fireAttack();

    const inFlight = useSiegeStore.getState().projectile;
    expect(useSiegeStore.getState().mode).toBe("attack-flight");
    expect(inFlight).toMatchObject({ projectileType: "BREAKER", targetId: "power-orb", damage: 18, impactPoint: [2, 3, 4], flightSeconds: 0.85 });
    expect(useSiegeStore.getState().pendingSnapshot?.worldVersion).toBe(resolvedSnapshot.worldVersion);

    useSiegeStore.getState().completeProjectile();

    expect(useSiegeStore.getState().mode).toBe("spectator");
    expect(useSiegeStore.getState().snapshot?.worldVersion).toBe(resolvedSnapshot.worldVersion);
    expect(useSiegeStore.getState().lastResult).toBe("Breaker · Power Orb struck · −18");
    const impact = useSiegeStore.getState().impactEffect;
    expect(impact).toMatchObject({ projectileType: "BREAKER", targetId: "power-orb", impactPoint: [2, 3, 4] });
    useSiegeStore.getState().clearImpactEffect(impact!.key);
    expect(useSiegeStore.getState().impactEffect).toBeNull();
    vi.unstubAllGlobals();
  });
});
