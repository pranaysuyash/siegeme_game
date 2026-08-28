# Architecture Corrections

This record is the canonical correction log for decisions that can otherwise
be misread by a future implementation pass.

## Current corrections

- **Runtime:** Cloudflare Worker + one global `SiegeWorld` Durable Object is the
  production authority. D1 is the payment, identity, recovery, archive, and
  reconciliation ledger. R2 stores customer assets. Supabase is not part of
  the runtime plan.
- **Identity:** a silent signed `player_id` session is progressive identity,
  not a login wall. Recovery codes are the current cross-device mechanism;
  email magic links are a documented future choice, not a hidden dependency.
- **State:** the DO persists `AuthoritativeWorldState` in
  `authoritative_world_state` schema version 4. `PublicWorldSnapshot` is a sanitized projection.
  Existing `world_snapshot` rows migrate forward on first read.
- **Core:** `reign.coreIntegrity` is the only canonical Core health value.
  The public `core:main` component is derived from it and cannot increase in a
  reign.
- **Physics:** `ballistic-v1` is a deterministic swept-AABB authority/replay
  resolver over generator geometry. It is not a claim that Rapier is currently
  the server simulation package.
- **Defense:** shields and braces are finite hittable slot objects. A shield
  absorbs two hits and a brace absorbs one. Braces attach to the first damaged
  or critical component and apply the configured reduction once.
- **Turns:** each paid shot is its own claimed `ActiveTurn` with a 20-second
  lease, not the spec section 12.1 "one pack = one three-shot turn". A $3 pack
  is three finite entitlement shots and each requires its own claim. Queue,
  lease, and replay semantics are per shot. This is a deliberate
  simplification, not an omission to be fixed back to the spec wording.
- **Coronation projection:** an expired protection window projects as
  `coronation: null`. Spectator-only worlds can go a long time without a
  mutating command, so window expiry must be derived at projection time
  (protectedUntil compared to now), never inferred from a stored flag.
- **Data deletion:** `POST /data/delete` marks the player DELETED in D1,
  drops recovery tokens and report-attribution links, and removes the
  player's live entitlements and replay cache from Durable Object storage.
  Payment records and reign archives are retained for financial and
  historical integrity; references inside them are opaque random ids.
- **Attacker labels:** spectators see ephemeral labels (`Attacker-xxxx`, the
  first four characters of the opaque player UUID) projected from the active
  turn. They are stable per player, carry no PII, and are never reused as
  identity. Public snapshots deliberately exclude raw player IDs.
- **Config:** tunable attack, defense, timeout, retention, and balance values
  live in the versioned shared `GameConfig`. The state records its config
  version for future balance changes.
- **Assets:** the current Worker boundary checks ownership, MIME, magic bytes,
  dimensions, size, and moderation baseline, strips container metadata, and
  only then writes R2 plus D1 metadata. Decoder-backed pixel resize and
  re-encode remain a hardening requirement.
- **Contributions:** attacks and defense placements update reign-scoped
  anonymous counters in the private DO state. Counters are copied to D1 only
  when a reign closes, with deterministic titles and idempotent archive retry.

## Evidence boundary

Local Worker, D1, R2, browser, and unit-test evidence proves the local path.
It does not prove Dodo production behavior, DNS, hosted routing, human
moderation, or deployed concurrency.
