import { describe, expect, it } from "vitest";
import { evaluateDodoPayment, type PurchaseIntentRecord } from "./dodo";

function attackIntent(): PurchaseIntentRecord {
  return { intent_id: "intent-1", player_id: "player-1", purchase_kind: "ATTACK_PACK", expected_product_id: "prod_attack", expected_quantity: 3, expected_amount_minor: 300, expected_currency: "USD", status: "PENDING" };
}

function paymentEvent(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    type: "payment.succeeded",
    id: "evt-1",
    data: {
      payment_id: "pay-1",
      total_amount: 300,
      currency: "usd",
      product_id: "prod_attack",
      metadata: { purchase_intent_id: "intent-1" },
    },
    ...overrides,
  };
}

describe("evaluateDodoPayment", () => {
  it("grants an attack pack once for a matching payment", () => {
    const decision = evaluateDodoPayment(paymentEvent(), attackIntent(), false);
    expect(decision).toEqual({ ok: true, grant: { grantId: "dodo:pay-1:ATTACK_PACK", paymentId: "pay-1", intentId: "intent-1", playerId: "player-1", kind: "ATTACK_PACK", quantity: 3 } });
  });

  it("grants a defense pack for a matching defense intent", () => {
    const intent: PurchaseIntentRecord = { ...attackIntent(), purchase_kind: "DEFENSE_PACK", expected_product_id: "prod_defense", expected_quantity: 1, expected_amount_minor: 300 };
    const event = paymentEvent({ data: { payment_id: "pay-2", total_amount: 300, currency: "USD", product_id: "prod_defense", metadata: { purchase_intent_id: "intent-1" } } });
    const decision = evaluateDodoPayment(event, intent, false);
    expect(decision).toEqual({ ok: true, grant: { grantId: "dodo:pay-2:DEFENSE_PACK", paymentId: "pay-2", intentId: "intent-1", playerId: "player-1", kind: "DEFENSE_PACK", quantity: 1 } });
  });

  it("rejects an amount mismatch against the purchase intent", () => {
    const event = paymentEvent({ data: { payment_id: "pay-3", total_amount: 500, currency: "USD", product_id: "prod_attack", metadata: { purchase_intent_id: "intent-1" } } });
    const decision = evaluateDodoPayment(event, attackIntent(), false);
    expect(decision).toMatchObject({ ok: false, status: 422, receipt: { reason: "Payment does not match purchase intent" } });
  });

  it("rejects a product mismatch against the purchase intent", () => {
    const event = paymentEvent({ data: { payment_id: "pay-4", total_amount: 300, currency: "USD", product_id: "prod_other", metadata: { purchase_intent_id: "intent-1" } } });
    expect(evaluateDodoPayment(event, attackIntent(), false)).toMatchObject({ ok: false, status: 422 });
  });

  it("rejects a failed purchase intent", () => {
    const decision = evaluateDodoPayment(paymentEvent(), { ...attackIntent(), status: "FAILED" }, false);
    expect(decision).toMatchObject({ ok: false, status: 422 });
  });

  it("acks non-payment events without issuing an entitlement", () => {
    const decision = evaluateDodoPayment(paymentEvent({ type: "refund.succeeded" }), attackIntent(), true);
    expect(decision).toEqual({ ok: false, status: 202, receipt: { received: true, duplicate: true, entitlementIssued: false, reason: "Non-payment or missing purchase intent" } });
  });

  it("rejects payments with an unknown purchase intent", () => {
    const decision = evaluateDodoPayment(paymentEvent(), null, false);
    expect(decision).toEqual({ ok: false, status: 422, receipt: { received: true, duplicate: false, entitlementIssued: false, reason: "Payment does not match purchase intent" } });
  });

  it("matches currency case-insensitively", () => {
    const intent = { ...attackIntent(), expected_currency: "usd" };
    const decision = evaluateDodoPayment(paymentEvent(), intent, false);
    expect(decision).toMatchObject({ ok: true });
  });
});
