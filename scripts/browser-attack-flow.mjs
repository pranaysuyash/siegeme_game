// Browser-driven paid attack flow e2e (S17/S18 UI loop).
// Requires a running local stack: authority on :8787 (npm run authority:dev
// with the standard local dev secrets) and Next on :5188 (npm run build &&
// npx next start -p 5188).
//
// Flow: known-player session cookie -> grant 3 shots via the internal grants
// route -> Attack sheet -> claim turn -> drag-release fire -> impact ->
// "fire next shot" re-arm twice -> pack exhausted -> S18 summary sheet.
import { chromium } from "playwright";
import crypto from "node:crypto";
import fs from "node:fs/promises";

const baseUrl = process.env.SIEGE_TEST_URL ?? "http://127.0.0.1:5188";
const authorityUrl = process.env.SIEGE_AUTHORITY_TEST_URL ?? "http://127.0.0.1:8787";
const sessionSecret = process.env.SIEGE_TEST_SESSION_SECRET ?? "local-session-secret-change-me";
const internalSecret = process.env.SIEGE_TEST_INTERNAL_SECRET ?? "local-authority-secret-change-me";
const playerId = `e2e-attack-${crypto.randomUUID().slice(0, 8)}`;
const outputDir = "artifacts/browser-attack-flow";

function b64url(value) {
  return Buffer.from(value).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function sign(payload) {
  return b64url(crypto.createHmac("sha256", sessionSecret).update(payload).digest());
}

// Mirrors cloudflare/src/session.ts: "v1.<claims>.<hmac>".
function sessionToken() {
  const payload = b64url(JSON.stringify({ playerId, issuedAt: Date.now(), expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 }));
  return `v1.${payload}.${sign(`v1.${payload}`)}`;
}

async function grantAttackShots(quantity) {
  const response = await fetch(new URL("/internal/grants", authorityUrl), {
    method: "POST",
    headers: { "content-type": "application/json", "x-authority-secret": internalSecret },
    body: JSON.stringify({ grantId: `e2e-flow:${playerId}:${crypto.randomUUID()}`, playerId, kind: "ATTACK_PACK", quantity }),
  });
  if (!response.ok) throw new Error(`Grant failed: ${response.status} ${await response.text()}`);
}

async function gameText(page) {
  return JSON.parse(await page.evaluate(() => window.render_game_to_text?.() ?? "{}"));
}

async function waitForMode(page, mode, timeout = 20000) {
  await page.waitForFunction((expected) => {
    try { return JSON.parse(window.render_game_to_text?.() ?? "{}").mode === expected; } catch { return false; }
  }, mode, { timeout });
}

const failures = [];
await fs.mkdir(outputDir, { recursive: true });

let browser;
try {
  await grantAttackShots(3);
} catch (error) {
  console.error(`authority unreachable or grant rejected: ${error.message}`);
  console.error("Start the stack first: npm run authority:dev (with the local dev secrets) and npx next start -p 5188.");
  process.exit(1);
}

try {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await context.addCookies([{ name: "siegeme_session", value: sessionToken(), url: baseUrl, httpOnly: true, secure: true, sameSite: "Lax" }]);
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => {
    try { return Boolean(JSON.parse(window.render_game_to_text?.() ?? "{}").world?.worldVersion); } catch { return false; }
  }, { timeout: 15000 });
  await waitForMode(page, "spectator");
  const initial = await gameText(page);
  if (initial.mode !== "spectator") failures.push(`expected spectator boot, got ${initial.mode}`);

  // Open the attack sheet and claim a live turn with the granted pack.
  await page.locator(".action-attack").click();
  await page.getByRole("button", { name: /claim turn/i }).click();
  await waitForMode(page, "attack-aim");

  // Drag back and release to fire (pointer capture drives yaw/elevation/power).
  async function dragFire() {
    const canvas = await page.locator("canvas").boundingBox();
    const x = canvas.x + canvas.width / 2;
    const y = canvas.y + canvas.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 140, y - 90, { steps: 8 });
    await page.mouse.up();
    await waitForMode(page, "attack-flight");
    await waitForMode(page, "spectator");
    await page.waitForTimeout(400);
  }

  await dragFire();
  let state = await gameText(page);
  if (!state.lastResult) failures.push("no impact result after first shot");
  const rearm = page.getByRole("button", { name: /fire next shot/i });
  if (!(await rearm.isVisible())) failures.push("between-shots re-arm affordance missing after first impact");

  await rearm.click();
  await waitForMode(page, "attack-aim");
  await dragFire();
  state = await gameText(page);
  if (!state.lastResult) failures.push("no impact result after second shot");

  await page.getByRole("button", { name: /fire next shot/i }).click();
  await waitForMode(page, "attack-aim");
  await dragFire();

  // Pack spent: the S18 summary sheet appears with the full shot record.
  await page.locator(".sheet", { hasText: "Your shots are spent" }).waitFor({ timeout: 10000 });
  const sheetText = await page.locator(".sheet").innerText();
  if (!sheetText.includes("3") || !sheetText.toLowerCase().includes("shots fired")) failures.push("summary sheet did not report 3 shots fired");
  if (!sheetText.toLowerCase().includes("shot record")) failures.push("summary sheet missing the shot record list");

  await page.screenshot({ path: `${outputDir}/attack-flow-summary.png`, fullPage: true });
  await fs.writeFile(`${outputDir}/attack-flow.json`, JSON.stringify({ playerId, initial, finalState: await gameText(page), failures }, null, 2));
} catch (error) {
  failures.push(`unexpected: ${error.message}`);
} finally {
  await browser?.close();
  if (process.env.SIEGE_TEST_CLEANUP !== "0") {
    await fetch(new URL("/turn/cancel", authorityUrl), { method: "POST", headers: { Cookie: `siegeme_session=${sessionToken()}` } }).catch(() => {});
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("browser attack flow passed: claim, drag-fire, re-arm x3, summary sheet");
}
