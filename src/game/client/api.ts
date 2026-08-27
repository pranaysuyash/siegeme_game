export function authorityApiUrl(path: string) {
  const configured = process.env.NEXT_PUBLIC_SIEGE_API_URL;
  if (configured) return new URL(path, configured).toString();
  if (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") return `https://api.siegeme.com${path}`;
  const localProxy: Record<string, string> = { "/world": "/api/world", "/session": "/api/session", "/attack": "/api/siege/attack", "/turn/claim": "/api/siege/turn/claim", "/checkout": "/api/payments/attack-checkout" };
  return localProxy[path] ?? path;
}
