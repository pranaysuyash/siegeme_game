import { describe, expect, it } from "vitest";
import { normalizeDestinationUrl, validatePublicIdentity } from "@/game/security/public-identity";

describe("public identity safety boundary", () => {
  it("accepts normalized http and https destinations", () => {
    expect(normalizeDestinationUrl("https://Example.com/hold#throne")).toBe("https://example.com/hold#throne");
  });

  it.each(["javascript:alert(1)", "data:text/html,hello", "https://user:pass@example.com", "http://127.0.0.1/admin", "https://xn--paypa1-5ve.com"]) ("rejects unsafe destination %s", (url) => {
    expect(() => normalizeDestinationUrl(url)).toThrow();
  });

  it("rejects markup and unsupported identity types", () => {
    expect(validatePublicIdentity({ displayName: "<script>", identityType: "Company" }).ok).toBe(false);
    expect(validatePublicIdentity({ displayName: "Hold", identityType: "Unknown" }).ok).toBe(false);
  });

  it("keeps public identity separate from verification state", () => {
    const result = validatePublicIdentity({ displayName: "The Hold", identityType: "Community", destinationUrl: "https://siegeme.com" });
    expect(result).toMatchObject({ ok: true, identity: { destinationDomain: "siegeme.com", verified: false } });
  });
});
