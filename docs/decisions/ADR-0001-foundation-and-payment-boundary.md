# ADR-0001: Cloudflare authority, procedural world, and payment boundary

Status: active
Date: 2026-08-27
Owner: product engineering

## Context

The live checkout contained the Siege Me handoff kit but no application code. The handoff makes S00 -> S02/S03 and the procedural world the first implementation objective, while requiring Dodo webhook confirmation to be authoritative for gameplay entitlements. The product also needs one serialized global throne, not a collection of stateless request handlers.

## Decision

Build a Next.js App Router shell with a single client canvas, a domain-independent semantic world snapshot, a deterministic procedural fortress generator, Zustand for ephemeral UI/action state, and Rapier initialized at a fixed 1/60 timestep. Use a Cloudflare Durable Object named for `world:global` as the authority boundary, with durable storage for the versioned snapshot. The client submits attack intent only. Dodo routes fail closed until authentication, entitlement persistence, webhook signature verification, and idempotent issuance exist.

The public brand configuration has one owner at `src/config.ts`. The domain is `siegeme.com`. The initial seed is created inside the authority when its Durable Object first boots. The Next client has no local-world fallback.

## Alternatives considered

- Static concept-art background: rejected because the handoff requires the actual procedural world and the visual references are mood aids only.
- Client-granted paid shots: rejected because checkout return state is not payment authority.
- Supabase as the primary persistence layer: rejected for this product because Cloudflare Durable Objects provide the required single-writer coordination and durable storage with a smaller launch footprint. D1 can be added for higher-volume ledger and identity history if needed.
- Paid attacks before the authority and entitlement ledger exist: rejected because a browser must never grant itself a shot.

## Validation and falsifier

Typecheck/build must pass, the Cloudflare Worker must dry-run with its Durable Object binding, the browser must show S00 then the server-provided S03 snapshot, and `render_game_to_text` must reflect the visible mode, world version, Core state, and server attack request state. A missing authority must produce an explicit unavailable state, never a substitute client world.

## Risk and revisit trigger

The local Worker currently exposes the initial server-owned snapshot but still rejects attacks until player authentication and Dodo-confirmed entitlements are wired. Do not enable public paid checkout until webhook idempotency, entitlement recovery, rate limiting, and provider approval are verified at Tier 3 or higher.
