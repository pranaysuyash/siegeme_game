import { describe, expect, it } from "vitest";
import { generateFortress, worldHash } from "@/game/world/generator";

describe("procedural fortress generator", () => {
  it("rebuilds the same semantic world from the same seed and version", () => {
    const first = generateFortress("seed:test");
    const second = generateFortress("seed:test");

    expect(second).toEqual(first);
    expect(worldHash(second)).toBe(worldHash(first));
    expect(first.components.map((component) => component.id)).toContain("core:main");
  });

  it("changes the semantic layout when the seed changes", () => {
    expect(worldHash(generateFortress("seed:a"))).not.toBe(worldHash(generateFortress("seed:b")));
  });

  it("refuses to silently rebuild an unknown historical generator version", () => {
    expect(() => generateFortress("seed:test", "fortress-9.9.9")).toThrow("Unsupported fortress generator version");
  });
});
