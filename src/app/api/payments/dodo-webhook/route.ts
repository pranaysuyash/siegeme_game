import { NextResponse } from "next/server";
import { verifyDodoWebhook } from "@/server/payments/dodo";

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (!verifyDodoWebhook(rawBody, request.headers)) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
  }

  // Payment persistence and idempotent entitlement issuance remain deliberately
  // behind the Cloudflare authority transaction boundary. A verified webhook is
  // not itself permission to grant shots until that ledger exists.
  return NextResponse.json({ received: true, entitlementIssued: false, reason: "Persistence adapter not configured" }, { status: 202 });
}
