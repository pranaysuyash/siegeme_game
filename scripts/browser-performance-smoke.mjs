import { chromium } from "playwright";
import fs from "node:fs/promises";

const baseUrl = process.env.SIEGE_TEST_URL ?? "http://127.0.0.1:5188";
const outputDir = process.env.SIEGE_PERFORMANCE_OUTPUT_DIR ?? "artifacts/browser-performance";
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];
for (const [name, viewport] of [["desktop", { width: 1280, height: 720 }], ["mobile", { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport });
  const benchmarkUrl = new URL(baseUrl);
  benchmarkUrl.searchParams.set("benchmark", "1");
  await page.goto(benchmarkUrl.toString(), { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => {
    try { return Boolean(JSON.parse(window.render_game_to_text?.() ?? "{}").world?.worldVersion); } catch { return false; }
  }, { timeout: 15000 });
  const before = await page.evaluate(() => ({ time: performance.now(), stats: window.__THREE_GAME_DIAGNOSTICS__?.renderer?.render ?? null }));
  await page.waitForTimeout(2000);
  const after = await page.evaluate(() => ({ time: performance.now(), stats: window.__THREE_GAME_DIAGNOSTICS__?.renderer?.render ?? null, memory: performance.memory ? { usedJSHeapSize: performance.memory.usedJSHeapSize, jsHeapSizeLimit: performance.memory.jsHeapSizeLimit } : null }));
  const elapsedSeconds = Math.max(0.001, (after.time - before.time) / 1000);
  const result = { name, viewport, elapsedSeconds, renderCalls: after.stats?.calls ?? null, triangles: after.stats?.triangles ?? null, callsPerSecond: typeof after.stats?.calls === "number" && typeof before.stats?.calls === "number" ? (after.stats.calls - before.stats.calls) / elapsedSeconds : null, memory: after.memory };
  results.push(result);
  await page.close();
}
await browser.close();
await fs.writeFile(`${outputDir}/performance.json`, JSON.stringify({ evidence: "Tier 4 local headless synthetic baseline; not real-device or production performance", results }, null, 2));
if (results.some((result) => result.renderCalls === null || result.triangles === null)) {
  console.error("browser performance smoke failed: renderer diagnostics were unavailable");
  process.exitCode = 1;
} else {
  console.log(`browser performance smoke passed: ${results.map((result) => `${result.name} ${result.triangles} triangles`).join(", ")}`);
}
