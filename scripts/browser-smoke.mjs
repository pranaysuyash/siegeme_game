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
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1600);

  const initial = JSON.parse(await page.evaluate(() => window.render_game_to_text?.() ?? "{}"));
  const canvas = await page.locator("canvas").boundingBox();
  if (!canvas || canvas.width < 300 || canvas.height < 300) failures.push(`${name}: canvas bounds are invalid`);
  if (initial.mode !== "spectator" || !Number.isInteger(initial.world?.worldVersion)) failures.push(`${name}: Worker-backed spectator snapshot missing`);

  const checkoutResponses = [];
  page.on("response", (response) => {
    if (response.url().endsWith("/api/payments/attack-checkout") && response.request().method() === "POST") checkoutResponses.push(response);
  });
  await page.locator(".action-attack").click();
  await page.locator(".sheet-primary").click();
  await page.waitForTimeout(500);
  if (!(await page.locator(".error-note").isVisible())) failures.push(`${name}: unconfigured Dodo checkout did not fail closed`);
  const authorityWorld = await page.evaluate(async () => (await fetch("/api/world", { cache: "no-store" })).json());
  const attackResponse = await page.evaluate(async (world) => {
    const response = await fetch("/api/siege/attack", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ commandId: crypto.randomUUID(), reignId: world.reign.id, turnId: "turn:none", expectedWorldVersion: world.worldVersion, simulationVersion: "ballistic-v1", yaw: 0, elevation: 0.64, power: 0.5 }) });
    return { status: response.status, payload: await response.json() };
  }, authorityWorld);
  const attackState = JSON.parse(await page.evaluate(() => window.render_game_to_text?.() ?? "{}"));
  if (attackResponse.status !== 402 || !String(attackResponse.payload?.error ?? "").includes("entitlement")) failures.push(`${name}: attack did not surface the authority entitlement boundary`);
  await page.locator(".sheet-close").click();
  const sessionCookies = await page.context().cookies(baseUrl);
  const sessionCookie = sessionCookies.find((cookie) => cookie.name === "siegeme_session");
  const sessionSetCookie = (await checkoutResponses.at(-1)?.allHeaders())?.["set-cookie"] ?? "";
  if (checkoutResponses.length === 0) failures.push(`${name}: attack purchase did not reach the payment authority`);
  if (!sessionSetCookie.includes("HttpOnly") || !sessionSetCookie.includes("Secure") || !sessionSetCookie.includes("SameSite=Lax")) failures.push(`${name}: silent session response did not carry the required cookie flags`);
  if (sessionCookie && (!sessionCookie.httpOnly || !sessionCookie.secure)) failures.push(`${name}: stored silent session cookie is not HttpOnly and Secure`);

  const websocketSnapshot = await page.evaluate(() => new Promise((resolve) => {
    const socket = new WebSocket("ws://127.0.0.1:8787/ws");
    const timeout = setTimeout(() => { socket.close(); resolve({ ok: false, reason: "timeout" }); }, 3000);
    socket.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "snapshot") {
          clearTimeout(timeout);
          socket.close();
          resolve({ ok: true, worldVersion: message.snapshot?.worldVersion, phase: message.snapshot?.phase });
        }
      } catch {
        clearTimeout(timeout);
        socket.close();
        resolve({ ok: false, reason: "invalid message" });
      }
    });
    socket.addEventListener("error", () => { clearTimeout(timeout); resolve({ ok: false, reason: "connection error" }); });
  }));
  if (!websocketSnapshot.ok || websocketSnapshot.worldVersion !== initial.world?.worldVersion) failures.push(`${name}: authority WebSocket snapshot was not received`);

  await page.locator(".identity-chip").click();
  if (!(await page.locator(".sheet h2").first().isVisible())) failures.push(`${name}: identity sheet did not open`);
  await page.locator(".sheet-close").click();
  await page.locator(".live-meta button").click();
  if (!(await page.locator(".sheet h2").first().isVisible())) failures.push(`${name}: details sheet did not open`);

  await page.screenshot({ path: `${outputDir}/${name}.png`, fullPage: true });
  await fs.writeFile(`${outputDir}/${name}.json`, JSON.stringify({ initial, checkoutStatus: checkoutResponses.at(-1)?.status() ?? null, attackResponse, attackState, canvas, sessionCookie: sessionCookie ? { name: sessionCookie.name, httpOnly: sessionCookie.httpOnly, secure: sessionCookie.secure, sameSite: sessionCookie.sameSite } : null, sessionSetCookieFlags: { httpOnly: sessionSetCookie.includes("HttpOnly"), secure: sessionSetCookie.includes("Secure"), sameSiteLax: sessionSetCookie.includes("SameSite=Lax") }, websocketSnapshot, consoleErrors, pageErrors }, null, 2));
  const unexpectedConsoleErrors = consoleErrors.filter((message) => !message.includes("server responded with a status of 401") && !message.includes("server responded with a status of 402") && !message.includes("server responded with a status of 503"));
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
