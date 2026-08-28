import { chromium } from "playwright";
import fs from "node:fs/promises";

const baseUrl = process.env.SIEGE_TEST_URL ?? "http://127.0.0.1:5188";
const outputDir = process.env.SIEGE_PREFERENCE_OUTPUT_DIR ?? "artifacts/browser-preferences";
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const cases = [
  { name: "desktop-normal", viewport: { width: 1280, height: 720 }, reducedMotion: "no-preference" },
  { name: "desktop-reduced-motion", viewport: { width: 1280, height: 720 }, reducedMotion: "reduce" },
  { name: "mobile-reduced-motion", viewport: { width: 390, height: 844 }, reducedMotion: "reduce" },
];
const failures = [];

for (const testCase of cases) {
  const page = await browser.newPage({ viewport: testCase.viewport, reducedMotion: testCase.reducedMotion });
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => {
    try { return Boolean(JSON.parse(window.render_game_to_text?.() ?? "{}").world?.worldVersion); } catch { return false; }
  }, { timeout: 15000 });
  await page.waitForFunction(() => Boolean(window.__THREE_GAME_DIAGNOSTICS__), { timeout: 15000 });
  const state = JSON.parse(await page.evaluate(() => window.render_game_to_text?.() ?? "{}"));
  if (state.mode !== "spectator") failures.push(`${testCase.name}: did not reach spectator mode`);
  const diagnostics = await page.evaluate(() => {
    const current = window.__THREE_GAME_DIAGNOSTICS__;
    return current ? { graphics: current.graphics ?? null, contextLost: current.contextLost ?? false, camera: current.camera ? { fov: current.camera.fov } : null } : null;
  });
  if (!diagnostics) failures.push(`${testCase.name}: renderer diagnostics unavailable`);

  const attackAction = page.getByRole("button", { name: /^Attack\b/i });
  const attackAvailable = await attackAction.count() > 0;
  let keyboardHelp = false;
  let protectedNotice = false;
  if (attackAvailable) {
    await attackAction.click({ force: true });
    await page.locator(".sheet").waitFor({ state: "attached", timeout: 10_000 });
    keyboardHelp = await page.locator(".sheet").getByText(/Keyboard controls:/).count() > 0;
    if (!keyboardHelp) failures.push(`${testCase.name}: attack keyboard help is not discoverable`);
    await page.getByRole("button", { name: "Close" }).click().catch(() => {});
  } else {
    protectedNotice = await page.locator(".protection-notice").isVisible().catch(() => false);
    if (!protectedNotice) failures.push(`${testCase.name}: attack was unavailable without a protection notice`);
  }
  await page.getByRole("button", { name: "Open siege details" }).click();
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("button", { name: "How the siege works" }).click();
  const audioControl = await page.locator(".audio-controls input[type=range]").isVisible().catch(() => false);
  if (!audioControl) failures.push(`${testCase.name}: persisted audio control is not visible`);
  await page.getByRole("button", { name: "Close" }).click();
  await page.screenshot({ path: `${outputDir}/${testCase.name}.png`, fullPage: true });
  await fs.writeFile(`${outputDir}/${testCase.name}.json`, JSON.stringify({ ...testCase, state, diagnostics, attackAvailable, keyboardHelp, protectedNotice, audioControl, consoleErrors, pageErrors }, null, 2));
  const unexpected = consoleErrors.filter((message) => !message.includes("status of 401") && !message.includes("status of 402") && !message.includes("status of 503"));
  if (unexpected.length || pageErrors.length) failures.push(`${testCase.name}: unexpected browser errors`);
  await page.close();
}

await browser.close();
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("browser preference smoke passed: normal/reduced-motion desktop and mobile surfaces");
}
