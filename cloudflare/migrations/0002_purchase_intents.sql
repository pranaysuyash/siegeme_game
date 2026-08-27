CREATE TABLE IF NOT EXISTS purchase_intents (
  intent_id TEXT PRIMARY KEY,
  player_id TEXT NOT NULL,
  purchase_kind TEXT NOT NULL,
  expected_product_id TEXT NOT NULL,
  expected_quantity INTEGER NOT NULL,
  expected_amount_minor INTEGER NOT NULL,
  expected_currency TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  provider_checkout_id TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  paid_at INTEGER
);
