import { describe, expect, it } from "vitest";
import { createInitialAuthoritativeWorldState, createNewReignAuthoritativeWorldState, migrateAuthoritativeWorldState, projectPublicWorldSnapshot } from "@/game/world/initial-snapshot";

describe("authoritative world projection", () => {
  it("derives Core component health from irreversible reign integrity", () => {
    const state = createInitialAuthoritativeWorldState(new Date("2026-08-27T00:00:00.000Z"));
    state.reign!.coreIntegrity = 20;
    state.components = state.components.map((component) => component.componentId === "core:main" ? { ...component, hp: 100, state: "INTACT" } : component);
    const projected = projectPublicWorldSnapshot(state);
    const core = projected.components.find((component) => component.componentId === "core:main");
    expect(core).toMatchObject({ hp: 20, maxHp: 100, state: "CRITICAL" });
  });

  it("never increases Core Integrity through a public projection", () => {
    const state = createInitialAuthoritativeWorldState();
    const before = state.reign!.coreIntegrity;
    state.reign!.coreIntegrity = Math.max(0, before - 12);
    expect(projectPublicWorldSnapshot(state).reign!.coreIntegrity).toBeLessThanOrEqual(before);
  });

  it("migrates a legacy public snapshot into private state without changing its version", () => {
    const legacy = projectPublicWorldSnapshot(createInitialAuthoritativeWorldState());
    const migrated = migrateAuthoritativeWorldState(legacy);
    expect(migrated).toMatchObject({ schemaVersion: 4, worldVersion: legacy.worldVersion, eventSequence: legacy.worldVersion, attackQueue: [], activeTurn: null, contributions: [] });
  });

  it("starts a fresh protected reign while preserving live entitlements", () => {
    const previous = createInitialAuthoritativeWorldState(new Date("2026-08-27T00:00:00.000Z"));
    previous.worldVersion = 8;
    previous.liveEntitlements = [{ grantId: "grant-1", playerId: "player-1", kind: "ATTACK_PACK", quantityRemaining: 2 }];
    previous.components = previous.components.map((component) => component.componentId === "wall:front:center" ? { ...component, hp: 0, state: "DESTROYED" } : component);
    const next = createNewReignAuthoritativeWorldState(previous, new Date("2026-08-27T01:00:00.000Z"), "player-1", { displayName: "New Hold", identityType: "Person", destinationUrl: null, destinationDomain: null, message: null, ctaChoice: null, verified: false }, "identity-1");
    expect(next.currentReignId).toBe("reign:002");
    expect(next.worldSeed).toContain("seed:reign:2:player-1");
    expect(next.components.every((component) => component.state === "INTACT" || component.componentId === "foundation:main" || component.componentId === "throne:main")).toBe(true);
    expect(next.liveEntitlements).toEqual(previous.liveEntitlements);
    expect(next.coronationState.status).toBe("PROTECTED");
    expect(next.reign?.defensePriceTier).toBe(0);
    expect(next.reign?.nextDefensePriceMinor).toBe(300);
    expect(next.gameConfigVersion).toBeTruthy();
    expect(projectPublicWorldSnapshot(next, Date.parse("2026-08-27T01:00:30.000Z")).coronation?.protectedUntil).toBeGreaterThan(new Date("2026-08-27T01:00:00.000Z").getTime());
  });

  it("projects the live attack with an ephemeral label only while the turn is active", () => {
    const state = createInitialAuthoritativeWorldState(new Date("2026-08-27T00:00:00.000Z"));
    state.activeTurn = { id: "turn-1", playerId: "9f2c1a4e-0000-0000-0000-000000000000", reignId: state.currentReignId ?? "reign:001", startedAt: 1, expiresAt: Date.parse("2026-08-27T00:00:30.000Z"), shotNumber: 2 };
    const active = projectPublicWorldSnapshot(state, Date.parse("2026-08-27T00:00:10.000Z"));
    expect(active.activeAttack).toEqual({ label: "Attacker-9f2c", shotNumber: 2, expiresAt: Date.parse("2026-08-27T00:00:30.000Z") });
    expect(active.serverNow).toBe(Date.parse("2026-08-27T00:00:10.000Z"));
    const expired = projectPublicWorldSnapshot(state, Date.parse("2026-08-27T00:01:00.000Z"));
    expect(expired.activeAttack).toBeNull();
    if (state.activeTurn) state.activeTurn = { ...state.activeTurn, reignId: "reign:999" };
    expect(projectPublicWorldSnapshot(state, Date.parse("2026-08-27T00:00:10.000Z")).activeAttack).toBeNull();
  });

  it("stops projecting the protected window once it expires", () => {
    const state = createInitialAuthoritativeWorldState(new Date("2026-08-27T00:00:00.000Z"));
    state.phase = "ACTIVE";
    state.coronationState = { status: "PROTECTED", conquerorPlayerId: "player-1", openedAt: Date.parse("2026-08-27T00:00:00.000Z"), protectedUntil: Date.parse("2026-08-27T00:01:00.000Z") };
    expect(projectPublicWorldSnapshot(state, Date.parse("2026-08-27T00:00:30.000Z")).coronation).toEqual({ protectedUntil: Date.parse("2026-08-27T00:01:00.000Z") });
    expect(projectPublicWorldSnapshot(state, Date.parse("2026-08-27T00:02:00.000Z")).coronation).toBeNull();
  });
});
