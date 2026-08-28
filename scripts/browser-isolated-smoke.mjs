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

async function waitForAction(page, locator, label) {
  try {
    await locator.waitFor({ state: "attached", timeout: 20_000 });
  } catch (error) {
    const state = await gameText(page).catch(() => ({ unavailable: true }));
    const body = await page.locator("body").innerText().catch(() => "<body unavailable>");
    throw new Error(`${label} did not mount: ${error instanceof Error ? error.message : String(error)}\nstate=${JSON.stringify(state)}\nbody=${body.slice(-2_000)}`);
  }
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
  const defendAction = defender.page.locator("button.action-button.action-defend");
  await waitForAction(defender.page, defendAction, "Defend action");
  await defendAction.click({ force: true, noWaitAfter: true });
  const previewShield = defender.page.locator("button").filter({ hasText: "Preview core front" }).first();
  try {
    await previewShield.waitFor({ state: "attached", timeout: 10_000 });
  } catch (error) {
    const state = await gameText(defender.page).catch(() => ({ unavailable: true }));
    const previews = await defender.page.getByRole("button", { name: /^Preview /i }).allTextContents().catch(() => []);
    const body = await defender.page.locator("body").innerText().catch(() => "<body unavailable>");
    throw new Error(`Core-front shield preview did not mount: ${error instanceof Error ? error.message : String(error)}\npreviews=${JSON.stringify(previews)}\nstate=${JSON.stringify(state)}\nbody=${body.slice(-2_000)}`);
  }
  await previewShield.click({ force: true });
  await defender.page.locator(".defense-placement-hud").waitFor({ state: "attached", timeout: 10_000 });
  await defender.page.getByRole("button", { name: "Confirm placement" }).click({ force: true });
  await waitMode(defender.page, "spectator");
  const defenseWorld = await waitForJson(`${appUrl}/api/world`, (payload) => Array.isArray(payload.activeDefenses) && payload.activeDefenses.length > 0);
  result.checks.push({ name: "defense placement and persistence", activeDefenses: defenseWorld.activeDefenses.length });
  await defender.context.close();

  await grant("isolated-orb-attacker", "ATTACK_PACK", 2);
  const orbAttacker = await openPlayer("isolated-orb-attacker");
  await orbAttacker.page.locator("button.action-button.action-attack").click({ force: true, noWaitAfter: true });
  await orbAttacker.page.getByRole("button", { name: /claim turn/i }).click();
  await waitForActiveAim(orbAttacker.page);
  for (let index = 0; index < 7; index += 1) await orbAttacker.page.keyboard.press("Shift+ArrowRight");
  for (let index = 0; index < 8; index += 1) await orbAttacker.page.keyboard.press("ArrowDown");
  for (let index = 0; index < 7; index += 1) await orbAttacker.page.keyboard.press("=");
  await orbAttacker.page.keyboard.press("Space");
  await waitMode(orbAttacker.page, "attack-flight");
  const orbFlight = await gameText(orbAttacker.page);
  await orbAttacker.page.screenshot({ path: join(outputDir, "power-orb-flight.png") });
  if (orbFlight.projectile?.targetId !== "power-orb" || !Array.isArray(orbFlight.projectile?.impactPoint)) throw new Error(`Power Orb flight metadata mismatch: ${JSON.stringify(orbFlight)}`);
  await waitMode(orbAttacker.page, "spectator");
  const orbResult = await gameText(orbAttacker.page);
  await orbAttacker.page.screenshot({ path: join(outputDir, "power-orb-impact.png") });
  if (!String(orbResult.lastResult ?? "").startsWith("Power Orb struck")) throw new Error(`Power Orb semantic result missing: ${JSON.stringify(orbResult)}`);
  if (orbResult.impact?.targetId !== "power-orb" || !Array.isArray(orbResult.impact?.impactPoint)) throw new Error(`Power Orb impact metadata mismatch: ${JSON.stringify(orbResult)}`);
  result.checks.push({ name: "Power Orb target-specific browser presentation", flight: orbFlight.projectile, impact: orbResult.impact, lastResult: orbResult.lastResult });
  await orbAttacker.context.close();

  const defenseId = defenseWorld.activeDefenses[0].id;
  await grant("isolated-defense-target-attacker", "ATTACK_PACK", 2);
  const defenseAttacker = await openPlayer("isolated-defense-target-attacker");
  await defenseAttacker.page.locator("button.action-button.action-attack").click({ force: true, noWaitAfter: true });
  await defenseAttacker.page.getByRole("button", { name: /claim turn/i }).click();
  await waitForActiveAim(defenseAttacker.page);
  for (let index = 0; index < 6; index += 1) await defenseAttacker.page.keyboard.press("ArrowLeft");
  for (let index = 0; index < 8; index += 1) await defenseAttacker.page.keyboard.press("ArrowDown");
  for (let index = 0; index < 7; index += 1) await defenseAttacker.page.keyboard.press("=");
  await defenseAttacker.page.keyboard.press("Space");
  await waitMode(defenseAttacker.page, "attack-flight");
  const defenseFlight = await gameText(defenseAttacker.page);
  await defenseAttacker.page.screenshot({ path: join(outputDir, "active-defense-flight.png") });
  if (defenseFlight.projectile?.targetId !== `defense:${defenseId}` || !Array.isArray(defenseFlight.projectile?.impactPoint)) throw new Error(`Defense flight metadata mismatch: ${JSON.stringify(defenseFlight)}`);
  await waitMode(defenseAttacker.page, "spectator");
  const defenseResult = await gameText(defenseAttacker.page);
  await defenseAttacker.page.screenshot({ path: join(outputDir, "active-defense-impact.png") });
  if (!String(defenseResult.lastResult ?? "").startsWith("Shield absorbed")) throw new Error(`Defense semantic result missing: ${JSON.stringify(defenseResult)}`);
  if (defenseResult.impact?.targetId !== `defense:${defenseId}` || !Array.isArray(defenseResult.impact?.impactPoint)) throw new Error(`Defense impact metadata mismatch: ${JSON.stringify(defenseResult)}`);
  result.checks.push({ name: "active-defense target-specific browser presentation", flight: defenseFlight.projectile, impact: defenseResult.impact, lastResult: defenseResult.lastResult });
  await defenseAttacker.context.close();

  const players = ["isolated-attacker-one", "isolated-attacker-two"];
  await Promise.all(players.map((playerId) => grant(playerId, "ATTACK_PACK", 3)));
  const first = await openPlayer(players[0]);
  const second = await openPlayer(players[1]);
  const firstAttackAction = first.page.getByRole("button", { name: /^Attack\b/i });
  const secondAttackAction = second.page.getByRole("button", { name: /^Attack\b/i });
  await waitForAction(first.page, firstAttackAction, "First attack action");
  await waitForAction(second.page, secondAttackAction, "Second attack action");
  await firstAttackAction.click({ force: true });
  await first.page.getByRole("button", { name: /claim turn/i }).click();
  await waitMode(first.page, "attack-aim");
  await secondAttackAction.click({ force: true });
  await second.page.getByRole("button", { name: /claim turn/i }).click();
  await second.page.getByText(/Queued for the next live turn/i).waitFor({ timeout: 10_000 });
  await first.page.keyboard.press("Space");
  await waitMode(first.page, "attack-flight");
  await waitMode(first.page, "spectator", 15_000);
  await second.page.waitForFunction(() => {
    try {
      const mode = JSON.parse(window.render_game_to_text?.() ?? "{}").mode;
      return mode === "attack-aim" || mode === "attack-requesting";
    } catch { return false; }
  }, { timeout: 15_000 });
  await second.page.getByRole("button", { name: "Release turn" }).click({ force: true });
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
