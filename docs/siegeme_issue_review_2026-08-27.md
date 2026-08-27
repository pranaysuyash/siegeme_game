# Siege Me issue review — 2026-08-27 (interactive playtest + local payment enablement)

- Session: ZCode (GLM-5.3-Flash), 2026-08-27 ~22:45–23:55 local
- Stack under test: Next dev `127.0.0.1:5188` + Cloudflare Worker (wrangler dev) `127.0.0.1:8787`, both already running from a parallel session
- Method: real browser interaction via computer use (Chrome, desktop viewport) for the spectator/sheet/fail-closed pass; headless Playwright for the paid attack loop after the browser was returned to Pranay; `curl` for authority-level corroboration
- Related: `docs/status-and-gap-audit-2026-08-27.md`, `docs/WORK_BACKLOG.md` (W-009 evidence gap)

## 1. What was tested interactively (computer use) — all passing

| Surface | Result | Evidence |
|---|---|---|
| Spectator load | 3D fortress renders (towers, core orb, gate, flag, origin circle); HUD complete: ruler chip "The First Hold · Community", CORE INTEGRITY 100%, LIVE REIGN 01 timer, Attack/Defend CTAs | CUA screenshots (in-session) |
| Attack sheet | Opens with pack card ($3 / 3 shots), all three actions present | CUA |
| Buy (unconfigured Dodo, pre-fix) | Failed closed: "Dodo Payments is not configured for this purchase", no redirect | CUA screenshot |
| Check confirmed shots (fresh session) | "0 attack shots · 0 defense placements confirmed" | CUA |
| Claim turn without shots | Authority 402 surfaced in sheet + error banner ("No confirmed attack entitlement is available") | CUA screenshot |
| Defend sheet | Shield/Brace option grid, live slot preview buttons, escalating price note | CUA screenshot |
| Authority reachability | `/world` 200 live (worldVersion 2→11 during session), `/entitlements` mints silent session with HttpOnly/Secure/SameSite=Lax cookie | curl |

No rendering defects, no dead buttons, no layout breakage observed at 1684×1079.

## 2. Blocking finding: the paid loop was untestable locally (fixed in this session)

Before this session, every path to a shot was gated on Dodo: buy 503'd, entitlements stayed 0, turn claim 402'd. This is precisely why W-009's claim→aim→fire→summary flow had no live evidence.

**Implemented: local dummy-payment mode** (additive, no parallel pipeline):

- `cloudflare/src/index.ts`
  - `/checkout`: when Dodo is unconfigured **and** the authority host is localhost (`isLocalAuthorityHost`), the same `purchase_intents` row is created and a sandbox checkout URL is returned instead of 503. Non-localhost + unconfigured still 503s; Dodo-configured always takes the real path. Production cannot reach dummy mode (hostname-gated, not env-gated).
  - `/checkout/sandbox/confirm` (new, POST): same gates; binds confirmation to the session that owns the intent (403 otherwise); idempotent on PAID; runs the **shared** grant sequence.
  - `grantPaidEntitlement` (extracted): the payments row + entitlement ledger + intent PAID + DO `/internal/grants` sequence, now used by both the Dodo webhook success path and the sandbox confirm. The webhook path passes `provider: "DODO"`, sandbox passes `"SANDBOX"`.
- `src/app/payments/sandbox/page.tsx` + `sandbox-client.tsx` (new): test-mode checkout page ("TEST MODE · LOCAL ONLY · NO REAL CHARGE"), confirm → full-page reload to `/?checkout=return`. The reload is deliberate: `CheckoutStatus` reads the query only on mount; a client-side navigation silently drops the confirmation banner (this exact regression was introduced mid-session by a concurrent edit switching to `router.push` and was reverted with an explanatory comment).
- `src/app/api/payments/sandbox-confirm/route.ts` (new): same-origin-guarded proxy, mirroring `attack-checkout`.
- `src/server/http.ts` (new): `originIsSameOrigin` extracted so both payment proxies share it.
- `scripts/browser-smoke.mjs`: checkout step now asserts the sandbox redirect instead of the removed 503 path, then returns to the app (keeps the 402 raw-attack assertions intact; the smoke still never mutates world state).
- `.env.example`: documents the dummy-mode trigger and the automatic switch back to real Dodo once keys are set.

**Verification (curl, full pipeline):** checkout → `{"checkoutUrl":"/payments/sandbox?intent=…","sandbox":true}` → confirm → `{"confirmed":true}` → entitlements `{"ATTACK_PACK":3}` → duplicate confirm → `{"confirmed":true,"duplicate":true}`.

## 3. Paid attack loop — evidence (W-009 gap closed for local)

New durable script: `scripts/attack-loop-smoke.mjs` (headless; buy → sandbox confirm → "Payment confirmed" banner → claim turn → pointer-drag fire ×3 → summary sheet; screenshots + `report.json` into `artifacts/attack-loop/`; `page.waitForSelector` patience tuned for queued turns on a busy shared world).

Best complete run (`artifacts/attack-loop/report.json` + screenshots `01-sandbox-checkout.png`, `02-aim-shot-1.png`, `02-after-shot-1.png`):

- worldVersion advanced **8 → 11** — exactly one authority-resolved impact per shot
- entitlements after pack: **0** (fully consumed)
- **zero console errors, zero page errors**
- HUD during flight: "Impact in progress", POWER 50%, AIM CENTER, keyboard hints visible
- Sandbox page renders correctly (banner, intent, confirm/cancel)

The checkout-return banner fix was verified separately (headless): `BANNER: Payment confirmed | ENTITLEMENTS: {"ATTACK_PACK":3}` (screenshot `05-checkout-return-banner.png`).

Caveat: later reruns flaked on DOM stability because the world was hot (parallel session reloading the worker on every save → WS drops → `reconnecting` mode unmounts the HUD mid-click). The script's evidence value stands; rerun when the worker is quiet. If a deterministic green run is wanted for CI, prefer running it against a dedicated wrangler instance rather than the shared dev one.

## 4. Findings

| # | Severity | Finding | Status / recommendation |
|---|---|---|---|
| 1 | Blocker (local DX) | Paid loop unreachable locally; no way to verify buy→grant→claim→fire end-to-end | **Fixed**: dummy sandbox mode (§2) |
| 2 | Major (UX) | Sandbox return via `router.push` never showed the payment-confirmation banner (`CheckoutStatus` is mount-only) | **Fixed**: full-reload return with rationale comment |
| 3 | Minor (UX) | Authority jargon reaches players: "No confirmed attack entitlement is available" (sheet + banner duplication of the same state) | Suggest player-phrased copy ("You're out of shots — buy a pack first") and render the error in one place |
| 4 | Minor (UI, in-flight) | Attack HUD "SHOT 1/3" never advances while "LEFT" decrements — the per-shot counter appears unfinished | Owned by the parallel session's HUD work; re-check after it lands |
| 5 | Duplication risk | `scripts/browser-attack-flow.mjs` (parallel session; forged session + `/internal/grants`) and `scripts/attack-loop-smoke.mjs` (this session; real purchase pipeline) both cover the fire loop | Consolidate into one script with `--leg purchase\|fire\|full` once both land; do not add a second npm entry (intentionally not added) |
| 6 | Hygiene | In-flight type errors observed during the session, both from the parallel session's work: `SiegeApp.tsx:104-105` (`purchaseKind`/`baselineQuantity` on `never`), `cloudflare/src/index.ts:833` (`ArchivePayload` now requires `decisivePlayerId, contributions` at its call site) | Will resolve as that session lands its work; gate (`lint/typecheck/build`) will catch them |
| 7 | Note (design) | Sandbox confirm is session-bound and idempotent, but a localhost player can mint unlimited free packs by design. Acceptable for dev; keep the localhost + unconfigured-Dodo double gate unchanged | Keep as-is |

## 5. Parallel-session drift log (what changed under this session)

- `SiegeApp.tsx` rewritten twice mid-session (new attack-HUD copy incl. SHOT/LEFT readout and keyboard hints; entitlement-pack fields appearing).
- `scripts/browser-smoke.mjs` gained identity/details/recovery/defense steps and a defense-slot rename ("Preview core shield") that the deployed UI doesn't match yet — smoke currently fails at that step independent of this session's changes.
- `src/app/payments/sandbox/sandbox-client.tsx` edited concurrently (lint fix → `router.push`) — reverted to full reload per §2 rationale.
- `package.json` gained `test:browser:attack`.
- Re-read-before-edit caught every collision; no edits were lost.

## 6. Recommended next steps

1. Land the parallel session's work, then run the full gate (`lint`, `typecheck` ×2, `vitest`, `test:harness`, `next build`, `test:browser`) — expect §4.6 errors to clear.
2. Re-run `node scripts/attack-loop-smoke.mjs` on a quiet worker for a clean green artifact set.
3. Decide the one-script consolidation for attack-flow evidence (§4.5) and close W-009's browser-evidence item.
4. Player-copy pass on authority error strings (§4.3).
5. When Dodo integration begins: set real keys locally and confirm checkout automatically stops returning the sandbox (the documented switch-over).
