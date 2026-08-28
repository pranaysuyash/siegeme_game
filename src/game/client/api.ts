export function authorityApiUrl(path: string) {
  const configured = process.env.NEXT_PUBLIC_SIEGE_API_URL;
  if (configured) return new URL(path, configured).toString();
  if (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") return `https://api.siegeme.com${path}`;
  const localProxy: Record<string, string> = { "/world": "/api/world", "/session": "/api/session", "/attack": "/api/siege/attack", "/turn/claim": "/api/siege/turn/claim", "/turn/cancel": "/api/siege/turn/cancel", "/queue": "/api/siege/queue", "/entitlements": "/api/siege/entitlements", "/history": "/api/history", "/events": "/api/events", "/contributors": "/api/contributors", "/checkout/status": "/api/payments/status", "/defense/place": "/api/defense/place", "/identity": "/api/coronation/identity", "/recovery/create": "/api/recovery/create", "/recovery/claim": "/api/recovery/claim", "/checkout": "/api/payments/attack-checkout", "/moderation/report": "/api/moderation/report", "/data/delete": "/api/data/delete" };
  return localProxy[path] ?? path;
}
