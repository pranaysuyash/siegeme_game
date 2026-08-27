CREATE TABLE IF NOT EXISTS reign_contributions (
  reign_id TEXT NOT NULL,
  player_id TEXT NOT NULL,
  shots INTEGER NOT NULL DEFAULT 0,
  hits INTEGER NOT NULL DEFAULT 0,
  damage INTEGER NOT NULL DEFAULT 0,
  core_damage INTEGER NOT NULL DEFAULT 0,
  power_orb_hits INTEGER NOT NULL DEFAULT 0,
  defenses_placed INTEGER NOT NULL DEFAULT 0,
  titles_json TEXT NOT NULL DEFAULT '[]',
  created_at INTEGER NOT NULL,
  PRIMARY KEY (reign_id, player_id)
);

CREATE INDEX IF NOT EXISTS reign_contributions_rank_idx ON reign_contributions (reign_id, damage DESC);
