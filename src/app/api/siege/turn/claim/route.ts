import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const authorityUrl = process.env.SIEGE_AUTHORITY_URL;
  if (!authorityUrl) return Response.json({ error: "Live siege authority is not configured" }, { status: 503 });
  try {
    const response = await fetch(new URL("/turn/claim", authorityUrl), { method: "POST", headers: { Cookie: request.headers.get("cookie") ?? "" }, cache: "no-store" });
    const headers = new Headers({ "Content-Type": response.headers.get("Content-Type") ?? "application/json", "Cache-Control": "no-store" });
    const cookie = response.headers.get("Set-Cookie");
    if (cookie) headers.set("Set-Cookie", cookie);
    return new Response(await response.text(), { status: response.status, headers });
  } catch {
    return Response.json({ error: "Live siege authority could not be reached" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
