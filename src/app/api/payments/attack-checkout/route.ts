import { NextResponse } from "next/server";
import { originIsSameOrigin } from "@/server/http";

export async function POST(request: Request) {
  if (!originIsSameOrigin(request)) return NextResponse.json({ error: "Origin rejected" }, { status: 403 });
  const authorityUrl = process.env.SIEGE_AUTHORITY_URL;
  if (!authorityUrl) return NextResponse.json({ error: "Live siege authority is not configured" }, { status: 503 });
  try {
    const response = await fetch(new URL("/checkout", authorityUrl), { method: "POST", headers: { "Content-Type": "application/json", ...(request.headers.get("cookie") ? { Cookie: request.headers.get("cookie") as string } : {}) }, body: JSON.stringify(await request.clone().json().catch(() => ({}))), cache: "no-store" });
    const payload = await response.json() as { checkout_url?: string; session_id?: string; error?: string };
    const headers = new Headers({ "Cache-Control": "no-store" });
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) headers.set("Set-Cookie", setCookie);
    return NextResponse.json({ checkoutUrl: payload.checkout_url, sessionId: payload.session_id, error: payload.error }, { status: response.status, headers });
  } catch {
    return NextResponse.json({ error: "Live siege authority could not be reached" }, { status: 503 });
  }
}
