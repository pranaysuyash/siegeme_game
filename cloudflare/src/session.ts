export const SESSION_COOKIE = "siegeme_session";
const SESSION_VERSION = "v1";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

export type PlayerSession = { playerId: string; issuedAt: number; expiresAt: number };

function base64UrlEncode(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(normalized);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function signature(payload: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64UrlEncode(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))));
}

export async function issueSession(playerId: string, secret: string, now = Date.now()) {
  const claims: PlayerSession = { playerId, issuedAt: now, expiresAt: now + SESSION_TTL_SECONDS * 1000 };
  const payload = base64UrlEncode(new TextEncoder().encode(JSON.stringify(claims)));
  return `${SESSION_VERSION}.${payload}.${await signature(`${SESSION_VERSION}.${payload}`, secret)}`;
}

export async function readSession(request: Request, secret: string, now = Date.now()): Promise<PlayerSession | null> {
  const cookie = (request.headers.get("cookie") ?? "").split(";").map((part) => part.trim()).find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  if (!cookie) return null;
  const token = cookie.slice(`${SESSION_COOKIE}=`.length);
  const [version, payload, provided] = token.split(".");
  if (version !== SESSION_VERSION || !payload || !provided) return null;
  const expected = await signature(`${version}.${payload}`, secret);
  const left = base64UrlDecode(provided);
  const right = base64UrlDecode(expected);
  if (left.length !== right.length || !crypto.subtle) return null;
  let equal = true;
  for (let index = 0; index < left.length; index += 1) equal = equal && left[index] === right[index];
  if (!equal) return null;
  try {
    const claims = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload))) as PlayerSession;
    return claims.playerId && claims.expiresAt > now ? claims : null;
  } catch {
    return null;
  }
}

export function sessionCookie(token: string) {
  return `${SESSION_COOKIE}=${token}; Path=/; Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; Secure; SameSite=Lax`;
}
