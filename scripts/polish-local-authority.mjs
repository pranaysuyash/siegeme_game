// An ephemeral, local-only preview using the same Worker/config as the test suite.
// Avoids the Wrangler dev proxy; no production binding or game rule is replaced.
import { createTestHarness } from "wrangler";
import { createServer, createConnection } from "node:net";
import { readFile, readdir } from "node:fs/promises";
import assert from "node:assert/strict";

const harness = createTestHarness({ workers: [{
  configPath: "cloudflare/wrangler.toml",
  secrets: {
    SESSION_SECRET: "polish-local-session-secret-2026-09-05",
    AUTHORITY_INTERNAL_SECRET: "polish-local-internal-secret-2026-09-05",
    DODO_PAYMENTS_API_KEY: "",
    DODO_PAYMENTS_WEBHOOK_KEY: "",
    MODERATOR_SECRET: "polish-local-unused-moderator-secret",
  },
}] });
let server;
async function close() {
  server?.close();
  await harness.close();
  process.exit(0);
}
process.once("SIGINT", () => void close());
process.once("SIGTERM", () => void close());
try {
  const { url } = await harness.listen();
  assert(["127.0.0.1", "localhost"].includes(url.hostname));
  const env = await harness.getWorker().getEnv();
  for (const file of (await readdir("cloudflare/migrations")).filter((name) => name.endsWith(".sql")).sort()) {
    const sql = await readFile(`cloudflare/migrations/${file}`, "utf8");
    for (const statement of sql.split(";").map((part) => part.trim()).filter(Boolean)) await env.DB.prepare(statement).run();
  }
  // Transparent loopback TCP forwarding preserves HTTP and WebSocket semantics.
  server = createServer((client) => {
    const upstream = createConnection({ host: url.hostname, port: Number(url.port) });
    client.pipe(upstream).pipe(client);
    client.on("error", () => upstream.destroy());
    upstream.on("error", () => client.destroy());
    client.on("close", () => upstream.destroy());
  });
  server.on("error", async (error) => { console.error(error.message); await harness.close(); process.exitCode = 1; });
  server.listen(8787, "127.0.0.1", () => console.log("Synthetic Worker preview ready at http://127.0.0.1:8787; state resets on stop. Payments disabled."));
} catch (error) {
  console.error(error);
  await harness.close();
  process.exitCode = 1;
}
