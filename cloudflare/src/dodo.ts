export type PurchaseIntentRecord = {
  intent_id: string;
  player_id: string;
  purchase_kind: string;
  expected_product_id: string;
  expected_quantity: number;
  expected_amount_minor: number;
  expected_currency: string;
  status: string;
};

export type DodoGrantDecision =
  | { ok: true; grant: { grantId: string; paymentId: string; intentId: string; playerId: string; kind: "ATTACK_PACK" | "DEFENSE_PACK"; quantity: number } }
  | { ok: false; status: 202 | 422; receipt: { received: true; duplicate: boolean; entitlementIssued: false; reason: string } };

export type DodoCompensationDecision =
  | { ok: true; paymentId: string; status: "REFUNDED" | "DISPUTED"; reason: string }
  | { ok: false; status: 202; receipt: { received: true; duplicate: boolean; entitlementIssued: false; entitlementRevoked: false; reason: string } };

const PAID_EVENT_PATTERN = /^payment\.(succeeded|paid|completed)$/i;
const REFUND_OR_DISPUTE_EVENT_PATTERN = /^(?:payment\.(refunded|chargeback|disputed)|refund\.(succeeded|completed)|dispute\.(created|opened))$/i;

/**
 * Pure decision for whether a verified Dodo webhook grants an entitlement.
 * Signature verification and idempotency inserts stay in the worker; this
 * function only decides, so both attack and defense grants are testable.
 */
export function evaluateDodoPayment(event: Record<string, unknown>, intent: PurchaseIntentRecord | null, duplicate: boolean): DodoGrantDecision {
  const data = (event.data && typeof event.data === "object" ? event.data : event) as Record<string, unknown>;
  const metadata = (data.metadata && typeof data.metadata === "object" ? data.metadata : {}) as Record<string, unknown>;
  const purchaseIntentId = typeof metadata.purchase_intent_id === "string" ? metadata.purchase_intent_id : null;
  const paymentId = typeof data.payment_id === "string" ? data.payment_id : typeof data.id === "string" ? data.id : null;
  const paid = typeof event.type === "string" && PAID_EVENT_PATTERN.test(event.type);
  if (!purchaseIntentId || !paymentId || !paid) {
    return { ok: false, status: 202, receipt: { received: true, duplicate, entitlementIssued: false, reason: "Non-payment or missing purchase intent" } };
  }
  const productCart = Array.isArray(data.product_cart) ? data.product_cart as Array<Record<string, unknown>> : [];
  const productId = typeof data.product_id === "string" ? data.product_id : typeof productCart[0]?.product_id === "string" ? productCart[0].product_id : null;
  const totalAmount = typeof data.total_amount === "number" ? data.total_amount : null;
  const currency = typeof data.currency === "string" ? data.currency : null;
  if (!intent || intent.status !== "PENDING" || !["ATTACK_PACK", "DEFENSE_PACK"].includes(intent.purchase_kind) || productId !== intent.expected_product_id || totalAmount !== intent.expected_amount_minor || currency?.toUpperCase() !== intent.expected_currency.toUpperCase()) {
    return { ok: false, status: 422, receipt: { received: true, duplicate, entitlementIssued: false, reason: "Payment does not match purchase intent" } };
  }
  if (intent.purchase_kind !== "ATTACK_PACK" && intent.purchase_kind !== "DEFENSE_PACK") {
    return { ok: false, status: 422, receipt: { received: true, duplicate, entitlementIssued: false, reason: "Unsupported purchase kind" } };
  }
  return { ok: true, grant: { grantId: `dodo:${paymentId}:${intent.purchase_kind}`, paymentId, intentId: purchaseIntentId, playerId: intent.player_id, kind: intent.purchase_kind, quantity: intent.expected_quantity } };
}

/** Pure compensation decision. D1 and the Durable Object apply the mutation. */
export function evaluateDodoCompensation(event: Record<string, unknown>, duplicate: boolean): DodoCompensationDecision {
  const data = (event.data && typeof event.data === "object" ? event.data : event) as Record<string, unknown>;
  const paymentId = typeof data.payment_id === "string" ? data.payment_id : typeof data.id === "string" ? data.id : null;
  const eventType = typeof event.type === "string" ? event.type : "";
  if (!paymentId || !REFUND_OR_DISPUTE_EVENT_PATTERN.test(eventType)) return { ok: false, status: 202, receipt: { received: true, duplicate, entitlementIssued: false, entitlementRevoked: false, reason: "Non-compensation event" } };
  return { ok: true, paymentId, status: /dispute|chargeback/i.test(eventType) ? "DISPUTED" : "REFUNDED", reason: eventType };
}
