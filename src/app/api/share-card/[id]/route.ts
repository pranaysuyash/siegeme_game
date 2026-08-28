import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const authorityUrl = process.env.SIEGE_AUTHORITY_URL;
  if (!authorityUrl) return new NextResponse("Live siege authority is not configured", { status: 503 });
  const { id } = await context.params;
  try {
    const response = await fetch(new URL(`/share-card/${encodeURIComponent(id)}.svg`, authorityUrl), { cache: "no-store" });
    return new NextResponse(await response.text(), { status: response.status, headers: { "Content-Type": response.headers.get("Content-Type") ?? "image/svg+xml; charset=utf-8", "Cache-Control": response.headers.get("Cache-Control") ?? "no-store", "X-Content-Type-Options": "nosniff" } });
  } catch {
    return new NextResponse("Live siege authority could not be reached", { status: 503 });
  }
}
