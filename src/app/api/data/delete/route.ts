import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const authorityUrl = process.env.SIEGE_AUTHORITY_URL;
  if (!authorityUrl) return Response.json({ error: "Live siege authority is not configured" }, { status: 503 });
  const response = await fetch(new URL("/data/delete", authorityUrl), { method: "POST", headers: { Cookie: request.headers.get("cookie") ?? "" }, cache: "no-store" });
  const headers = new Headers({ "Content-Type": response.headers.get("Content-Type") ?? "application/json" });
  const cookie = response.headers.get("Set-Cookie");
  if (cookie) headers.set("Set-Cookie", cookie);
  return new Response(await response.text(), { status: response.status, headers });
}
