import { chromium } from "playwright";
import fs from "node:fs/promises";

const baseUrl = process.env.SIEGE_TEST_URL ?? "http://127.0.0.1:5188";
const outputDir = "artifacts/browser-smoke";
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const failures = [];

async function inspectViewport(name, viewport) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1600);

  const initial = JSON.parse(await page.evaluate(() => window.render_game_to_text?.() ?? "{}"));
  const canvas = await page.locator("canvas").boundingBox();
  if (!canvas || canvas.width < 300 || canvas.height < 300) failures.push(`${name}: canvas bounds are invalid`);
  if (initial.mode !== "spectator" || initial.world?.worldVersion !== 1) failures.push(`${name}: Worker-backed spectator snapshot missing`);

  await page.locator(".action-attack").click();
  await page.locator(".sheet-primary").click();
  if (!(await page.locator(".attack-hud").isVisible())) failures.push(`${name}: attack controls did not open`);

  const box = await page.locator("canvas").boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.64);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.68, box.y + box.height * 0.5, { steps: 5 });
    await page.mouse.up();
  }
  await page.waitForTimeout(500);
  const attackState = JSON.parse(await page.evaluate(() => window.render_game_to_text?.() ?? "{}"));
  if (!attackState.attackError) failures.push(`${name}: attack did not surface the authority entitlement boundary`);

  await page.locator(".identity-chip").click();
  if (!(await page.locator(".sheet h2").first().isVisible())) failures.push(`${name}: identity sheet did not open`);
  await page.locator(".sheet-close").click();
  await page.locator(".live-meta button").click();
  if (!(await page.locator(".sheet h2").first().isVisible())) failures.push(`${name}: details sheet did not open`);

  await page.screenshot({ path: `${outputDir}/${name}.png`, fullPage: true });
  await fs.writeFile(`${outputDir}/${name}.json`, JSON.stringify({ initial, attackState, canvas, consoleErrors, pageErrors }, null, 2));
  const unexpectedConsoleErrors = consoleErrors.filter((message) => !message.includes("server responded with a status of 401"));
  if (unexpectedConsoleErrors.length || pageErrors.length) failures.push(`${name}: unexpected browser errors were emitted`);
  await page.close();
}

await inspectViewport("desktop", { width: 1280, height: 720 });
await inspectViewport("mobile", { width: 390, height: 844 });
await browser.close();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("browser smoke passed: desktop and mobile Worker-backed flows");
}
