# Architecture & Player Identity Correction

This document supersedes any earlier Supabase-centric or mandatory-login interpretation.

## 1. Backend architecture is Cloudflare-first

### Canonical live authority
Use **one named Cloudflare Durable Object** as the authoritative source of truth for the one global Siege Me world.

Recommended:
- Durable Object class: `SiegeWorld`
- Object name/id: `global-throne-v1`

The Durable Object owns all concurrency-sensitive live state:
- current reign
- current ruler
- current public identity reference/snapshot
- Core Integrity
- persistent fortress component state
- active shields/braces
- attack queue
- active turn
- remaining live attack/defense entitlements
- Siege Charge
- Royal Guard Charge
- world-state version
- live event sequence
- defeat/succession state
- connected spectators/players via WebSockets

Do not use D1 to arbitrate live ownership, turn order, Core damage, or victory.

### Realtime
Use **Durable Object WebSockets**, preferably the Hibernation API.

All spectators/players for the single global throne connect to the same `SiegeWorld` object.

The Durable Object serializes:
- attack commands
- defense placements
- entitlement consumption
- defeat
- succession

### D1
Use **Cloudflare D1** for durable/queryable ledger and history:
- verified Dodo webhook events
- payment records
- idempotency records
- public identity metadata
- entitlement ledger
- reign archive
- historical contribution records
- moderation cases
- recovery/reconciliation records
- audit/history data

D1 is not the authority for the current live throne.

### R2
Use **Cloudflare R2** for blobs:
- normalized ruler logos/avatars
- share-card renders if persisted
- moderation evidence where needed
- optional replay/diagnostic blobs later

### KV
KV is optional for non-authoritative cache/config only.

Never use KV for:
- current ruler
- Core HP
- live entitlements
- queue/turn ownership
- victory/succession

### Queues
Cloudflare Queues are optional for:
- archival
- retryable payment→world entitlement grant
- analytics fan-out
- moderation work
- background reconciliation

## 2. Player identity is required technically, but login is not required

Do not interpret “player auth required” as “build signup/login before gameplay.”

### Spectator
No login required.

### First meaningful interaction
The Cloudflare Worker silently creates a stable internal player identity:
- `player_id`
- signed opaque session token/cookie

Preferred browser mechanism:
- secure
- HttpOnly
- SameSite=Lax where same-origin permits

The player sees no signup UI.

### Attack/defend purchase
When checkout is created:
- ensure `player_id` exists
- correlate Dodo checkout/payment with that internal player
- verified Dodo webhook is the only authority that payment succeeded
- D1 records the payment/idempotency ledger
- Worker sends an idempotent entitlement grant to `SiegeWorld`
- Durable Object persists the live entitlement

The client must never be able to say “I paid” and mint shots.

### Same-device return
Signed session restores the same `player_id`.

This is sufficient for:
- unused entitlements
- queue state
- contribution tracking
- winning the throne
- ruler actions on the same device

## 3. Progressive identity / recovery

Launch UX should be:

`anonymous spectator`
→ `silent player identity`
→ `paid player`
→ `recoverable identity only when value exists`

Do not force:
- email/password signup
- OAuth
- Clerk/Auth0/Supabase Auth
- social login
- account creation before spectating/attacking

### When recovery becomes valuable
After:
- first meaningful paid purchase, optionally;
- winning the throne, strongly;
- wanting cross-device access;
- enabling under-siege notifications;
- recovering purchases/history.

### Conqueror/ruler
During coronation, strongly prompt or require the player to attach a recoverable identity.

Preferred first recovery method:
- email magic link via a transactional email provider

Possible later:
- passkey
- OAuth
- explicit account linking

No password system is required initially.

## 4. Public identity is separate from player/account identity

The ruler may publicly represent:
- person
- company
- product/app/site
- project/open-source
- creator
- community
- campaign/event
- another moderated identity

The payer/player may be different from the public throne identity.

Internally:
- `player_id` = who controls/paid
- `public_identity_id` = what appears on the throne

Do not conflate them.

## 5. Ruler authorization

Example:
- current reign stores `ruler_player_id`
- player requests defense/reinforcement
- Worker validates session → `player_id`
- Durable Object checks `currentReign.rulerPlayerId === playerId`

No full auth platform is required for this check.

## 6. Cross-device ruler control

A browser-only anonymous cookie is not enough if:
- ruler wins on laptop
- later needs to defend from phone

Therefore:
- same-device ruler control works immediately
- cross-device control requires attached recovery identity
- throne coronation should strongly push recovery setup

## 7. Failure/edge rules

If anonymous player loses browser storage/cookie:
- same-device recovery may be impossible
- do not silently transfer purchases/throne to a new anonymous player
- surface explicit recovery limitations before value becomes material
- payment/recovery support can use provider records only through a deliberate recovery flow

## 8. Cost posture

Cloudflare-first is chosen partly because it maps cleanly to one global authoritative room and should stay inexpensive at launch.

Still implement:
- rate limits
- spend alerts
- WebSocket message bounds
- Hibernation
- bounded D1 writes
- upload limits
- abuse controls
- emergency purchase/gameplay kill switches

Do not optimize for literal zero cost at the expense of reliability during a traffic spike.
