# Siege Me Cloudflare authority

The Next.js app is a client and presentation shell. This Worker owns the
server boundary for the global throne. A named Durable Object serializes access
to the `world:global` snapshot and stores that snapshot in Cloudflare durable
storage.

## Local authority

From the project root:

```sh
npx wrangler dev --config cloudflare/wrangler.toml --local --port 8787
```

Run Next with `SIEGE_AUTHORITY_URL=http://127.0.0.1:8787` so `/api/world`
proxies to the authority. There is no client fallback if the Worker is absent.

## Production shape

- `siegeme.com`: Next.js presentation deployment on Vercel or Cloudflare Pages.
- `api.siegeme.com`: this Worker, routed through Cloudflare.
- Durable Object: global world state, serialized attack/defense/succession transactions, and live spectator fanout.
- Dodo webhook: Worker endpoint, signature verification, idempotent entitlement issuance.
- Additional per-player Durable Objects or D1: only when identity and ledger volume justify the extra surface.

The attack endpoint intentionally returns an error until authentication and a
Dodo-confirmed entitlement are both present. A browser request cannot grant
itself a shot.
