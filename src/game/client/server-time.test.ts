import { describe, expect, it } from "vitest";
import { serverClockSkew, serverNow } from "@/game/client/server-time";

describe("authority clock projection", () => {
  it("adds a positive authority offset to the local clock", () => {
    expect(serverClockSkew(10_500, 10_000)).toBe(500);
    expect(serverNow(20_000, 500)).toBe(20_500);
  });

  it("subtracts an authority-behind offset without changing the contract", () => {
    expect(serverClockSkew(9_500, 10_000)).toBe(-500);
    expect(serverNow(20_000, -500)).toBe(19_500);
  });
});
