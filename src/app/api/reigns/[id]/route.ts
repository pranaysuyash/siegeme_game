import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const authorityUrl = process.env.SIEGE_AUTHORITY_URL;
  if (!authorityUrl) return NextResponse.json({ error: "Live siege authority is not configured" }, { status: 503 });
  const { id } = await context.params;
  try {
    const response = await fetch(new URL(`/reigns/${encodeURIComponent(id)}`, authorityUrl), { cache: "no-store" });
    return new NextResponse(await response.text(), { status: response.status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Live siege authority could not be reached" }, { status: 503 });
  }
}
