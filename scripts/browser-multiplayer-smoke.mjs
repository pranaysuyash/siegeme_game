import { chromium } from "playwright";
import crypto from "node:crypto";
import fs from "node:fs/promises";

const baseUrl = process.env.SIEGE_TEST_URL ?? "http://127.0.0.1:5188";
const authorityUrl = process.env.SIEGE_AUTHORITY_TEST_URL ?? "http://127.0.0.1:8787";
const sessionSecret = process.env.SIEGE_TEST_SESSION_SECRET ?? "local-session-secret-change-me";
const internalSecret = process.env.SIEGE_TEST_INTERNAL_SECRET ?? "local-authority-secret-change-me";
const outputDir = process.env.SIEGE_MULTIPLAYER_OUTPUT_DIR ?? "artifacts/browser-multiplayer";
await fs.mkdir(outputDir, { recursive: true });

function b64url(value) { return Buffer.from(value).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, ""); }
function sessionToken(playerId) {
  const payload = b64url(JSON.stringify({ playerId, issuedAt: Date.now(), expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 }));
  const signature = b64url(crypto.createHmac("sha256", sessionSecret).update(`v1.${payload}`).digest());
  return `v1.${payload}.${signature}`;
}
async function grant(playerId) {
  const response = await fetch(new URL("/internal/grants", authorityUrl), { method: "POST", headers: { "content-type": "application/json", "x-authority-secret": internalSecret }, body: JSON.stringify({ grantId: `multiplayer:${playerId}:${crypto.randomUUID()}`, playerId, kind: "ATTACK_PACK", quantity: 3 }) });
  if (!response.ok) throw new Error(`grant failed: ${response.status} ${await response.text()}`);
}
async function waitMode(page, mode, timeout = 15000) {
  await page.waitForFunction((expected) => { try { return JSON.parse(window.render_game_to_text?.() ?? "{}").mode === expected; } catch { return false; } }, mode, { timeout });
}
async function gameText(page) { return JSON.parse(await page.evaluate(() => window.render_game_to_text?.() ?? "{}")); }

const players = [`multiplayer-${crypto.randomUUID().slice(0, 8)}`, `multiplayer-${crypto.randomUUID().slice(0, 8)}`];
const browser = await chromium.launch({ headless: true });
const contexts = [];
const pages = [];
const failures = [];
try {
  await Promise.all(players.map(grant));
  for (const playerId of players) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    await context.addCookies([{ name: "siegeme_session", value: sessionToken(playerId), url: baseUrl, httpOnly: true, secure: false, sameSite: "Lax" }]);
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => { try { return Boolean(JSON.parse(window.render_game_to_text?.() ?? "{}").world?.worldVersion); } catch { return false; } }, { timeout: 15000 });
    contexts.push(context);
    pages.push(page);
  }

  const initial = await gameText(pages[0]);
  if (initial.world?.phase !== "ACTIVE") throw new Error(`fixture is not ACTIVE: ${initial.world?.phase ?? "unknown"}`);
  if (await pages[0].locator(".action-attack").count() === 0) throw new Error("attack fixture is unavailable, likely because the reign is protected or the shared runtime is not in an attackable state");

  await pages[0].locator(".action-attack").click({ force: true });
  await pages[0].getByRole("button", { name: /claim turn/i }).click();
  await waitMode(pages[0], "attack-aim");
  await pages[1].locator(".action-attack").click({ force: true });
  await pages[1].getByRole("button", { name: /claim turn/i }).click();
  await pages[1].getByText(/Queued for the next live turn/i).waitFor({ timeout: 10000 });

  await pages[0].keyboard.press("Space");
  await waitMode(pages[0], "attack-flight");
  await waitMode(pages[0], "spectator");
  await pages[1].waitForFunction(() => { try { return JSON.parse(window.render_game_to_text?.() ?? "{}").mode === "attack-aim" || JSON.parse(window.render_game_to_text?.() ?? "{}").mode === "attack-requesting"; } catch { return false; } }, { timeout: 10000 });
  const result = { initial, firstPlayer: await gameText(pages[0]), secondPlayer: await gameText(pages[1]), queueText: await pages[1].locator("body").innerText() };
  await fs.writeFile(`${outputDir}/multiplayer.json`, JSON.stringify({ players, result, failures }, null, 2));
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
  await fs.writeFile(`${outputDir}/multiplayer.json`, JSON.stringify({ players, failures }, null, 2));
} finally {
  await Promise.all(contexts.map((context) => context.close().catch(() => {})));
  await browser.close();
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("browser multiplayer smoke passed: active turn, queued turn, promotion");
}
