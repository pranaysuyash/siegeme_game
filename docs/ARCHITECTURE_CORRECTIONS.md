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
  `authoritative_world_state`. `PublicWorldSnapshot` is a sanitized projection.
  Existing `world_snapshot` rows migrate forward on first read.
- **Core:** `reign.coreIntegrity` is the only canonical Core health value.
  The public `core:main` component is derived from it and cannot increase in a
  reign.
- **Physics:** `ballistic-v1` is a deterministic swept-AABB authority/replay
  resolver over generator geometry. It is not a claim that Rapier is currently
  the server simulation package.
- **Defense:** shields and braces are finite hittable slot objects. A shield
  absorbs two hits and a brace absorbs one. The spec's attach-to-damaged-
  component brace reduction remains a deliberate future deviation.
- **Config:** tunable attack, defense, timeout, retention, and balance values
  live in the versioned shared `GameConfig`. The state records its config
  version for future balance changes.
- **Assets:** the current Worker boundary checks ownership, MIME, magic bytes,
  size, and moderation baseline before R2 delivery. Image decode, metadata
  stripping, resize, and re-encode remain a hardening requirement.

## Evidence boundary

Local Worker, D1, R2, browser, and unit-test evidence proves the local path.
It does not prove Dodo production behavior, DNS, hosted routing, human
moderation, or deployed concurrency.
