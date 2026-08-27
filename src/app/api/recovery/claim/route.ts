import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authorityUrl = process.env.SIEGE_AUTHORITY_URL;
  if (!authorityUrl) return NextResponse.json({ error: "Live siege authority is not configured" }, { status: 503 });
  try {
    const response = await fetch(new URL("/recovery/claim", authorityUrl), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(await request.json()), cache: "no-store" });
    const headers = new Headers({ "Content-Type": "application/json", "Cache-Control": "no-store" });
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) headers.set("Set-Cookie", setCookie);
    return new NextResponse(await response.text(), { status: response.status, headers });
  } catch {
    return NextResponse.json({ error: "Live siege authority could not be reached" }, { status: 503 });
  }
}
