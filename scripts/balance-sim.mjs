// Headless balance simulator (spec §45.1). Bundles the real generator and
// ballistic resolver with esbuild, then fires sampled aim distributions at the
// intact founder fortress to report hit economics and expected reign pace.
import { build } from "esbuild";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "siegeme-sim-"));
const outfile = path.join(tmp, "sim.mjs");
await build({
  entryPoints: [new URL("./balance-sim-entry.ts", import.meta.url).pathname],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile,
  logLevel: "silent",
});
try {
  await import(outfile);
} finally {
  await fs.rm(tmp, { recursive: true, force: true });
}
