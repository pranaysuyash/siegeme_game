CREATE TABLE IF NOT EXISTS archival_outbox (
  archive_id TEXT PRIMARY KEY,
  payload_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS archival_outbox_status_idx ON archival_outbox (status, updated_at);
