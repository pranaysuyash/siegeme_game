import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authorityUrl = process.env.SIEGE_AUTHORITY_URL;
  if (!authorityUrl) return NextResponse.json({ error: "Live siege authority is not configured" }, { status: 503 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Attack intent must be valid JSON" }, { status: 400 });
  }
  try {
    const response = await fetch(new URL("/attack", authorityUrl), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(request.headers.get("authorization") ? { Authorization: request.headers.get("authorization") as string } : {}) },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    return new NextResponse(await response.text(), { status: response.status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Live siege authority could not be reached" }, { status: 503 });
  }
}
