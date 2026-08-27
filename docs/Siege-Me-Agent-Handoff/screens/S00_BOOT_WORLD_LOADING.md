# S00 — Boot / World Loading

## Purpose
Hide initialization complexity while establishing Siege Me's tone and guaranteeing the game does not become interactive until a valid world snapshot and renderer/physics context are ready.

## Entry
- initial page load;
- hard refresh;
- recovery requiring complete world reconstruction.

## Required behavior
1. Start application configuration validation.
2. Probe WebGL/device capability.
3. Fetch canonical current-reign/world snapshot.
4. Initialize R3F/Three renderer.
5. Initialize Rapier.
6. Build semantic procedural world from snapshot/seed/version.
7. Prepare realtime subscription.
8. Only then transition to S02 or S03.

## Visual implementation
Production may:
- show a lightweight branded static fallback while WebGL initializes;
- progressively reveal the actual procedural world once available;
- overlay loading UI in DOM.

Do not require separate ornate loading artwork.

## DOM components
- Siege Me mark
- loading title
- concise current step
- optional progress indicator
- optional retry only after actual failure/timeout

## Suggested step labels
- Connecting
- Loading world
- Building fortress
- Preparing physics
- Joining live siege

Never display fake progress if exact progress cannot be measured; use indeterminate states.

## Exit
- S02 if no active ruler/reign;
- S03 if an active reign exists;
- S43 if renderer unsupported;
- S44 if reduced mode is required;
- recoverable error state if network/server fails.

## Must not show
- Attack/Defend
- ruler HUD before ruler is known
- fabricated Core %
- full history
- payment
