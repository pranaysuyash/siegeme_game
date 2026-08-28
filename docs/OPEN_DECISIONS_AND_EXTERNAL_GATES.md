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
| Queue protocol | Public polling promotes queued players; authoritative turn release now exists; no private ready event remains | Accept polling for launch or add a private ready event | Changes WebSocket contract and retry behavior |
| First-world ownership | One-time authenticated operator bootstrap is implemented; untouched local DOs still expose the founder seed until bootstrap is run | Confirm operator-seeded launch or public first-claim event for production | Changes bootstrap authorization and launch runbook |
| Asset source | Procedural geometry is canonical and versioned | Keep procedural launch source or approve authored GLTF pipeline | Changes licensing, loader, rig, collision, and performance contracts |
| Audio policy | One shared synthesized impact context with persisted effects volume/mute | Decide category mixer, autoplay recovery, reduced-motion audio policy, and settings scope | Changes UX, browser/device verification, and content budget |
| Currency | Purchase intents currently use USD minor units | Decide supported currencies, FX source, rounding, and display rules | Changes checkout verification, price ladder, accounting, and legal copy |
| Recovery channel | Shipped single-use recovery code is hashed in D1 and expires after 30 days | Keep code recovery or adopt email magic links | Changes provider, account recovery, privacy, and abuse controls |

## Repository-local work still requiring explicit implementation or stronger proof

These items are not blocked by an external API. Completed repository work is
listed as locally implemented and tested; the remaining bullets are the
current open implementation or proof boundaries:

- Identity submission has a phase preflight and remains authority-gated for
  coronation. Active-reign requests do not create approved orphan ledger rows.
  Mid-reign identity edits are not exposed; moderator-gated identity disable
  updates D1 and the active public projection through a versioned authority
  event. Human policy and production operator credentials remain external.
- A one-time `POST /internal/bootstrap` transition now initializes an untouched
  world with an operator-selected seed and identity. Production launch still
  needs the ownership decision and deployment runbook execution.
- Add defense-visibility, conquest-race, reconnect, and
  cancellation assertions to the new isolated browser fixture. The current
  isolated runner proves fresh migrations, defense placement/persistence,
  Power Orb and SHIELD target-specific metadata/VFX, original-detail
  flight/impact captures, active/queued/promotion, and the first-shot path;
  BRACE-specific VFX, conquest race, reconnect, and isolated browser
  cancellation remain open. Authority-level turn cancellation is implemented
  and covered by the Worker harness.
  The shared-runtime runner remains useful for smoke only.
- Extend the property matrix beyond the current 256 deterministic world/event
  sequences to cover all authoritative state invariants, WebSocket reconnect
  churn, timeout fallback without wall-clock waits, and race ordering. Durable
  Object eviction/reconstruction is now covered for an active turn by the
  Worker harness, but broader restart scenarios remain.
- Resolve whether BRACE is directly targetable: the current generated brace
  slots are not reachable within the UI/legal `minElevation: 0.5` range, while
  lower-elevation probes can reach them. Choose a config-floor, slot-geometry,
  or intentional non-targetability policy before adding BRACE browser VFX proof.
- Expand mobile E2E to portrait/landscape attack mode, pointer cancel,
  background/resume, checkout return, and testable WebGL context loss. The
  renderer now has local context-loss recovery and diagnostics, but mobile
  device execution remains open.
- Add collapse-cycle and staged-destruction performance samples. The current
  debris transform is bounded and instanced, but dust/smoke and staged collapse
  remain a design choice.
- Complete normalized image resize/re-encoding after selecting a Worker-safe
  decoder. Current upload sanitation validates signatures/dimensions and strips
  metadata where supported; it does not claim pixel normalization.
- Deterministic SVG share-card generation now exists for the current reign and
  archived reigns. Rasterized card storage, authored assets, and final social
  copy remain product/provider decisions.

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
