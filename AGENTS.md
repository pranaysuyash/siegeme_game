<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:canonical-doctrine-chain -->
# Canonical agent control-plane (doctrine chain)

This repo's `CLAUDE.md` points here. The authoritative operating doctrine and
approval/stop-condition model live outside this repo:

- Canonical operating doctrine: `/Users/pranay/Projects/OPERATING_DOCTRINE.md` (v8.0)
- Workspace agent rules: `/Users/pranay/Projects/AGENTS.md`
- Project-local generated context: `docs/context/agent-start/SESSION_CONTEXT.md`

Any agent working in this repo must honor the canonical stack above (evidence
tiers, approval/stop gates, single instruction source, no silent "done"). The
Next.js rules block above is auto-managed and must be preserved verbatim.
<!-- END:canonical-doctrine-chain -->
