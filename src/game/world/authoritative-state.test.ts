import { describe, expect, it } from "vitest";
import { createInitialAuthoritativeWorldState, migrateAuthoritativeWorldState, projectPublicWorldSnapshot } from "@/game/world/initial-snapshot";

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
    expect(migrated).toMatchObject({ schemaVersion: 3, worldVersion: legacy.worldVersion, eventSequence: legacy.worldVersion, attackQueue: [], activeTurn: null });
  });
});
