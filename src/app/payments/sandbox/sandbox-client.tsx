"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SandboxCheckoutClient() {
  const params = useSearchParams();
  const intentId = params.get("intent") ?? "";
  const [state, setState] = useState<"idle" | "confirming">("idle");
  const [error, setError] = useState<string | null>(null);

  const validIntent = /^[0-9a-f-]{36}$/i.test(intentId);

  async function confirm() {
    if (!validIntent || state === "confirming") return;
    setState("confirming");
    setError(null);
    try {
      const response = await fetch("/api/payments/sandbox-confirm", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ intentId }) });
      const payload = await response.json() as { confirmed?: boolean; error?: string };
      if (!response.ok || !payload.confirmed) {
        setState("idle");
        setError(payload.error ?? "The test payment could not be confirmed.");
        return;
      }
      // A full reload is required: CheckoutStatus reads ?checkout=return only on mount, so a
      // client-side navigation would silently drop the payment-confirmation banner. This mirrors
      // the real payment-provider return navigation anyway.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/?checkout=return");
    } catch {
      setState("idle");
      setError("The test payment could not be confirmed.");
    }
  }

  return (
    <section className="sandbox-card">
      <p className="sandbox-banner">TEST MODE · LOCAL ONLY · NO REAL CHARGE</p>
      <h1>Sandbox checkout</h1>
      <p className="sandbox-lede">This stand-in for the Dodo hosted checkout exists only while local payments are in dummy mode. Confirming records the payment against the live siege authority exactly like the real webhook would.</p>
      <div className="sandbox-intent"><span>PURCHASE INTENT</span><strong>{validIntent ? intentId : "missing or invalid"}</strong></div>
      <button className="sheet-primary sandbox-confirm" onClick={() => void confirm()} disabled={!validIntent || state === "confirming"}>{state === "confirming" ? "Confirming…" : "Confirm test payment"}<span>→</span></button>
      <Link className="sandbox-cancel" href="/">Cancel and return to the siege</Link>
      {error && <p className="error-note" role="alert">{error}</p>}
      <p className="muted-note">In production this surface is unreachable: it requires an unconfigured Dodo environment on a localhost authority.</p>
    </section>
  );
}
