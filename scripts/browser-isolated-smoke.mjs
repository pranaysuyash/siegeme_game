import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import crypto from "node:crypto";
import { chromium } from "playwright";

const repositoryRoot = resolve(new URL("..", import.meta.url).pathname);
const runtimeRoot = await mkdtemp(join(tmpdir(), "siegeme-browser-isolated-"));
const authorityPersist = join(runtimeRoot, "authority");
const authorityPort = await freePort();
const appPort = await freePort();
const appDistDir = `.next-isolated-${appPort}`;
const authorityUrl = `http://127.0.0.1:${authorityPort}`;
const appUrl = `http://127.0.0.1:${appPort}`;
const sessionSecret = "isolated-browser-session-secret-0123456789";
const internalSecret = "isolated-browser-internal-secret-0123456789";
const outputDir = process.env.SIEGE_ISOLATED_OUTPUT_DIR ?? "artifacts/browser-isolated";
const processes = [];
let browser;
await mkdir(outputDir, { recursive: true });
const originalNextEnv = await readFile(join(repositoryRoot, "next-env.d.ts"));
const originalTsconfig = await readFile(join(repositoryRoot, "tsconfig.json"));

function freePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") return reject(new Error("Could not allocate a local port"));
      server.close((error) => error ? reject(error) : resolvePort(address.port));
    });
  });
}

function start(command, args, extraEnv, cwd = repositoryRoot) {
  const child = spawn(process.execPath, [command, ...args], {
    cwd,
    env: { ...process.env, ...extraEnv },
    stdio: ["ignore", "pipe", "pipe"],
    detached: true,
  });
  let output = "";
  const capture = (chunk) => { output = `${output}${chunk}`.slice(-16_000); };
  child.stdout.on("data", capture);
  child.stderr.on("data", capture);
  processes.push({ child, getOutput: () => output });
  return child;
}

function runOnce(command, args, extraEnv = {}) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(process.execPath, [command, ...args], {
      cwd: repositoryRoot,
      env: { ...process.env, ...extraEnv },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    const capture = (chunk) => { output = `${output}${chunk}`.slice(-16_000); };
    child.stdout.on("data", capture);
    child.stderr.on("data", capture);
    child.once("error", rejectRun);
    child.once("close", (code) => code === 0 ? resolveRun(output) : rejectRun(new Error(`Command failed with ${code}: ${output}`)));
  });
}

async function waitForJson(url, predicate, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  let lastError = "not attempted";
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      const payload = await response.json();
      if (response.ok && predicate(payload)) return payload;
      lastError = `${response.status} ${JSON.stringify(payload)}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  throw new Error(`Timed out waiting for ${url}: ${lastError}`);
}

async function waitForAttackEvent(targetId, timeoutMs = 20_000) {
  const payload = await waitForJson(`${authorityUrl}/events?limit=30`, (candidate) => candidate.events?.some((event) => event.type === "ATTACK_RESOLVED" && event.targetId === targetId) ?? false, timeoutMs);
  return payload.events.find((event) => event.type === "ATTACK_RESOLVED" && event.targetId === targetId);
}

function b64url(value) {
  return Buffer.from(value).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function sessionToken(playerId) {
  const now = Date.now();
  const payload = b64url(JSON.stringify({ playerId, issuedAt: now, expiresAt: now + 30 * 24 * 60 * 60 * 1000 }));
  const signature = b64url(crypto.createHmac("sha256", sessionSecret).update(`v1.${payload}`).digest());
  return `v1.${payload}.${signature}`;
}

async function grant(playerId, kind, quantity) {
  const response = await fetch(new URL("/internal/grants", authorityUrl), {
    method: "POST",
    headers: { "content-type": "application/json", "x-authority-secret": internalSecret },
    body: JSON.stringify({ grantId: `isolated:${playerId}:${kind}:${crypto.randomUUID()}`, playerId, kind, quantity }),
  });
  if (!response.ok) throw new Error(`grant failed: ${response.status} ${await response.text()}`);
}

async function gameText(page) {
  return JSON.parse(await page.evaluate(() => window.render_game_to_text?.() ?? "{}"));
}

async function waitMode(page, expected, timeout = 15_000) {
  try {
    await page.waitForFunction((mode) => {
      try { return JSON.parse(window.render_game_to_text?.() ?? "{}").mode === mode; } catch { return false; }
    }, expected, { timeout });
  } catch (error) {
    const state = await gameText(page).catch(() => ({ unavailable: true }));
    throw new Error(`Timed out waiting for mode ${expected}: ${error instanceof Error ? error.message : String(error)}\nstate=${JSON.stringify(state)}`);
  }
}

async function waitForActiveAim(page, timeout = 15_000) {
  try {
    await page.waitForFunction(() => {
      try {
        const state = JSON.parse(window.render_game_to_text?.() ?? "{}");
        return state.mode === "attack-aim" && state.turnStatus === "active" && typeof state.turn?.id === "string";
      } catch { return false; }
    }, { timeout });
  } catch (error) {
    const state = await gameText(page).catch(() => ({ unavailable: true }));
    throw new Error(`Timed out waiting for an active attack turn: ${error instanceof Error ? error.message : String(error)}\nstate=${JSON.stringify(state)}`);
  }
}

async function waitForImpact(page, targetId, timeout = 5_000) {
  try {
    await page.waitForFunction(() => {
      try {
        const state = JSON.parse(window.render_game_to_text?.() ?? "{}");
        return typeof state.impact?.targetId === "string" && Array.isArray(state.impact?.impactPoint);
      } catch { return false; }
    }, { timeout: Math.max(timeout, 15_000) });
  } catch (error) {
    const state = await gameText(page).catch(() => ({ unavailable: true }));
    const diagnostics = await page.evaluate(() => window.__THREE_GAME_DIAGNOSTICS__ ?? null).catch(() => null);
    throw new Error(`Timed out waiting for impact ${targetId}: ${error instanceof Error ? error.message : String(error)}\nstate=${JSON.stringify(state)}\ndiagnostics=${JSON.stringify(diagnostics)}`);
  }
  const state = await gameText(page);
  if (state.impact?.targetId !== targetId || !Array.isArray(state.impact?.impactPoint)) {
    throw new Error(`Impact target changed before capture: expected ${targetId}, got ${JSON.stringify(state.impact)}`);
  }
  return state;
}

async function openPlayer(playerId) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await context.addCookies([{ name: "siegeme_session", value: sessionToken(playerId), url: appUrl, httpOnly: true, secure: false, sameSite: "Lax" }]);
  const page = await context.newPage();
  await page.goto(appUrl, { waitUntil: "commit", timeout: 60_000 });
  await page.waitForFunction(() => {
    try { return Boolean(JSON.parse(window.render_game_to_text?.() ?? "{}").world?.worldVersion); } catch { return false; }
  }, { timeout: 20_000 });
  await waitMode(page, "spectator", 20_000);
  return { context, page };
}

async function clickAtCenter(page, selector, text = null) {
  const pointHandle = await page.waitForFunction(({ selector: query, text: expectedText }) => {
    const elements = [...document.querySelectorAll(query)];
    const element = expectedText ? elements.find((candidate) => candidate.textContent?.toLowerCase().includes(expectedText.toLowerCase())) : elements[0];
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }, { selector, text }, { timeout: 45_000 });
  const point = await pointHandle.jsonValue();
  await pointHandle.dispose();
  await page.mouse.click(point.x, point.y);
}

async function clickDom(page, selector, text = null) {
  const candidates = page.locator(selector);
  const target = text ? candidates.filter({ hasText: text }).first() : candidates.first();
  await target.waitFor({ state: "visible", timeout: 45_000 });
  await target.dispatchEvent("click");
}

const result = { evidence: "Tier 4 local isolated browser fixture; fresh Wrangler persistence and real app/Worker routes", authorityUrl, appUrl, checks: [] };
try {
  await runOnce(resolve("node_modules/wrangler/bin/wrangler.js"), [
    "d1", "migrations", "apply", "siegeme-ledger", "--config", "cloudflare/wrangler.toml", "--local", "--persist-to", authorityPersist,
  ], { CI: "1" });
  start(resolve("node_modules/wrangler/bin/wrangler.js"), [
    "dev", "--config", "cloudflare/wrangler.toml", "--local", "--persist-to", authorityPersist, "--port", String(authorityPort),
    "--var", `SESSION_SECRET:${sessionSecret}`, "--var", `AUTHORITY_INTERNAL_SECRET:${internalSecret}`,
    "--var", "MODERATOR_SECRET:isolated-moderator-secret", "--var", "DODO_PAYMENTS_API_KEY:",
    "--var", "DODO_ATTACK_PRODUCT_ID:isolated-attack-product", "--var", "DODO_DEFENSE_PRODUCT_ID:isolated-defense-product",
  ], {});
  await waitForJson(`${authorityUrl}/world`, (payload) => Number.isInteger(payload.worldVersion));

  start(resolve("node_modules/next/dist/bin/next"), ["dev", "--hostname", "127.0.0.1", "--port", String(appPort)], {
    SIEGE_AUTHORITY_URL: authorityUrl,
    NEXT_PUBLIC_SIEGE_WS_URL: `${authorityUrl.replace("http:", "ws:")}/ws`,
    NEXT_DIST_DIR: appDistDir,
  });
  await waitForJson(`${appUrl}/api/world`, (payload) => Number.isInteger(payload.worldVersion), 45_000);

  browser = await chromium.launch({ headless: true });
  const defender = await openPlayer("isolated-defender");
  await grant("isolated-defender", "DEFENSE_PACK", 1);
  await clickAtCenter(defender.page, ".action-defend");
  await clickDom(defender.page, "button", "preview core front");
  await defender.page.locator(".defense-placement-hud").waitFor({ state: "attached", timeout: 10_000 });
  await clickDom(defender.page, "button", "confirm placement");
  await waitMode(defender.page, "spectator");
  const defenseWorld = await waitForJson(`${appUrl}/api/world`, (payload) => Array.isArray(payload.activeDefenses) && payload.activeDefenses.length > 0);
  result.checks.push({ name: "defense placement and persistence", activeDefenses: defenseWorld.activeDefenses.length });
  await defender.page.evaluate(() => window.__SIEGE_TEST_CLOSE_WS__?.());
  await defender.page.waitForTimeout(2_000);
  await waitMode(defender.page, "spectator", 10_000);
  const reconnectedWorld = await defender.page.evaluate(async () => await (await fetch("/api/world", { cache: "no-store" })).json());
  if (reconnectedWorld.worldVersion !== defenseWorld.worldVersion) throw new Error(`WebSocket reconnect changed canonical version unexpectedly: ${JSON.stringify({ before: defenseWorld.worldVersion, after: reconnectedWorld.worldVersion })}`);
  result.checks.push({ name: "WebSocket reconnect and canonical resync", worldVersion: reconnectedWorld.worldVersion });
  await defender.context.close();

  await grant("isolated-orb-attacker", "ATTACK_PACK", 2);
  const orbAttacker = await openPlayer("isolated-orb-attacker");
  await clickAtCenter(orbAttacker.page, ".action-attack");
  await clickDom(orbAttacker.page, "button", "claim turn");
  await waitForActiveAim(orbAttacker.page);
  await orbAttacker.page.evaluate(() => window.__SIEGE_TEST_SET_AIM__?.({ yaw: 0.56, elevation: 0.5, power: 0.745 }));
  await orbAttacker.page.evaluate(() => window.__SIEGE_TEST_FIRE_ATTACK__?.());
  const orbImpactPromise = waitForImpact(orbAttacker.page, "power-orb");
  const orbFlight = await gameText(orbAttacker.page);
  await orbAttacker.page.screenshot({ path: join(outputDir, "power-orb-flight.png") });
  const orbEventPromise = waitForAttackEvent("power-orb");
  await waitForJson(`${appUrl}/api/world`, (payload) => payload.worldVersion >= defenseWorld.worldVersion + 2);
  const [orbImpact, orbEvent] = await Promise.all([orbImpactPromise, orbEventPromise]);
  await orbAttacker.page.screenshot({ path: join(outputDir, "power-orb-impact.png") });
  if (orbFlight.projectile && (orbFlight.projectile.targetId !== "power-orb" || !Array.isArray(orbFlight.projectile.impactPoint))) throw new Error(`Power Orb flight metadata mismatch: ${JSON.stringify(orbFlight)}`);
  if (!String(orbImpact.lastResult ?? "").startsWith("Power Orb struck")) throw new Error(`Power Orb semantic result missing: ${JSON.stringify({ orbImpact, orbEvent })}`);
  if (orbImpact.impact?.targetId !== "power-orb" || !Array.isArray(orbImpact.impact?.impactPoint)) throw new Error(`Power Orb impact metadata mismatch: ${JSON.stringify(orbImpact)}`);
  result.checks.push({ name: "Power Orb target-specific browser presentation", flight: orbFlight.projectile, impact: orbImpact.impact, lastResult: orbImpact.lastResult });
  await waitMode(orbAttacker.page, "spectator", 20_000);
  await orbAttacker.context.close();

  const defenseId = defenseWorld.activeDefenses[0].id;
  await grant("isolated-defense-target-attacker", "ATTACK_PACK", 2);
  const defenseAttacker = await openPlayer("isolated-defense-target-attacker");
  await clickAtCenter(defenseAttacker.page, ".action-attack");
  await clickDom(defenseAttacker.page, "button", "claim turn");
  await waitForActiveAim(defenseAttacker.page);
  await defenseAttacker.page.evaluate(() => window.__SIEGE_TEST_SET_AIM__?.({ yaw: -0.21, elevation: 0.5, power: 0.745 }));
  await defenseAttacker.page.evaluate(() => window.__SIEGE_TEST_FIRE_ATTACK__?.());
  const defenseImpactPromise = waitForImpact(defenseAttacker.page, `defense:${defenseId}`);
  await waitMode(defenseAttacker.page, "attack-flight");
  const defenseFlight = await gameText(defenseAttacker.page);
  await defenseAttacker.page.screenshot({ path: join(outputDir, "active-defense-flight.png") });
  if (defenseFlight.projectile?.targetId !== `defense:${defenseId}` || !Array.isArray(defenseFlight.projectile?.impactPoint)) throw new Error(`Defense flight metadata mismatch: ${JSON.stringify(defenseFlight)}`);
  const defenseImpact = await defenseImpactPromise;
  await defenseAttacker.page.screenshot({ path: join(outputDir, "active-defense-impact.png") });
  if (!String(defenseImpact.lastResult ?? "").startsWith("Shield absorbed")) throw new Error(`Defense semantic result missing: ${JSON.stringify(defenseImpact)}`);
  if (defenseImpact.impact?.targetId !== `defense:${defenseId}` || !Array.isArray(defenseImpact.impact?.impactPoint)) throw new Error(`Defense impact metadata mismatch: ${JSON.stringify(defenseImpact)}`);
  result.checks.push({ name: "active-defense target-specific browser presentation", flight: defenseFlight.projectile, impact: defenseImpact.impact, lastResult: defenseImpact.lastResult });
  await waitMode(defenseAttacker.page, "spectator");
  await defenseAttacker.context.close();

  const players = ["isolated-attacker-one", "isolated-attacker-two"];
  await Promise.all(players.map((playerId) => grant(playerId, "ATTACK_PACK", 3)));
  const first = await openPlayer(players[0]);
  const second = await openPlayer(players[1]);
  await clickAtCenter(first.page, ".action-attack");
  await clickDom(first.page, "button", "claim turn");
  await waitMode(first.page, "attack-aim");
  await clickAtCenter(second.page, ".action-attack");
  await clickDom(second.page, "button", "claim turn");
  await second.page.getByText(/Queued for the next live turn/i).waitFor({ timeout: 10_000 });
  await first.page.evaluate(() => window.__SIEGE_TEST_FIRE_ATTACK__?.());
  await waitMode(first.page, "attack-flight");
  await waitMode(first.page, "spectator", 15_000);
  await second.page.waitForFunction(() => {
    try {
      const mode = JSON.parse(window.render_game_to_text?.() ?? "{}").mode;
      return mode === "attack-aim" || mode === "attack-requesting";
    } catch { return false; }
  }, { timeout: 15_000 });
  await clickDom(second.page, "button", "release turn");
  await waitMode(second.page, "spectator");
  const cancelledState = await gameText(second.page);
  if (cancelledState.turnStatus !== "idle" || cancelledState.mode !== "spectator") throw new Error(`Browser turn cancellation did not release the turn: ${JSON.stringify(cancelledState)}`);
  result.checks.push({ name: "isolated active queue promotion and browser cancellation", first: await gameText(first.page), second: cancelledState });
  await first.context.close();
  await second.context.close();
  await writeFile(join(outputDir, "isolated.json"), JSON.stringify(result, null, 2));
  console.log("isolated browser smoke passed: fresh authority, defense persistence, active/queued/promotion");
} catch (error) {
  result.error = error instanceof Error ? error.message : String(error);
  result.processOutput = processes.map((process) => process.getOutput());
  await writeFile(join(outputDir, "isolated.json"), JSON.stringify(result, null, 2));
  console.error(result.error);
  process.exitCode = 1;
} finally {
  const finalExitCode = process.exitCode ?? 0;
  setTimeout(() => process.exit(finalExitCode), 3_000).unref();
  if (browser) void browser.close().catch(() => {});
  for (const entry of processes) {
    if (entry.child.exitCode !== null) continue;
    try { process.kill(-entry.child.pid, "SIGTERM"); } catch { entry.child.kill("SIGTERM"); }
  }
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  for (const entry of processes) {
    if (entry.child.exitCode !== null) continue;
    try { process.kill(-entry.child.pid, "SIGKILL"); } catch { entry.child.kill("SIGKILL"); }
  }
  const currentNextEnv = await readFile(join(repositoryRoot, "next-env.d.ts"));
  if (currentNextEnv.includes(appDistDir)) await writeFile(join(repositoryRoot, "next-env.d.ts"), originalNextEnv);
  const currentTsconfig = await readFile(join(repositoryRoot, "tsconfig.json"));
  if (currentTsconfig.includes(appDistDir)) await writeFile(join(repositoryRoot, "tsconfig.json"), originalTsconfig);
  await rm(join(repositoryRoot, appDistDir), { recursive: true, force: true });
  await rm(runtimeRoot, { recursive: true, force: true });
  process.exit(process.exitCode ?? 0);
}
