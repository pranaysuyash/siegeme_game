# Non-Visual Game / System Component Inventory

- Current reign
- Ruler/public identity
- World generator version
- World-state version
- Core Integrity
- Structural component health/state
- Active shields
- Active braces
- Attacker queue
- Current active turn
- Attack entitlement
- Defense entitlement
- Projectile definition registry
- Defense-resource definition registry
- Damage resolver
- Collapse resolver
- Component dependency/support rules
- Siege Charge
- Royal Guard Charge
- Reinforcement escalation
- Succession resolver
- Contribution scoring
- Reign archive/history
- Event log
- Dodo payment record
- Entitlement issuance/reconciliation
- Public identity moderation state
- Public identity verification state
- Realtime event stream
- Spectator session
- Replay/verification record
- Anti-cheat risk score
- Client performance capability
- Graphics-quality mode
- Connection/recovery state

The WebGL renderer is a view of this state, not the source of truth.


## Cloudflare mapping
- `SiegeWorld` Durable Object: current reign/world/queue/turns/live entitlement consumption/succession/WebSockets
- D1: payments, idempotency, identity metadata, historical/archive/audit data
- R2: logos/avatars/share/replay blobs
- KV: optional non-authoritative cache/config only
- Queue: optional archival/retry/background processing
