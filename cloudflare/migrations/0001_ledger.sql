CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE IF NOT EXISTS public_identities (
  id TEXT PRIMARY KEY,
  owner_player_id TEXT NOT NULL,
  identity_type TEXT NOT NULL,
  display_name TEXT NOT NULL,
  destination_url TEXT,
  destination_domain TEXT,
  logo_key TEXT,
  message TEXT,
  cta_choice TEXT,
  moderation_status TEXT NOT NULL DEFAULT 'PENDING',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS webhook_events (
  provider TEXT NOT NULL,
  provider_event_id TEXT NOT NULL,
  received_at INTEGER NOT NULL,
  payload_json TEXT NOT NULL,
  PRIMARY KEY (provider, provider_event_id)
);

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  provider_payment_id TEXT NOT NULL UNIQUE,
  provider_customer_id TEXT,
  player_id TEXT NOT NULL,
  purchase_kind TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  amount_minor INTEGER,
  currency TEXT,
  status TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS entitlement_ledger (
  id TEXT PRIMARY KEY,
  player_id TEXT NOT NULL,
  payment_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  UNIQUE (payment_id, kind)
);

CREATE TABLE IF NOT EXISTS reign_archive (
  id TEXT PRIMARY KEY,
  ordinal INTEGER NOT NULL UNIQUE,
  ruler_player_id TEXT,
  public_identity_id TEXT,
  started_at INTEGER NOT NULL,
  ended_at INTEGER,
  final_state_version INTEGER,
  archive_summary_json TEXT,
  archived_at INTEGER
);
