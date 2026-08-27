# Acceptance Gates

## Product-surface gate
- S03 live screen is dominated by the game world.
- No permanent dashboard panels.
- Attack and Defend are immediately understandable.
- Current ruler identity and Core condition are readable within seconds.
- Secondary detail is in sheets/drawers.

## Procedural-world gate
- No required GLB/model pack is necessary for the first fortress.
- Fortress is built from reusable modules.
- Every persistent destructible component has a semantic ID.
- Same seed/version/snapshot rebuilds the same logical world.
- Destruction does not require persisting every debris transform.

## Physics gate
- Fixed timestep.
- Projectile input is not trusted as damage.
- Client cannot submit arbitrary final damage.
- Server/replay path can validate inputs and outcome.
- Core defeat is atomically committed.

## Payment gate
- Dodo webhook is authoritative for payment completion.
- Webhook processing is idempotent.
- Purchase intent is created before checkout and validated against the payment.
- Signature timestamp freshness and provider payment idempotency are enforced.
- Duplicate webhooks cannot duplicate entitlements.
- Checkout redirect alone does not grant shots/defenses.
- Purchase recovery exists.

## Realtime/concurrency gate
- One active attacker at a time when required.
- Queue/turn expiry handles disconnect.
- Stale world versions are rejected.
- Accepted commands are idempotent and replays return the original result.
- Two clients cannot both claim the same killing blow.
- Spectators receive authoritative world updates.

## Mobile gate
- Core spectator flow works in portrait.
- Aim gesture works with touch.
- Defend placement works with touch.
- No hover-only critical interactions.
- Weak devices can enter reduced graphics mode.

## Safety gate
- Ruler cannot inject HTML/JS/iframes.
- Destination domain is visible.
- URL normalization/checking exists.
- Moderation state exists.
- Public identity is separate from payment identity.

## Visual gate
- Implementation follows procedural art grammar, not ornate concept art.
- Material count is restrained.
- Camera composition is stable across screens.
- Damage state is visible in the world.
- Performance effects degrade gracefully.

## Current local evidence boundary

- Local D1 migrations `0001` through `0008` apply against a fresh persisted
  Wrangler fixture.
- Unit tests, authority smoke, and desktop/mobile browser smoke are run as
  separate evidence classes.
- These local gates do not prove live Dodo credentials, DNS, hosted routing,
  human moderation, or production concurrency.
