import type { D1Database } from "@cloudflare/workers-types";
import { isPaidEvent } from "./dodo";

/**
 * Probe whether a column exists without failing if the migration that adds it
 * has not been applied yet. SV-3: the worker is deployed independently of DB
 * migrations, so `payments.purchase_intent_id` / `entitlement_ledger.intent_id`
 * may be absent for a window after deploy. This is deliberately rechecked for
 * each grant so rolling Worker isolates cannot retain stale schema knowledge.
 */
export async function columnExists(db: D1Database, table: string, column: string): Promise<boolean> {
  try {
    const info = await db.prepare(`PRAGMA table_info(${table})`).all<{ name: string }>();
    return (info.results ?? []).some((row) => row.name === column);
  } catch {
    return false;
  }
}

export type GrantInput = {
  provider: "DODO" | "SANDBOX";
  grantId: string;
  intentId: string;
  paymentId: string;
  playerId: string;
  kind: "ATTACK_PACK" | "DEFENSE_PACK";
  quantity: number;
};

/**
 * Build the payment + ledger insert statements, conditionally including the
 * `purchase_intent_id` / `intent_id` columns only when they exist. Returns the
 * SQL + bound args so the caller applies them with its own DB handle. This is
 * the SV-3 migration-ordering fix made unit-testable in isolation.
 */
export function buildGrantStatements(
  paymentsHasIntentCol: boolean,
  ledgerHasIntentCol: boolean,
  grant: GrantInput,
  now: number,
): { sql: string; args: unknown[] }[] {
  const paymentsSql = paymentsHasIntentCol
    ? "INSERT OR IGNORE INTO payments (id, provider, provider_payment_id, purchase_intent_id, player_id, purchase_kind, quantity, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'PAID', ?, ?)"
    : "INSERT OR IGNORE INTO payments (id, provider, provider_payment_id, player_id, purchase_kind, quantity, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 'PAID', ?, ?)";
  const paymentsArgs = paymentsHasIntentCol
    ? [grant.paymentId, grant.provider, grant.paymentId, grant.intentId, grant.playerId, grant.kind, grant.quantity, now, now]
    : [grant.paymentId, grant.provider, grant.paymentId, grant.playerId, grant.kind, grant.quantity, now, now];
  const ledgerSql = ledgerHasIntentCol
    ? "INSERT OR IGNORE INTO entitlement_ledger (id, player_id, payment_id, intent_id, kind, quantity, status, created_at) VALUES (?, ?, ?, ?, ?, ?, 'PENDING_GRANT', ?)"
    : "INSERT OR IGNORE INTO entitlement_ledger (id, player_id, payment_id, kind, quantity, status, created_at) VALUES (?, ?, ?, ?, ?, 'PENDING_GRANT', ?)";
  const ledgerArgs = ledgerHasIntentCol
    ? [grant.grantId, grant.playerId, grant.paymentId, grant.intentId, grant.kind, grant.quantity, now]
    : [grant.grantId, grant.playerId, grant.paymentId, grant.kind, grant.quantity, now];
  return [
    { sql: paymentsSql, args: paymentsArgs },
    { sql: ledgerSql, args: ledgerArgs },
    { sql: "UPDATE purchase_intents SET status = 'PAID', updated_at = ?, paid_at = COALESCE(paid_at, ?) WHERE intent_id = ?", args: [now, now, grant.intentId] },
  ];
}

/**
 * SV-2: when a paid webhook arrives before its purchase intent has been
 * observed (transient ordering race), we must NOT return a terminal 422. A 2xx
 * tells Dodo to stop retrying; a later retry (or reconciliation) will then find
 * the intent and grant. We defer only on the first (non-duplicate) sighting of a
 * genuine payment event whose intent is not yet present.
 */
export function shouldDeferForMissingIntent(event: Record<string, unknown>, duplicate: boolean): boolean {
  return !duplicate && isPaidEvent(event);
}
