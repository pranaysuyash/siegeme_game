import type { RulerIdentity } from "../domain/types";

const IDENTITY_TYPES = new Set(["Person", "Company", "Product", "Project", "Community", "Campaign", "Creator"]);
const CTA_CHOICES = new Set(["VISIT", "FOLLOW", "LEARN_MORE", "SUPPORT"]);

export type PublicIdentityInput = {
  displayName: string;
  identityType: string;
  destinationUrl?: string | null;
  message?: string | null;
  ctaChoice?: string | null;
  socialHandle?: string | null;
};

export type IdentityValidation =
  | { ok: true; identity: RulerIdentity }
  | { ok: false; error: string };

function cleanText(value: string | null | undefined, field: string, maxLength: number) {
  if (value == null) return null;
  const cleaned = value.trim();
  if (!cleaned || cleaned.length > maxLength || /[<>\u0000-\u001f\u007f]/.test(cleaned)) throw new Error(`${field} is invalid`);
  return cleaned;
}

function isPrivateHost(hostname: string) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host === "::1" || host === "0.0.0.0") return true;
  if (/^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host)) return true;
  const private172 = host.match(/^172\.(\d{1,3})\./);
  return Boolean(private172 && Number(private172[1]) >= 16 && Number(private172[1]) <= 31);
}

export function normalizeDestinationUrl(value: string | null | undefined) {
  if (value == null || !value.trim()) return null;
  if (value.length > 2048) throw new Error("Destination URL is too long");
  let parsed: URL;
  try { parsed = new URL(value.trim()); } catch { throw new Error("Destination URL is invalid"); }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error("Destination URL must use http or https");
  if (parsed.username || parsed.password) throw new Error("Destination URL cannot contain credentials");
  if (parsed.hostname.toLowerCase().includes("xn--") || isPrivateHost(parsed.hostname)) throw new Error("Destination host is not allowed");
  return parsed.toString();
}

export function validatePublicIdentity(input: PublicIdentityInput): IdentityValidation {
  try {
    const displayName = cleanText(input.displayName, "Display name", 48);
    const message = cleanText(input.message, "Message", 160);
    const ctaChoice = cleanText(input.ctaChoice, "CTA", 32);
    const socialHandle = cleanText(input.socialHandle, "Social handle", 64);
    if (!displayName || !IDENTITY_TYPES.has(input.identityType)) return { ok: false, error: "Public identity details are invalid" };
    if (ctaChoice && !CTA_CHOICES.has(ctaChoice)) return { ok: false, error: "CTA choice is invalid" };
    if (socialHandle && !/^@[a-zA-Z0-9_.]{2,40}$/.test(socialHandle)) return { ok: false, error: "Social handle is invalid" };
    const destinationUrl = normalizeDestinationUrl(input.destinationUrl);
    return {
      ok: true,
      identity: {
        displayName,
        identityType: input.identityType,
        destinationUrl,
        destinationDomain: destinationUrl ? new URL(destinationUrl).hostname : null,
        message,
        ctaChoice,
        socialHandle,
        verified: false,
      },
    };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Public identity details are invalid" };
  }
}
