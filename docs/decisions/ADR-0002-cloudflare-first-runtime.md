# ADR-0002: Cloudflare-first authority and low-cost storage

Status: active
Date: 2026-08-27
Owner: product engineering

## Decision

Use Cloudflare as the game authority and storage layer. The Next.js shell may
deploy to Vercel or Cloudflare Pages, but it must call the Cloudflare authority
for live world state and gameplay mutations.

The first authority is one named Durable Object for `world:global`. It stores
the versioned world snapshot and serializes attacks, defense changes, and
succession decisions. Later, per-player Durable Objects or D1 can hold player
records, public identity submissions, webhook idempotency records, and
entitlement history when volume or query needs justify that split.

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
- Paid attack requests are rejected until authentication and a Dodo-confirmed entitlement are available.
- Vercel remains an acceptable presentation host because the authority boundary is an HTTP contract, not a provider lock-in.
- The Cloudflare Worker needs a durable webhook/idempotency ledger and authenticated player boundary before public checkout is enabled.

## Evidence and revisit trigger

Wrangler dry-run currently proves the Worker bundle and Durable Object binding.
The local Worker proves durable initialization of `world:global`. Revisit the
storage split after measuring snapshot size, player-record volume, query needs,
and concurrency. Do not add D1 merely for symmetry if Durable Object storage
continues to satisfy the measured workload.
