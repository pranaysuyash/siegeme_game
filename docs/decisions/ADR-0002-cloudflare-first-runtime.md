# ADR-0002: Cloudflare-first authority and low-cost storage

Status: active
Date: 2026-08-27
Owner: product engineering

## Decision

Use Cloudflare as the game authority and storage layer. The Next.js shell may
deploy to Vercel or Cloudflare Pages, but it must call the Cloudflare authority
for live world state and gameplay mutations.

The authority is one named `SiegeWorld` Durable Object for the canonical id
`global-throne-v1`. It stores the versioned live world snapshot, live
entitlements, event sequence, and spectator WebSockets, and serializes attacks,
defense changes, and succession decisions.

D1 is required for the durable queryable ledger: silent player identity
presence, public identity records, Dodo webhook idempotency, payment records,
entitlement history, and reign archives. D1 records and recovers facts, but it
does not decide live throne ownership, Core state, turns, or victory. R2 is the
object store for logos, avatars, share cards, and replay blobs. KV and Queues
remain optional caches and background workflows, never live authority.

## Why not Supabase

Supabase is a valid general-purpose Postgres platform, but it is not required
for the global-throne problem. A single Durable Object provides the required
single-writer coordination, durable storage, and a natural home for spectator
WebSockets with fewer moving parts at launch. Removing Supabase also avoids a
second provider for state that Cloudflare already owns.

## Cost and safety boundary

Cloudflare free usage can be sufficient for early traffic, but the product
must still configure usage limits, rate limiting, abuse protection, and spend
alerts. The target is near-zero infrastructure cost at low traffic, not an
unconditional zero-cost promise.

Dodo remains the payment processor. The game stores only provider identifiers,
verified payment status, finite entitlement balances, and the minimum public
identity fields needed for the ruler sheet. It must not store card numbers or
copy unnecessary billing details. Public identity fields require validation,
moderation, consent, retention, and deletion paths before launch.

## Consequences

- The client has no local-world fallback and displays an explicit unavailable state when the authority is missing.
- Spectators receive a silent signed player session without a login wall; the
  session cookie is HttpOnly, Secure, SameSite=Lax, and opaque to the client.
- Paid attack requests are rejected until authentication and a Dodo-confirmed entitlement are available.
- Vercel remains an acceptable presentation host because the authority boundary is an HTTP contract, not a provider lock-in.
- The Cloudflare Worker owns Dodo verification, D1 idempotency, and the
  authenticated player boundary before public checkout is enabled.

## Evidence and revisit trigger

Wrangler dry-run must prove the Worker bundle, D1 binding, R2 binding, and
`SiegeWorld` Durable Object binding. The local Worker must prove durable
initialization of `global-throne-v1`, signed session issuance, entitlement
rejection, and a WebSocket snapshot. Revisit the split only after measuring
snapshot size, player-record volume, query needs, and concurrency.
