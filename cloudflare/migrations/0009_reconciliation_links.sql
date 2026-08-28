ALTER TABLE payments ADD COLUMN purchase_intent_id TEXT;
ALTER TABLE entitlement_ledger ADD COLUMN intent_id TEXT;

CREATE INDEX IF NOT EXISTS entitlement_ledger_pending_idx ON entitlement_ledger (status, created_at);
