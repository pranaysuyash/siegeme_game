import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function proxy(request: Request, context: { params: Promise<{ key: string[] }> }) {
  const authorityUrl = process.env.SIEGE_AUTHORITY_URL;
  if (!authorityUrl) return NextResponse.json({ error: "Live siege authority is not configured" }, { status: 503 });
  const { key } = await context.params;
  if (!Array.isArray(key) || key.length === 0) return NextResponse.json({ error: "Asset key is required" }, { status: 422 });
  const authorityPath = `/assets/${key.map((part) => encodeURIComponent(part)).join("/")}`;
  try {
    const response = await fetch(new URL(authorityPath, authorityUrl), { method: request.method, headers: { ...(request.headers.get("cookie") ? { Cookie: request.headers.get("cookie") as string } : {}) }, cache: "no-store" });
    const headers = new Headers({ "Cache-Control": response.headers.get("Cache-Control") ?? "no-store", "Content-Type": response.headers.get("Content-Type") ?? (request.method === "GET" ? "application/octet-stream" : "application/json") });
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) headers.set("Set-Cookie", setCookie);
    return new NextResponse(await response.arrayBuffer(), { status: response.status, headers });
  } catch {
    return NextResponse.json({ error: "Live siege authority could not be reached" }, { status: 503 });
  }
}

export async function GET(request: Request, context: { params: Promise<{ key: string[] }> }) { return proxy(request, context); }

export async function DELETE(request: Request, context: { params: Promise<{ key: string[] }> }) { return proxy(request, context); }
