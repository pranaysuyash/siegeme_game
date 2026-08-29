import { chromium } from "playwright";
import fs from "node:fs/promises";

const baseUrl = process.env.SIEGE_TEST_URL ?? "http://127.0.0.1:5188";
const outputDir = "artifacts/attack-loop";
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const failures = [];
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const consoleErrors = [];
const pageErrors = [];
page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
page.on("pageerror", (error) => pageErrors.push(error.message));

const gameText = () => page.evaluate(() => JSON.parse(window.render_game_to_text?.() ?? "{}"));
const worldFromAuthority = () => page.evaluate(async () => (await fetch("/api/world", { cache: "no-store" })).json());

try {
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => {
    try { return Boolean(JSON.parse(window.render_game_to_text())?.world?.worldVersion); } catch { return false; }
  }, { timeout: 15000 });
  const initial = await gameText();
  const initialWorldVersion = initial.world.worldVersion;

  // Buy a pack through the local dummy-payment sandbox.
  await page.locator(".action-attack").click();
  await page.locator(".sheet-primary").click();
  await page.waitForURL(/\/payments\/sandbox\?intent=/, { timeout: 10000 });
  const intentId = new URL(page.url()).searchParams.get("intent");
  if (!/^[0-9a-f-]{36}$/i.test(intentId ?? "")) failures.push(`sandbox checkout did not carry a purchase intent (${page.url()})`);
  await page.screenshot({ path: `${outputDir}/01-sandbox-checkout.png` });
  await page.locator(".sandbox-confirm").click();
  await page.waitForURL(/\/\?checkout=return/, { timeout: 10000 });
  if (new URL(page.url()).searchParams.get("intent") !== intentId) failures.push("checkout return did not preserve the opaque purchase intent");
  await page.waitForSelector(".checkout-status", { timeout: 15000 }).catch(() => failures.push("checkout return banner never appeared"));
  await page.waitForFunction(() => /Payment confirmed/.test(document.querySelector(".checkout-status strong")?.textContent ?? ""), undefined, { timeout: 10000 }).catch(() => failures.push("checkout return banner never confirmed the payment"));

  // Claim a live turn and fire a shot by dragging on the world. After "fire next shot" the
  // client claims its turn directly, so only re-open the sheet when no attack HUD is up.
  const fireShot = async (index) => {
    if (!(await page.locator(".attack-hud").isVisible().catch(() => false))) {
      const closeSheet = page.locator(".sheet-close");
      if (await closeSheet.isVisible().catch(() => false)) await closeSheet.click().catch(() => {});
      await page.locator(".action-attack").click();
      await page.getByRole("button", { name: /claim turn/ }).click();
    }
    // The turn lease is world-exclusive and auto-retries every 2s while queued; allow a full
    // lease cycle (~20s) plus slack so a busy live world cannot flake this step.
    await page.waitForSelector(".attack-hud", { timeout: 30000 });
    const hud = await page.locator(".attack-readout").innerText();
    const shell = await page.locator(".canvas-shell").boundingBox();
    if (!shell) throw new Error("canvas shell is missing");
    const startX = shell.x + shell.width * 0.46;
    const startY = shell.y + shell.height * 0.66;
    const endX = shell.x + shell.width * 0.52;
    const endY = shell.y + shell.height * 0.5;
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    for (let step = 1; step <= 6; step += 1) {
      await page.mouse.move(startX + ((endX - startX) * step) / 6, startY + ((endY - startY) * step) / 6);
      await page.waitForTimeout(40);
    }
    await page.screenshot({ path: `${outputDir}/0${index + 1}-aim-shot-${index}.png` });
    await page.mouse.up();
    await page.waitForFunction(() => {
      const state = JSON.parse(window.render_game_to_text());
      return !state.mode.startsWith("attack-requesting");
    }, { timeout: 15000 });
    await page.waitForTimeout(900);
    const after = await gameText();
    const authority = await worldFromAuthority();
    return { hud, after, authorityWorldVersion: authority.worldVersion };
  };

  const shots = [];
  for (let index = 1; index <= 3; index += 1) {
    const shot = await fireShot(index);
    shots.push(shot);
    if (shot.authorityWorldVersion <= initialWorldVersion + index - 1) failures.push(`shot ${index}: authority world version did not advance (${shot.authorityWorldVersion})`);
    await page.screenshot({ path: `${outputDir}/0${index + 1}-after-shot-${index}.png` });
    if (index < 3) {
      // After impact the client returns to spectator mode; the result banner offers "fire next
      // shot" — wait patiently, click it when it appears, otherwise fall through to the sheet path.
      const nextShot = page.getByRole("button", { name: /fire next shot/ });
      const offered = await nextShot.waitFor({ state: "visible", timeout: 6000 }).then(() => true).catch(() => false);
      if (offered) await nextShot.click();
      await page.waitForTimeout(300);
    }
  }

  // The exhausted pack must land on the summary sheet.
  await page.waitForFunction(() => /Your shots are spent/.test(document.querySelector(".sheet h2")?.textContent ?? ""), undefined, { timeout: 10000 }).catch(() => failures.push("summary sheet never opened after the pack was spent"));
  const summary = await gameText();
  const entitlements = await page.evaluate(async () => (await fetch("/api/siege/entitlements", { cache: "no-store" })).json());
  const remaining = entitlements.entitlements?.find((item) => item.kind === "ATTACK_PACK")?.quantityRemaining ?? 0;
  if (remaining !== 0) failures.push(`pack was not fully consumed (${remaining} shots remain)`);
  const finalAuthority = await worldFromAuthority();
  if (finalAuthority.worldVersion <= initialWorldVersion) failures.push("authority world never advanced across the pack");
  await page.screenshot({ path: `${outputDir}/04-summary.png`, fullPage: true });

  const report = {
    initialWorldVersion,
    finalWorldVersion: finalAuthority.worldVersion,
    intentId,
    shots: shots.map((shot, index) => ({ shot: index + 1, hud: shot.hud.replace(/\s+/g, " ").trim(), mode: shot.after.mode, result: shot.after.lastResult, error: shot.after.attackError })),
    summaryMode: summary.mode,
    summaryShotLog: summary.world ? null : null,
    entitlementsAfter: remaining,
    consoleErrors,
    pageErrors,
  };
  await fs.writeFile(`${outputDir}/report.json`, JSON.stringify(report, null, 2));
  const unexpectedConsoleErrors = consoleErrors.filter((message) => !message.includes("server responded with a status of 401") && !message.includes("server responded with a status of 402") && !message.includes("server responded with a status of 503"));
  if (unexpectedConsoleErrors.length || pageErrors.length) failures.push(`unexpected browser errors: ${JSON.stringify({ unexpectedConsoleErrors, pageErrors })}`);
} catch (error) {
  const covering = await page.evaluate(() => {
    const target = document.querySelector(".action-attack");
    if (!target) return "no .action-attack in DOM";
    const rect = target.getBoundingClientRect();
    const top = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
    return top ? `${top.tagName.toLowerCase()}.${String(top.className).split(" ").join(".")}` : "nothing";
  }).catch(() => "unavailable");
  failures.push(`attack loop crashed: ${error.message} | element at attack-button point: ${covering} | url: ${page.url()}`);
  await page.screenshot({ path: `${outputDir}/crash.png`, fullPage: true }).catch(() => {});
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("attack loop passed: buy → confirm → claim → drag-fire ×3 → summary");
}
