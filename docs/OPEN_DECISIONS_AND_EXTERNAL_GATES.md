# Siege Me open decisions and external gates

**Status:** current as of August 28, 2026
**Owner:** Siege Me game team
**Source of truth:** this document plus `docs/WORK_BACKLOG.md`; historical audits remain provenance, not current status

This record separates work that can be completed in the repository from work
that requires a product decision, external account, provider, legal review,
human operator, or real device. No item below is silently treated as done by a
passing local test.

## Decisions that change product behavior

| Decision | Current local baseline | Decision needed | Consequence |
|---|---|---|---|
| Choreography budget | Flight presentation is bounded to 0.85–2.4 seconds, with recoil, impact ring, rubble, and readable result | Keep responsive prototype timing or adopt the stated typical 3–5 second sequence | Changes turn throughput, queue wait perception, camera handoff, mobile motion, and audio duration |
| Brace semantics | A BRACE attaches to the first damaged/critical component and is itself hittable | Confirm this rule or require player-selected structural attachment | Changes placement UX, collision anchors, and defense fairness |
| Mobile composition | Attack-mode camera preset exists; spectator launcher crop is preserved as an open observation | Decide whether every mode must keep the launcher visible | Changes camera presets and portrait layout acceptance |
| Queue protocol | Public polling promotes queued players; no private ready event or leave/cancel protocol | Accept polling for launch or add a private event and cancellation semantics | Changes WebSocket contract and retry behavior |
| First-world ownership | Durable Object seeds the founder reign on first boot | Choose operator-seeded launch or public first-claim event | Changes bootstrap authorization and launch runbook |
| Asset source | Procedural geometry is canonical and versioned | Keep procedural launch source or approve authored GLTF pipeline | Changes licensing, loader, rig, collision, and performance contracts |
| Audio policy | One shared synthesized impact context with persisted effects volume/mute | Decide category mixer, autoplay recovery, reduced-motion audio policy, and settings scope | Changes UX, browser/device verification, and content budget |
| Currency | Purchase intents currently use USD minor units | Decide supported currencies, FX source, rounding, and display rules | Changes checkout verification, price ladder, accounting, and legal copy |
| Recovery channel | Shipped single-use recovery code is hashed in D1 and expires after 30 days | Keep code recovery or adopt email magic links | Changes provider, account recovery, privacy, and abuse controls |

## Repository-local work still requiring explicit implementation or stronger proof

These items are not blocked by an external API, but the current pass did not
claim them complete:

- Identity submission now has a phase preflight and remains authority-gated for
  coronation, so active-reign requests do not create approved orphan ledger
  rows. Add identity-lock and administrative disable behavior that updates the
  public identity ledger and active/history projections atomically; the
  operator disable policy is still open.
- Replace first-boot founder seeding with an authenticated operator bootstrap
  or a reviewed wrangler procedure after the launch-owner decision is made.
- Add a clean resettable browser fixture for defense visibility, persistence,
  conquest race, and multiplayer checks. The current two-context script proves
  active/queued/promotion only against an attackable shared runtime.
- Extend the property matrix to cover all authoritative state invariants,
  Durable Object restart/reconstruction, 100+ event sequences, WebSocket
  reconnect churn, timeout fallback without wall-clock waits, and race ordering.
- Expand mobile E2E to portrait/landscape attack mode, pointer cancel,
  background/resume, checkout return, and testable WebGL context loss.
- Add collapse-cycle and staged-destruction performance samples. The current
  debris transform is bounded and instanced, but dust/smoke and staged collapse
  remain a design choice.
- Complete normalized image resize/re-encoding after selecting a Worker-safe
  decoder. Current upload sanitation validates signatures/dimensions and strips
  metadata where supported; it does not claim pixel normalization.
- Add share-card generation only after the card dimensions, asset source, and
  social-copy decision are approved.

## External, provider, legal, or operator gates

These are intentionally not executed by a repository-only agent:

- Obtain written approval from Dodo for the exact paid mechanic, configure live
  products and webhook secrets, and verify live checkout, confirmation,
  refunds, unused-entitlement revocation, and chargebacks.
- Perform Cloudflare production cutover: remote D1 migrations, R2 policy,
  Worker deployment, secrets, DNS/TLS/routes, CDN/WAF, spend alerts, rollback,
  error monitoring, and hosted smoke.
- Select and approve URL reputation, text moderation, and image moderation
  providers. Define default-deny behavior, retention, human review, rejection,
  appeals, impersonation, operator access, and incident handling.
- Complete legal review of Terms, Privacy, consumer-rights treatment,
  trademark status, public identity claims, multi-currency, and payment
  disclosure.
- Run real-device GPU, touch, audio autoplay, screen-reader, forced-colors,
  and assistive-technology validation across supported iPhone, Android, and
  desktop browser versions.
- Choose and integrate consent-aware analytics and notifications only after the
  data map, retention, rate limits, and provider contracts are approved.

## Evidence needed before launch claims

The following evidence tiers remain distinct:

1. Static and unit/property tests prove code contracts and deterministic pure
   rules.
2. The Wrangler harness proves local Worker/DO/D1 transaction behavior.
3. Browser scripts prove local rendered routes and synthetic interactions.
4. Hosted and real-device runs prove deployment, browser/device, and provider
   boundaries.
5. Human moderation, legal, provider approval, and production operations are
   separate gates that code and local tests cannot substitute for.

The current repository has evidence through local browser scripts and a local
authority harness, but not through hosted, real-device, provider, legal,
moderation, or production-load evidence.
