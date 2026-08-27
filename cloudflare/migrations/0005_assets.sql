CREATE TABLE IF NOT EXISTS ruler_assets (
  asset_key TEXT PRIMARY KEY,
  owner_player_id TEXT NOT NULL,
  content_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL,
  moderation_status TEXT NOT NULL DEFAULT 'PENDING',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS ruler_assets_owner_idx ON ruler_assets (owner_player_id, created_at);
