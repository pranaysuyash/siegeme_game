import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// Dedicated config for the authority harness: it boots a real Worker +
// Durable Object + D1 and is excluded from the default fast unit run
// (`npm test`). Run it with `npm run test:harness`.
export default defineConfig({
  resolve: { alias: { "@": path.resolve(root, "src") } },
  test: {
    environment: "node",
    include: ["cloudflare/test/**/*.test.ts"],
    testTimeout: 180_000,
    hookTimeout: 180_000,
  },
});
