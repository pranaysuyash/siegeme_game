import { NextResponse } from "next/server";
import { createAttackCheckout, dodoConfigured } from "@/server/payments/dodo";

function originIsSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!originIsSameOrigin(request)) return NextResponse.json({ error: "Origin rejected" }, { status: 403 });
  if (!request.headers.get("authorization")) return NextResponse.json({ error: "Player authentication is required" }, { status: 401 });
  if (!process.env.SIEGE_AUTHORITY_URL) return NextResponse.json({ error: "Live siege authority is not configured" }, { status: 503 });
  if (!dodoConfigured()) {
    return NextResponse.json({ error: "Dodo Payments is not configured for this environment" }, { status: 503 });
  }

  const returnUrl = new URL("/", request.url).toString();
  const session = await createAttackCheckout({
    returnUrl,
    metadata: { purchase_kind: "ATTACK_PACK", product: "3 shots" },
  });
  return NextResponse.json({ checkoutUrl: session.checkout_url, sessionId: session.session_id });
}
