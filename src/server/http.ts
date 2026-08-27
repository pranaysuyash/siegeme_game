export function originIsSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const requestUrl = new URL(request.url);
  const requestHost = request.headers.get("host") ?? requestUrl.host;
  const requestProtocol = request.headers.get("x-forwarded-proto") ?? requestUrl.protocol.slice(0, -1);
  if (origin === "null") return requestHost.startsWith("127.0.0.1:") || requestHost.startsWith("localhost:");
  try {
    return new URL(origin).origin === `${requestProtocol}://${requestHost}`;
  } catch {
    return false;
  }
}
