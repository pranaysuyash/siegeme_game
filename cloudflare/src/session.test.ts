import { describe, expect, it } from "vitest";
import { issueSession, readSession, sessionCookie } from "./session";

describe("silent player sessions", () => {
  it("round-trips a signed session and rejects tampering", async () => {
    const token = await issueSession("player-1", "test-secret", 1_000);
    const request = new Request("https://siegeme.com/session", { headers: { cookie: sessionCookie(token) } });
    await expect(readSession(request, "test-secret", 2_000)).resolves.toMatchObject({ playerId: "player-1", issuedAt: 1_000 });
    const [version, payload, signature] = token.split(".");
    const tamperedToken = `${version}.${payload.slice(0, -1)}${payload.endsWith("A") ? "B" : "A"}.${signature}`;
    const tamperedCookie = sessionCookie(tamperedToken);
    await expect(readSession(new Request("https://siegeme.com/session", { headers: { cookie: tamperedCookie } }), "test-secret", 2_000)).resolves.toBeNull();
  });

  it("rejects an expired signed session", async () => {
    const token = await issueSession("player-2", "test-secret", 1_000);
    const request = new Request("https://siegeme.com/session", { headers: { cookie: sessionCookie(token) } });
    await expect(readSession(request, "test-secret", 1_000 + 30 * 24 * 60 * 60 * 1000 + 1)).resolves.toBeNull();
  });
});
