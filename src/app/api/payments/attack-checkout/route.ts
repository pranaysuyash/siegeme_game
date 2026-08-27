import { NextResponse } from "next/server";

function originIsSameOrigin(request: Request) {
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

export async function POST(request: Request) {
  if (!originIsSameOrigin(request)) return NextResponse.json({ error: "Origin rejected" }, { status: 403 });
  const authorityUrl = process.env.SIEGE_AUTHORITY_URL;
  if (!authorityUrl) return NextResponse.json({ error: "Live siege authority is not configured" }, { status: 503 });
  try {
    const response = await fetch(new URL("/checkout", authorityUrl), { method: "POST", headers: { ...(request.headers.get("cookie") ? { Cookie: request.headers.get("cookie") as string } : {}) }, cache: "no-store" });
    const payload = await response.json() as { checkout_url?: string; session_id?: string; error?: string };
    const headers = new Headers({ "Cache-Control": "no-store" });
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) headers.set("Set-Cookie", setCookie);
    return NextResponse.json({ checkoutUrl: payload.checkout_url, sessionId: payload.session_id, error: payload.error }, { status: response.status, headers });
  } catch {
    return NextResponse.json({ error: "Live siege authority could not be reached" }, { status: 503 });
  }
}
