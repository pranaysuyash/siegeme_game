import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSiegeStore } from "@/game/client/store";
import { createInitialWorldSnapshot } from "@/game/world/initial-snapshot";

const snapshot = createInitialWorldSnapshot();

describe("client attack safety during reconnect", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    useSiegeStore.setState({
      mode: "attack-aim",
      snapshot,
      turn: { id: "turn-resync", playerId: "player-1", reignId: snapshot.currentReignId ?? "reign:001", startedAt: 1, expiresAt: Date.now() + 10_000, shotNumber: 1 },
      turnStatus: "active",
      lastEventSequence: 0,
      attackError: null,
    });
  });

  afterEach(() => {
    useSiegeStore.setState({ attackError: null, mode: "spectator", turn: null });
  });

  it("moves the whole client into reconnecting mode when a sequence gap is detected", () => {
    useSiegeStore.setState({ lastEventSequence: 4 });
    expect(useSiegeStore.getState().receiveRealtimeMessage({ type: "defense_placed", eventSequence: 6 })).toBe("resync");
    expect(useSiegeStore.getState()).toMatchObject({ mode: "reconnecting", turn: null, turnStatus: "idle" });
  });

  it("blocks firing while reconnecting and never calls the authority", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    useSiegeStore.setState({ mode: "reconnecting", turn: null, turnStatus: "idle" });
    await useSiegeStore.getState().fireAttack();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(useSiegeStore.getState().mode).toBe("reconnecting");
    vi.unstubAllGlobals();
  });

  it("seeds the sequence marker and exits reconnecting only after a fresh snapshot", () => {
    useSiegeStore.setState({ mode: "reconnecting", lastEventSequence: 4 });
    useSiegeStore.getState().setRealtimeSnapshot({ ...snapshot, serverNow: Date.now() + 500 }, 9);
    expect(useSiegeStore.getState().mode).toBe("spectator");
    expect(useSiegeStore.getState().lastEventSequence).toBe(9);
    expect(useSiegeStore.getState().serverClockSkewMs).toBeGreaterThan(0);
  });

  it("accepts a recovery snapshot even when a new socket starts its sequence lower", () => {
    useSiegeStore.setState({ mode: "reconnecting", lastEventSequence: 42 });
    expect(useSiegeStore.getState().receiveRealtimeMessage({ type: "snapshot", eventSequence: 2, snapshot })).toBe("apply");
    expect(useSiegeStore.getState()).toMatchObject({ mode: "spectator", lastEventSequence: 2 });
  });

  it("lets the realtime receiver surface a remote impact without a second message path", () => {
    useSiegeStore.setState({ mode: "spectator", turn: null, turnStatus: "idle" });
    const result = useSiegeStore.getState().receiveRealtimeMessage({ type: "attack_resolved", eventSequence: 3, snapshot: { ...snapshot, worldVersion: snapshot.worldVersion + 1 }, impact: { targetId: "gate:main", damage: 7, point: [1, 2, 3] } });
    expect(result).toBe("apply");
    expect(useSiegeStore.getState().impactEffect).toMatchObject({ key: "remote-3", targetId: "gate:main", damage: 7, impactPoint: [1, 2, 3] });
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

  it("clears a local turn lease after the authority rejects an attack", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: "No active attack turn belongs to this player" }), { status: 409, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchSpy);
    useSiegeStore.setState({ queuePosition: null });

    await useSiegeStore.getState().fireAttack();

    expect(useSiegeStore.getState()).toMatchObject({ mode: "spectator", turn: null, turnStatus: "idle", queuePosition: null, attackError: "No active attack turn belongs to this player" });
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
    expect(useSiegeStore.getState().snapshot?.worldVersion).toBe(resolvedSnapshot.worldVersion);

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

  it("keeps a newer realtime world when a delayed projectile completes", async () => {
    const attackSnapshot = { ...snapshot, worldVersion: snapshot.worldVersion + 1, serverNow: Date.now() + 300 };
    const newerRealtimeSnapshot = { ...snapshot, worldVersion: snapshot.worldVersion + 2, serverNow: Date.now() + 400 };
    useSiegeStore.setState({
      mode: "attack-aim",
      snapshot,
      turn: { id: "turn-race", playerId: "player-1", reignId: snapshot.currentReignId ?? "reign:001", startedAt: Date.now(), expiresAt: Date.now() + 20_000, shotNumber: 1 },
      turnStatus: "active",
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ impact: { targetId: "gate:main", damage: 12, coreDamage: 0, point: [0, 1, 1], timeSeconds: 0.4 }, snapshot: attackSnapshot }), { status: 200, headers: { "Content-Type": "application/json" } })));

    await useSiegeStore.getState().fireAttack();
    useSiegeStore.getState().setRealtimeSnapshot(newerRealtimeSnapshot);
    useSiegeStore.getState().completeProjectile();

    expect(useSiegeStore.getState().snapshot?.worldVersion).toBe(newerRealtimeSnapshot.worldVersion);
    expect(useSiegeStore.getState().impactEffect?.targetId).toBe("gate:main");
    vi.unstubAllGlobals();
  });
});
