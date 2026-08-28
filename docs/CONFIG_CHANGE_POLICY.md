# GameConfig change policy

**Status:** repository-local contract, current as of August 28, 2026
**Owner:** Siege Me game team
**Canonical configuration:** `/Users/pranay/Projects/siegeme_game/src/game/config.ts`

## Purpose

`GameConfig` is the shared rules source for client presentation, pure
simulation, and Worker/Durable Object authority. A configuration change must
not silently reinterpret an attack or defense command that was already
accepted under an earlier ruleset.

## Contract

1. Every authoritative world snapshot records `gameConfigVersion`.
2. A new turn reads the active configuration when the turn is claimed.
3. An accepted attack or defense command is validated and resolved by the
   authority using the world snapshot and rules version that accepted it.
4. A command with a stale `expectedWorldVersion` is rejected before it can
   consume an entitlement or mutate state.
5. A rules change increments `GAME_CONFIG_VERSION`, updates the pure-rule
   tests, and records the new version in the release/change log before the
   change is enabled.
6. In-flight turns finish under their accepted rules. The new configuration
   applies to subsequent claims and newly created reign state, not to a
   partially resolved shot.
7. Configuration changes must be backward-readable by the state migration
   path. If a field cannot be defaulted safely, migration must fail closed and
   surface an operator action rather than guessing.

## Required verification for a change

- Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`.
- Run `npm run test:harness` for authority changes.
- Add or update a pure test for the changed rule and a version assertion for
  the public snapshot.
- Check that replay, stale-version rejection, entitlement consumption, and
  archive serialization retain their prior contract.
- Update `docs/WORK_BACKLOG.md` and `docs/THREEJS_ANIMATION_AUDIT.md` when the
  change affects timing, motion, effects, or performance evidence.

## Deliberately open policy decisions

This document defines repository behavior, not the product approval process.
The team still needs to decide who can authorize a live config change, how a
rollback is announced, whether a live reign may ever pin a non-current rules
version, and which audit/analytics record is retained for operator changes.
Those decisions remain in `docs/OPEN_DECISIONS_AND_EXTERNAL_GATES.md` until an
operator and release workflow are approved.
