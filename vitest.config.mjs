import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: { alias: { "@": path.resolve(root, "src") } },
  test: {
    environment: "node",
    // The authority harness boots a real Worker + Durable Object + D1 and runs
    // for about a minute; it runs through `npm run test:authority` instead.
    exclude: ["**/node_modules/**", "cloudflare/test/**"],
  },
});
