CREATE TABLE IF NOT EXISTS recovery_tokens (
  token_hash TEXT PRIMARY KEY,
  player_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  used_at INTEGER
);

CREATE INDEX IF NOT EXISTS recovery_tokens_player_idx ON recovery_tokens (player_id, expires_at);
