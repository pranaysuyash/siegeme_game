import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import crypto from "node:crypto";
import assert from "node:assert/strict";

const appUrl = process.env.SIEGE_POLISH_URL ?? "http://127.0.0.1:5188";
const authorityUrl = process.env.SIEGE_POLISH_AUTHORITY ?? "http://127.0.0.1:8787";
for (const url of [appUrl, authorityUrl]) assert(["127.0.0.1", "localhost"].includes(new URL(url).hostname), "Only local synthetic worlds are authorized");
const out = "artifacts/polish-2026-09-05";
await mkdir(out, { recursive: true });
const evidence = { date: new Date().toISOString(), appUrl, authorityUrl, renderer: "headed Chrome", captures: [], checks: [], errors: [] };
const snapshot = await (await fetch(`${authorityUrl}/world`)).json();
const browser = await chromium.launch({ headless: false, channel: "chrome" });

async function ready(page) {
  await page.waitForFunction(() => window.__THREE_GAME_DIAGNOSTICS__ && JSON.parse(window.render_game_to_text()).world, null, { timeout: 60000 });
  await page.waitForTimeout(1200);
}
async function capture(page, name, fixture = false) {
  if (!["final-aim", "final-aim-portrait", "final-flight", "final-impact-result"].includes(name)) {
    await page.waitForFunction(() => JSON.parse(window.render_game_to_text()).mode === "spectator", null, { timeout: 15000 });
  }
  await page.screenshot({ path: `${out}/${name}.png`, timeout: 60000 });
  const data = await page.evaluate(() => {
    const d = window.__THREE_GAME_DIAGNOSTICS__;
    const gl = document.querySelector("canvas")?.getContext("webgl2");
    const ext = gl?.getExtension("WEBGL_debug_renderer_info");
    return { viewport: [innerWidth, innerHeight], dpr: devicePixelRatio, state: JSON.parse(window.render_game_to_text()), graphics: d?.graphics, post: d?.postProcessing, camera: d?.camera ? { position: d.camera.position, fov: d.camera.fov } : null, renderLastPass: d?.renderer?.render, memory: d?.renderer?.memory, gpu: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "unavailable", overflow: document.documentElement.scrollWidth > innerWidth };
  });
  assert.equal(data.overflow, false, `${name}: horizontal overflow`);
  evidence.captures.push({ name, fixture: Boolean(fixture), seed: fixture?.worldSeed ?? snapshot.worldSeed, ...data });
}
async function open({ width = 1440, height = 1000, reducedMotion = "no-preference", query = "", fixture, cookie } = {}) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion });
  if (cookie) await context.addCookies([{ name: "siegeme_session", value: cookie, url: appUrl, httpOnly: true, sameSite: "Lax" }]);
  if (fixture) {
    await context.route("**/api/world*", (route) => route.fulfill({ json: fixture }));
    await context.route("**/api/events*", (route) => route.fulfill({ json: { events: [] } }));
    await context.routeWebSocket(/\/ws/, () => {});
  }
  const page = await context.newPage();
  let closing = false;
  const close = context.close.bind(context);
  context.close = async (...args) => { closing = true; return close(...args); };
  page.on("response", async (response) => {
    if (response.status() >= 400) {
      evidence.errors.push(`${closing ? "teardown" : "active"}: ${response.status()} ${response.url()}`);
      console.log("HTTP failure detail", response.status(), response.url(), (await response.text().catch(() => "body unavailable")).slice(0, 1500));
    }
  });
  page.on("pageerror", (error) => evidence.errors.push(`${closing ? "teardown" : "active"}: ${error.message}`));
  page.on("console", (msg) => { if (msg.type() === "error") evidence.errors.push(`${closing ? "teardown" : "active"}: ${msg.text()} ${msg.location().url ?? ""}`); });
  await page.goto(`${appUrl}/${query}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await ready(page);
  return { context, page };
}
try {
  if (!process.env.SIEGE_POLISH_FLOW_ONLY) {
  const live = await open();
  await capture(live.page, "final-desktop");
  const intervals = await live.page.evaluate(() => new Promise((resolve) => {
    const samples = []; let last = performance.now();
    const frame = (now) => { samples.push(now - last); last = now; if (samples.length < 120) requestAnimationFrame(frame); else resolve(samples); };
    requestAnimationFrame(frame);
  }));
  intervals.sort((a, b) => a - b);
  evidence.frameIntervals = { metric: "browser requestAnimationFrame interval; not GPU duration", samples: intervals.length, median: intervals[60], p95: intervals[114] };
  await live.page.getByRole("button", { name: "How the siege works", exact: true }).click();
  await live.page.getByRole("dialog").waitFor();
  assert.equal(await live.page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Close");
  await capture(live.page, "final-how-to-play");
  await live.page.keyboard.press("Shift+Tab");
  assert(await live.page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]'))), "Focus escaped modal");
  await live.page.keyboard.press("Escape");
  await live.page.getByRole("dialog").waitFor({ state: "detached" });
  assert.equal(await live.page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "How the siege works");
  evidence.checks.push("Help opens, traps focus, closes with Escape, and restores trigger focus");
  await live.page.setViewportSize({ width: 390, height: 844 }); await live.page.waitForTimeout(1200);
  await capture(live.page, "final-portrait");
  await live.page.setViewportSize({ width: 844, height: 390 }); await live.page.waitForTimeout(1200);
  await capture(live.page, "final-landscape");
  await live.context.close();

  for (const [name, query, reducedMotion] of [["final-no-post", "?benchmark=1", "no-preference"], ["final-reduced-motion", "", "reduce"], ["water-normal-diagnostic", "?waterNormals=1&benchmark=1", "reduce"]]) {
    const view = await open({ query, reducedMotion });
    await capture(view.page, name);
    assert.equal(evidence.captures.at(-1).post.enabled, false, `${name}: post must be disabled`);
    await view.context.close();
  }

  const damaged = structuredClone(snapshot);
  damaged.worldSeed = "seed:polish-stress";
  damaged.reign.coreIntegrity = 18;
  for (const part of damaged.components) {
    if (["tower:left", "wall:front:left", "core:enclosure"].includes(part.componentId)) { part.state = "DESTROYED"; part.hp = 0; }
    if (["keep:central", "wall:front:right", "core:main"].includes(part.componentId)) { part.state = "CRITICAL"; part.hp = 18; }
  }
  const damagedView = await open({ fixture: damaged });
  await capture(damagedView.page, "final-damaged-stress-seed", damaged);
  assert.equal(await damagedView.page.locator(".siege-banner").count(), 0, "Historical damage must not claim an active siege");
  evidence.checks.push("Synthetic damaged quiet fortress shows critical Core, no false active-siege banner");
  await damagedView.context.close();

  }

  // Actual local Worker routes, signed synthetic player and bounded grants.
  const playerId = `polish-${crypto.randomUUID()}`;
  const issuedAt = Date.now();
  const payload = Buffer.from(JSON.stringify({ playerId, issuedAt, expiresAt: issuedAt + 3600000 })).toString("base64url");
  const signature = crypto.createHmac("sha256", "polish-local-session-secret-2026-09-05").update(`v1.${payload}`).digest("base64url");
  const grant = await fetch(`${authorityUrl}/internal/grants`, { method: "POST", headers: { "content-type": "application/json", "x-authority-secret": "polish-local-internal-secret-2026-09-05" }, body: JSON.stringify({ grantId: playerId, playerId, kind: "ATTACK_PACK", quantity: 3 }) });
  assert.equal(grant.ok, true, `Local grant failed ${grant.status}`);
  const player = await open({ cookie: `v1.${payload}.${signature}` });
  await player.page.locator(".action-attack").click();
  const claimed = player.page.waitForResponse((r) => r.url().endsWith("/api/siege/turn/claim"));
  await player.page.getByRole("button", { name: /Use confirmed shots/ }).click();
  const claim = await claimed;
  const claimBody = await claim.json();
  assert.equal(claimBody.status, "ACTIVE", `Turn claim: ${claim.status()} ${JSON.stringify(claimBody)}`);
  await player.page.locator(".fire-shot").waitFor({ timeout: 10000 });
  await player.page.getByRole("slider", { name: "Aim direction" }).fill("-0.32");
  await player.page.getByRole("slider", { name: "Aim elevation" }).fill("0.28");
  await player.page.getByRole("slider", { name: "Shot power" }).fill("0.75");
  await capture(player.page, "final-aim");
  await player.page.getByRole("button", { name: "Release turn", exact: true }).click();
  await player.page.locator(".action-attack").waitFor();
  await player.page.setViewportSize({ width: 390, height: 844 }); await player.page.waitForTimeout(600);
  await player.page.locator(".action-attack").click();
  await player.page.getByRole("button", { name: /Use confirmed shots/ }).click();
  await player.page.locator(".fire-shot").waitFor();
  await capture(player.page, "final-aim-portrait");
  const beforeCancel = JSON.parse(await player.page.evaluate(() => window.render_game_to_text()));
  await player.page.mouse.move(150, 350); await player.page.mouse.down();
  await player.page.keyboard.press("Escape"); await player.page.mouse.up();
  assert.equal(JSON.parse(await player.page.evaluate(() => window.render_game_to_text())).mode, "attack-aim");
  evidence.checks.push("Escape during drag leaves active aim and does not fire");
  await player.page.getByRole("button", { name: "Release turn", exact: true }).click();
  await player.page.locator(".action-attack").waitFor();
  await player.page.setViewportSize({ width: 1440, height: 1000 });
  await player.page.locator(".action-attack").click();
  await player.page.getByRole("button", { name: /Use confirmed shots/ }).click();
  await player.page.locator(".fire-shot").waitFor();
  await player.page.getByRole("slider", { name: "Aim direction" }).fill("-0.32");
  await player.page.getByRole("slider", { name: "Aim elevation" }).fill("0.28");
  await player.page.getByRole("slider", { name: "Shot power" }).fill("0.75");
  await player.page.locator(".fire-shot").click();
  await player.page.waitForFunction(() => JSON.parse(window.render_game_to_text()).projectile, null, { timeout: 15000 });
  await capture(player.page, "final-flight");
  await player.page.waitForFunction(() => JSON.parse(window.render_game_to_text()).lastResult, null, { timeout: 15000 });
  await capture(player.page, "final-impact-result");
  const after = await (await fetch(`${authorityUrl}/world`)).json();
  assert(after.worldVersion > beforeCancel.world.worldVersion, "Attack must advance canonical world");
  assert(after.components.find((part) => part.componentId === "wall:front:left").hp < snapshot.components.find((part) => part.componentId === "wall:front:left").hp, "Attack must damage intended wall");
  evidence.checks.push("Explicit Fire uses live turn and local Worker; committed left-wall damage persists");
  await player.context.close();
  assert.deepEqual(evidence.errors, [], "Unexpected browser console or resource errors");
  evidence.result = "passed";
} catch (error) {
  evidence.result = "failed"; evidence.failure = String(error); throw error;
} finally {
  await writeFile(`${out}/${process.env.SIEGE_POLISH_FLOW_ONLY ? "flow-verification" : "visual-verification"}.json`, JSON.stringify(evidence, null, 2));
  await browser.close();
  console.log(JSON.stringify({ result: evidence.result, checks: evidence.checks, errors: evidence.errors, captures: evidence.captures.map((c) => c.name) }, null, 2));
}
