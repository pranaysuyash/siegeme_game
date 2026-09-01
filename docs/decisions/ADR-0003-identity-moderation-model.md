# ADR-0003: Identity moderation model — verify-then-automate with reactive ban

Status: proposed (awaiting operator sign-off on two policy calls)
Date: 2026-08-29
Owner: product engineering
Operator directive: "If the submitted name/website etc. is verifiable, automate; if caught later, ban."

## Context

The throne is a paid public billboard. Spec §35.1 lists prohibited content, §55.8 requires only that "unsafe identity **can** be moderated" (a capability, not a pre-publication gate), S40/S41 are listed "As needed / Yes if moderated", and §58.9 names moderation as a mitigation. The parallel session already shipped: fail-closed sanitization (`validatePublicIdentity`), report intake → `moderation_cases` + audit, moderator case resolution, and one-click identity disable that clears `state.ruler` and broadcasts `identity_disabled`.

### Genre research

- **Linktree (mature genre player):** publishes *channels and principles*, not mechanisms — a trust center with category-routed report forms (safety / appeals / IP / support), an appeals flow, a transparency report, and a law-enforcement access policy. Enforcement wording is "we review all reports and take action as necessary." No mechanism details, no SLAs — privacy of detection internals is itself the genre norm (anti-evasion). Industry-standard mechanics under the hood: URL reputation scanning at add-time, periodic re-scans, enforcement ladder (disable link → suspend → ban). *(Source: linktr.ee/s/about/trust-center/report.)*
- **The Million Dollar Homepage (founding cautionary tale):** self-submitted ads, no registration, no moderation, no recourse. Outcome per Wikipedia: an "advertising badlands" (spam/casino/loan ads beside major brands), a DDoS extortion attack with no response lever, and ~40% link rot by 2019 that destroyed most of the asset's value. Lessons: (a) no controls = no recourse; (b) sold URLs **must be re-checked over time or the surface rots**; (c) enforcement absence compounds — the operator ends up owning everything published. *(Source: en.wikipedia.org/wiki/The_Million_Dollar_Homepage.)*
- **outbid.lol (direct genre peer):** unfetchable — Vercel Security Checkpoint blocks automated inspection. Listed as unverifiable rather than guessed at.
- **SiliconCity.lol (spec §3.5):** constrained identity grammar, unconstrained generation became incoherent — Siege Me already applies this (fixed identity schema).

### Field-by-field verifiability (the operator's rule applied)

| Field | Mandatory | Verifiable externally? | Automation consequence |
|---|---|---|---|
| destination_url | optional | **Yes — liveness, reputation feeds (Safe Browsing/URLhaus), later ownership via DNS TXT (S39)** | Pre-publish verification gate + cron re-scan |
| display_name | yes | No (free text; no ground truth) | Sanitize-only; reactive ban; impersonation mechanically resolvable once S39 lands |
| identity_type | yes | Trivially (closed enum) | Already automated |
| message | optional | No | Sanitize-only; reactive |
| logo | optional | Partially (binary sanitation done; content needs provider) | Sanitize-only now; W-066 deferrable |

## Decision

Six-layer model — four layers already exist, two are added by this ADR:

1. **Input validation** — HAVE (`validatePublicIdentity`).
2. **Publish-time URL verification** — ADD: every submitted `destination_url` is liveness-checked (HTTPS GET resolves and serves) and reputation-checked (Safe Browsing Lookup; URLhaus as secondary) inside the coronation window. Clean → instant APPROVED (no human, no queue). Flagged → rejected at submit; the conqueror fixes the URL and resubmits. Provider unavailable → reject with "verification unavailable, try again" (fail-closed, spec §35.2; the 120s window makes retry painless).
3. **Ongoing re-scan** — ADD: the existing 5-minute reconciliation cron re-checks the live ruler's URL (one URL; trivial quota). Later detection → automatic identity DISABLE (existing path) + operator-notified case. This is the structural fix for the MDM link-rot/extention outcome — we own the runtime, so published URLs stay policed.
4. **Reactive intake** — HAVE (report UI → cases → audit).
5. **Enforcement ladder** — ADD the ban rung: disable-identity exists; **ban** = `players.status='BANNED'` + `sessionFor` refuses banned players on every surface + remaining entitlements revoked via the existing revoke route + owned identity disabled. All audit-trailed. A ban forfeits unused paid entitlements (fraud forfeits — operator-callable exception).
6. **Governance surface** — ADD ToS section: prohibited-content categories enumerated from spec §35.1, enforcement ladder (disable → ban) and the appeals route named. Genre norm: publish *channels and principles*, keep detection internals private.

**Impersonation posture:** reactive ban now; the mechanical fix (S39 domain-ownership verification → name↔domain comparison) is documented as the phase-2 impersonation killer, deliberately deferred per spec.

## Alternatives rejected

- **Full pre-approval pipeline (universal PENDING):** stalls the single-world game on moderator SLA, kills the publish-instantly incentive at the game's peak moment, and has no staff behind it. The 120s fallback identity makes it *survivable*, not *good*. Deferred until volume or abuse data justifies it.
- **Pure status quo (reactive only):** the MDM lesson — the money surface with no pre-checks invites the badlands outcome, and "we do nothing until reported" weakens the W-057 Dodo approval story. The URL gate + cron re-scan is what makes "automated, audited, enforced" a true statement to the processor.

## Validation and falsifier

- Harness e2e (Tier 3, real DO+D1): URL gate pass → live; flagged URL → 422 with retry; provider error → fail-closed reject; ban → session refused, entitlements revoked, identity disabled, audit rows written; cron re-scan flags a live ruler URL that later lands on a reputation list.
- Falsifier: if Safe Browsing proves unavailable at integration time under acceptable terms, substitute URLhaus/PhishTank primary — the gate contract (`UrlSafetyProvider`) is unchanged.

## Risks

- Safe Browsing quota/outage → fail-closed reject inside coronation; retry is free (120s window). False-positive URL rejections cost the conqueror a resubmit, not money.
- Re-scan false positive on a legitimate live ruler → identity auto-disables; operator case opens via cron notification and can restore (identity re-approve action to be added with the gate).
- Ban without appeal channel (no email collected; recovery codes die with the ban) → accepted limitation; audit trail is the appeal record.

## Rollover

ToS prohibited-content section (layer 6) requires the W-060 legal review to finalise wording; the code-side gate, re-scan, and ban path are independent of that wording and can land first.
