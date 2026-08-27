# DOM / UI Component Inventory

The UI must be HTML/DOM/CSS over or around the WebGL canvas unless a world-space element genuinely belongs in 3D.

## Persistent / frequent live-state components
- Product mark
- Ruler identity chip
- Visible destination domain
- Optional verification badge
- Reign timer
- Core Integrity indicator
- Temporary Shield indicator when applicable
- Viewer count where useful
- Attack CTA
- Defend CTA
- Current-attacker chip
- Critical-state indicator
- Details/drawer trigger

## Attack-context components
- Shots remaining
- Current projectile identity
- Power meter
- Aim reticle
- Approximate trajectory preview
- Drag/pull interaction guide
- Cancel shot
- Turn timer
- Breaker/special-shot indicator
- Siege Charge indicator
- Hit feedback
- Structural-hit label
- Core-hit feedback
- Turn result summary

## Defense-context components
- Defense entitlement/inventory
- Shield card
- Brace card
- Valid placement slot
- Placement ghost
- Placement-validity indicator
- Rotate control if required
- Confirm placement
- Royal Guard Charge
- Defense contribution feedback

## Purchase/payment components
- Attack-pack options
- Defense-item options
- Exact price
- Dodo checkout trigger
- Payment pending
- Payment success
- Payment failure
- Entitlement balance
- Purchase recovery

## Public identity components
- Display name
- Identity type
- Logo/avatar
- Destination URL
- Visible destination domain
- One-line message
- Constrained CTA
- Optional social handle
- Verification badge
- Public identity preview

## Coronation components
- Victory banner
- Defeated-ruler summary
- Identity form
- URL metadata suggestion/autofill
- Logo uploader
- CTA selector
- Message character count
- Identity preview
- Initial fortification selector
- Reinforcement price
- Publish/start-reign action
- Protected setup countdown

## History/social components
- Reign summary
- Ruler history card
- Conqueror card
- Siege MVP card
- Royal Guard MVP card
- Attack contribution rows
- Defense contribution rows
- Reign timeline events
- Duration/survival/spectator/activity stats
- Hall of Fame rows
- Share card generator
- Copy/share-link action

## Feedback/system components
- Incoming attack toast
- Component destroyed toast
- Shield destroyed toast
- Core exposed warning
- Core critical warning
- Siege Charge full
- Royal Guard Charge full
- Defender joined
- Attacker queued
- Your turn
- Payment confirmed
- Entitlement granted
- Throne captured
- Dethroned
- Reconnecting
- Stale-world-state warning
- Reduced-performance notice

## UI density invariant

In S03/S04/S05:
- the persistent UI should occupy only a small fraction of attention;
- secondary detail belongs in sheets/drawers;
- do not permanently expose event feed, queue, full health matrix, leaderboards or large profile cards;
- world-state changes should be legible in the 3D world first, with HUD confirmation second.
