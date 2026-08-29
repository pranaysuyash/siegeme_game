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
const mobilePlayerId = `e2e-mobile-attack-${crypto.randomUUID().slice(0, 8)}`;
const landscapePlayerId = `e2e-landscape-attack-${crypto.randomUUID().slice(0, 8)}`;
const outputDir = "artifacts/browser-attack-flow";

function b64url(value) {
  return Buffer.from(value).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function sign(payload) {
  return b64url(crypto.createHmac("sha256", sessionSecret).update(payload).digest());
}

// Mirrors cloudflare/src/session.ts: "v1.<claims>.<hmac>".
function sessionToken(forPlayerId = playerId) {
  const payload = b64url(JSON.stringify({ playerId: forPlayerId, issuedAt: Date.now(), expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 }));
  return `v1.${payload}.${sign(`v1.${payload}`)}`;
}

async function grantAttackShots(quantity, forPlayerId = playerId) {
  const response = await fetch(new URL("/internal/grants", authorityUrl), {
    method: "POST",
    headers: { "content-type": "application/json", "x-authority-secret": internalSecret },
    body: JSON.stringify({ grantId: `e2e-flow:${forPlayerId}:${crypto.randomUUID()}`, playerId: forPlayerId, kind: "ATTACK_PACK", quantity }),
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

async function waitForDragging(page, expected, label) {
  try {
    await page.waitForFunction((value) => JSON.parse(window.render_game_to_text?.() ?? "{}").aim?.isDragging === value, expected, { timeout: 10000 });
  } catch (error) {
    throw new Error(`${label}: ${error.message}; state=${JSON.stringify(await gameText(page))}`);
  }
}

const failures = [];
await fs.mkdir(outputDir, { recursive: true });

let browser;
let mobileContext;
let landscapeContext;
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

  // Verify the active attack composition at the target portrait viewport.
  await grantAttackShots(1, mobilePlayerId);
  mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await mobileContext.addCookies([{ name: "siegeme_session", value: sessionToken(mobilePlayerId), url: baseUrl, httpOnly: true, secure: true, sameSite: "Lax" }]);
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await mobilePage.waitForFunction(() => {
    try { return Boolean(JSON.parse(window.render_game_to_text?.() ?? "{}").world?.worldVersion); } catch { return false; }
  }, { timeout: 15000 });
  await waitForMode(mobilePage, "spectator");
  await mobilePage.locator(".action-attack").click();
  await mobilePage.getByRole("button", { name: /claim turn/i }).click();
  await waitForMode(mobilePage, "attack-aim");
  const mobileLayout = await mobilePage.evaluate(() => {
    const selectors = [".canvas-shell canvas", ".live-meta", ".attack-hud", ".attack-readout", ".attack-cancel"];
    return Object.fromEntries(selectors.map((selector) => {
      const element = document.querySelector(selector);
      if (!element) return [selector, null];
      const rect = element.getBoundingClientRect();
      return [selector, { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height }];
    }));
  });
  const viewport = { width: 390, height: 844 };
  for (const [selector, rect] of Object.entries(mobileLayout)) {
    if (!rect || rect.width <= 0 || rect.height <= 0) failures.push(`mobile attack layout missing ${selector}`);
    else if (rect.left < 0 || rect.top < 0 || rect.right > viewport.width + 1 || rect.bottom > viewport.height + 1) failures.push(`mobile attack layout escapes viewport: ${selector} ${JSON.stringify(rect)}`);
  }
  const mobileState = await gameText(mobilePage);
  if (mobileState.turnStatus !== "active" || mobileState.mode !== "attack-aim") failures.push(`mobile attack mode was not active: ${JSON.stringify(mobileState)}`);
  await mobilePage.screenshot({ path: `${outputDir}/attack-mobile-aim.png`, fullPage: true });
  await fetch(new URL("/turn/cancel", authorityUrl), { method: "POST", headers: { Cookie: `siegeme_session=${sessionToken(mobilePlayerId)}` } });
  await mobileContext.close();
  mobileContext = undefined;

  // Verify landscape composition and interruption-safe transient state.
  await grantAttackShots(1, landscapePlayerId);
  landscapeContext = await browser.newContext({ viewport: { width: 844, height: 390 } });
  await landscapeContext.addCookies([{ name: "siegeme_session", value: sessionToken(landscapePlayerId), url: baseUrl, httpOnly: true, secure: true, sameSite: "Lax" }]);
  const landscapePage = await landscapeContext.newPage();
  await landscapePage.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await landscapePage.waitForFunction(() => {
    try { return Boolean(JSON.parse(window.render_game_to_text?.() ?? "{}").world?.worldVersion); } catch { return false; }
  }, { timeout: 15000 });
  await waitForMode(landscapePage, "spectator");
  await landscapePage.locator(".action-attack").click();
  await landscapePage.getByRole("button", { name: /claim turn/i }).click();
  await waitForMode(landscapePage, "attack-aim");
  const landscapeLayout = await landscapePage.evaluate(() => {
    const selectors = [".canvas-shell canvas", ".live-meta", ".attack-hud", ".attack-readout", ".attack-cancel"];
    return Object.fromEntries(selectors.map((selector) => {
      const element = document.querySelector(selector);
      if (!element) return [selector, null];
      const rect = element.getBoundingClientRect();
      return [selector, { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height }];
    }));
  });
  const landscapeViewport = { width: 844, height: 390 };
  for (const [selector, rect] of Object.entries(landscapeLayout)) {
    if (!rect || rect.width <= 0 || rect.height <= 0) failures.push(`landscape attack layout missing ${selector}`);
    else if (rect.left < 0 || rect.top < 0 || rect.right > landscapeViewport.width + 1 || rect.bottom > landscapeViewport.height + 1) failures.push(`landscape attack layout escapes viewport: ${selector} ${JSON.stringify(rect)}`);
  }
  const landscapeCanvas = landscapePage.locator(".canvas-shell canvas");
  const landscapeBox = await landscapeCanvas.boundingBox();
  if (!landscapeBox) failures.push("landscape attack canvas has no bounds");
  else {
    await landscapePage.mouse.move(landscapeBox.x + landscapeBox.width / 2, landscapeBox.y + landscapeBox.height / 2);
    await landscapePage.mouse.down();
    await waitForDragging(landscapePage, true, "pointer down did not enter dragging");
    await landscapeCanvas.evaluate((element) => element.parentElement?.dispatchEvent(new PointerEvent("pointercancel", { bubbles: true, pointerId: 1 })));
    await waitForDragging(landscapePage, false, "pointercancel did not clear dragging");
    await landscapePage.mouse.up();

    await landscapePage.mouse.down();
    await waitForDragging(landscapePage, true, "second pointer down did not enter dragging");
    await landscapePage.evaluate(() => window.dispatchEvent(new Event("blur")));
    await waitForDragging(landscapePage, false, "window blur did not clear dragging");

    await landscapePage.mouse.down();
    await waitForDragging(landscapePage, true, "third pointer down did not enter dragging");
    await landscapePage.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
    await waitForDragging(landscapePage, false, "visibilitychange did not clear dragging");
    await landscapePage.mouse.up();
  }
  await landscapeCanvas.evaluate((element) => element.dispatchEvent(new Event("webglcontextlost", { cancelable: true })));
  if (!(await landscapePage.locator(".graphics-warning").isVisible())) failures.push("landscape context-loss warning did not appear");
  await landscapeCanvas.evaluate((element) => element.dispatchEvent(new Event("webglcontextrestored")));
  if (await landscapePage.locator(".graphics-warning").isVisible()) failures.push("landscape context-loss warning did not clear after restore");
  const landscapeState = await gameText(landscapePage);
  if (landscapeState.turnStatus !== "active" || landscapeState.mode !== "attack-aim") failures.push(`landscape attack mode was not active after interruption checks: ${JSON.stringify(landscapeState)}`);
  await landscapePage.screenshot({ path: `${outputDir}/attack-landscape-aim.png`, fullPage: true });
  await fetch(new URL("/turn/cancel", authorityUrl), { method: "POST", headers: { Cookie: `siegeme_session=${sessionToken(landscapePlayerId)}` } });
  await landscapeContext.close();
  landscapeContext = undefined;

  await fs.writeFile(`${outputDir}/attack-flow.json`, JSON.stringify({ playerId, mobilePlayerId, landscapePlayerId, initial, finalState: await gameText(page), mobile: { viewport, state: mobileState, layout: mobileLayout }, landscape: { viewport: landscapeViewport, state: landscapeState, layout: landscapeLayout, interruptions: ["pointercancel", "window.blur", "document.visibilitychange", "webglcontextlost", "webglcontextrestored"] }, failures }, null, 2));
} catch (error) {
  failures.push(`unexpected: ${error.message}`);
} finally {
  await mobileContext?.close();
  await landscapeContext?.close();
  await browser?.close();
  if (process.env.SIEGE_TEST_CLEANUP !== "0") {
    await fetch(new URL("/turn/cancel", authorityUrl), { method: "POST", headers: { Cookie: `siegeme_session=${sessionToken()}` } }).catch(() => {});
    await fetch(new URL("/turn/cancel", authorityUrl), { method: "POST", headers: { Cookie: `siegeme_session=${sessionToken(mobilePlayerId)}` } }).catch(() => {});
    await fetch(new URL("/turn/cancel", authorityUrl), { method: "POST", headers: { Cookie: `siegeme_session=${sessionToken(landscapePlayerId)}` } }).catch(() => {});
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("browser attack flow passed: desktop paid loop plus portrait/landscape interruption-safe mobile composition");
}
