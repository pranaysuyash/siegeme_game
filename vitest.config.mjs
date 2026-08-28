import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: { alias: { "@": path.resolve(root, "src") } },
  test: {
    environment: "node",
    // The authority harness boots a real Worker + Durable Object + D1 and runs
    // through `npm run test:harness` (not `npm run test:authority`, which is a
    // separate Playwright/node script).
    exclude: ["**/node_modules/**", "cloudflare/test/**"],
  },
});
