CREATE TABLE IF NOT EXISTS moderation_cases (
  case_id TEXT PRIMARY KEY,
  subject_type TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  reporter_player_id TEXT,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'OPEN',
  resolution TEXT,
  resolved_by TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS moderation_cases_status_idx ON moderation_cases (status, created_at);
CREATE INDEX IF NOT EXISTS moderation_cases_subject_idx ON moderation_cases (subject_type, subject_id, created_at);

CREATE TABLE IF NOT EXISTS moderation_audit (
  audit_id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  detail TEXT,
  created_at INTEGER NOT NULL
);
