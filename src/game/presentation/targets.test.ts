import { describe, expect, it } from "vitest";
import { presentationTargetKind, presentationTargetPosition } from "@/game/presentation/targets";
import { createInitialWorldSnapshot } from "@/game/world/initial-snapshot";
import { generateFortress } from "@/game/world/generator";
import { powerOrbPosition } from "@/game/simulation/ballistics";

describe("authority target presentation mapping", () => {
  it("maps component, moving orb, and defense identities to generated positions", () => {
    const snapshot = createInitialWorldSnapshot();
    snapshot.activeDefenses = [{ id: "shield-1", type: "SHIELD", slotId: "shield_slot:core_front", hp: 2, maxHp: 2 }];
    const definition = generateFortress(snapshot.worldSeed, snapshot.generatorVersion);
    expect(presentationTargetPosition(definition, snapshot, "core:main")).toEqual(definition.components.find((component) => component.id === "core:main")?.position);
    expect(presentationTargetPosition(definition, snapshot, "power-orb")).toEqual(powerOrbPosition(definition, snapshot.worldVersion));
    expect(presentationTargetPosition(definition, snapshot, "defense:shield-1")).toEqual(definition.defenseSlots.find((slot) => slot.id === "shield_slot:core_front")?.position);
  });

  it("returns null for a stale or unknown target instead of inventing an impact point", () => {
    const snapshot = createInitialWorldSnapshot();
    expect(presentationTargetPosition(generateFortress(snapshot.worldSeed, snapshot.generatorVersion), snapshot, "defense:missing")).toBeNull();
    expect(presentationTargetPosition(generateFortress(snapshot.worldSeed, snapshot.generatorVersion), snapshot, "unknown")).toBeNull();
  });

  it("classifies target identities without treating unknown values as valid targets", () => {
    expect(presentationTargetKind("core:main")).toBe("component");
    expect(presentationTargetKind("power-orb")).toBe("power-orb");
    expect(presentationTargetKind("defense:shield-1")).toBe("defense");
    expect(presentationTargetKind("miss")).toBe("miss");
    expect(presentationTargetKind("unexpected")).toBe("unknown");
  });
});
