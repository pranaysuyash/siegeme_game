import { NextRequest } from "next/server";

const authorityUrl = process.env.SIEGE_AUTHORITY_URL ?? "http://127.0.0.1:8787";

export async function POST(request: NextRequest) {
  const response = await fetch(`${authorityUrl}/turn/claim`, { method: "POST", headers: { Cookie: request.headers.get("cookie") ?? "" }, cache: "no-store" });
  const headers = new Headers({ "Content-Type": response.headers.get("Content-Type") ?? "application/json" });
  const cookie = response.headers.get("Set-Cookie");
  if (cookie) headers.set("Set-Cookie", cookie);
  return new Response(await response.text(), { status: response.status, headers });
}
