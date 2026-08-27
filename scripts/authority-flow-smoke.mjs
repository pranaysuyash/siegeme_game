const authorityUrl = process.env.SIEGE_AUTHORITY_URL ?? "http://127.0.0.1:8787";
const internalSecret = process.env.SIEGE_LOCAL_AUTHORITY_SECRET ?? "local-authority-secret-change-me";

function cookieFrom(response) {
  return response.headers.get("set-cookie")?.split(";", 1)[0] ?? "";
}

function playerIdFromCookie(cookie) {
  const token = cookie.split("=", 2)[1] ?? "";
  const payload = token.split(".")[1] ?? "";
  return JSON.parse(Buffer.from(payload.replaceAll("-", "+").replaceAll("_", "/"), "base64url").toString()).playerId;
}

async function request(path, options = {}) {
  return fetch(`${authorityUrl}${path}`, { ...options, headers: { "Content-Type": "application/json", ...(options.headers ?? {}) } });
}

async function newSession() {
  const response = await request("/session", { method: "POST" });
  const cookie = cookieFrom(response);
  if (!cookie) throw new Error("session cookie was not issued");
  return { cookie, playerId: playerIdFromCookie(cookie) };
}

const conqueror = await newSession();
const grantId = `local-qa:${Date.now()}`;
const grantResponse = await request("/internal/grants", { method: "POST", headers: { "x-authority-secret": internalSecret }, body: JSON.stringify({ grantId, playerId: conqueror.playerId, kind: "ATTACK_PACK", quantity: 180 }) });
if (!grantResponse.ok) throw new Error(`local grant failed: ${grantResponse.status} ${await grantResponse.text()}`);

let world = await (await request("/world")).json();
let accepted = 0;
const impacts = {};
for (let attempt = 0; attempt < 180 && world.phase === "ACTIVE"; attempt += 1) {
  const claim = await request("/turn/claim", { method: "POST", headers: { Cookie: conqueror.cookie } });
  const claimPayload = await claim.json();
  if (claim.status === 202) { await new Promise((resolve) => setTimeout(resolve, 100)); attempt -= 1; continue; }
  if (!claim.ok || !claimPayload.turn) throw new Error(`turn claim failed: ${claim.status} ${JSON.stringify(claimPayload)}`);
  const enclosure = world.components.find((component) => component.componentId === "core:enclosure");
  const [yaw, elevation, power] = enclosure?.state !== "DESTROYED" ? [0, 0.64, 0.5] : [0, 0.55, 0.25];
  const attack = await request("/attack", { method: "POST", headers: { Cookie: conqueror.cookie }, body: JSON.stringify({ commandId: crypto.randomUUID(), reignId: world.currentReignId, turnId: claimPayload.turn.id, expectedWorldVersion: world.worldVersion, simulationVersion: "ballistic-v1", yaw, elevation, power }) });
  const payload = await attack.json();
  if (attack.status === 409) { world = await (await request("/world")).json(); attempt -= 1; continue; }
  if (!attack.ok) throw new Error(`attack failed: ${attack.status} ${JSON.stringify(payload)}`);
  accepted += 1;
  const targetId = payload.impact?.targetId ?? "unknown";
  impacts[targetId] = (impacts[targetId] ?? 0) + 1;
  world = payload.snapshot;
}

const result = { phase: world.phase, accepted, impacts, worldVersion: world.worldVersion, currentReignId: world.currentReignId, coreIntegrity: world.reign?.coreIntegrity ?? null };
if (world.phase !== "CORONATION") {
  console.log(JSON.stringify({ ...result, coronation: "not reached within bounded QA shot budget" }));
  process.exitCode = 2;
} else {
  const second = await newSession();
  const recovery = await request("/recovery/create", { method: "POST", headers: { Cookie: conqueror.cookie } });
  const recoveryPayload = await recovery.json();
  if (!recovery.ok || !recoveryPayload.recoveryCode) throw new Error(`recovery creation failed: ${recovery.status} ${JSON.stringify(recoveryPayload)}`);
  const unauthorizedIdentity = await request("/identity", { method: "POST", headers: { Cookie: second.cookie }, body: JSON.stringify({ displayName: "Wrong Claimant", identityType: "Person" }) });
  const identity = await request("/identity", { method: "POST", headers: { Cookie: conqueror.cookie }, body: JSON.stringify({ displayName: "QA Conqueror", identityType: "Project", destinationUrl: "https://siegeme.com", message: "Authority flow verified" }) });
  const identityPayload = await identity.json();
  const recovered = await request("/recovery/claim", { method: "POST", body: JSON.stringify({ code: recoveryPayload.recoveryCode }) });
  const recoveredAgain = await request("/recovery/claim", { method: "POST", body: JSON.stringify({ code: recoveryPayload.recoveryCode }) });
  const nextWorld = identityPayload.snapshot ?? await (await request("/world")).json();
  const protectedPlayer = await newSession();
  await request("/internal/grants", { method: "POST", headers: { "x-authority-secret": internalSecret }, body: JSON.stringify({ grantId: `local-qa:protected:${Date.now()}`, playerId: protectedPlayer.playerId, kind: "ATTACK_PACK", quantity: 1 }) });
  const protectedTurn = await request("/turn/claim", { method: "POST", headers: { Cookie: protectedPlayer.cookie } });
  console.log(JSON.stringify({ ...result, unauthorizedIdentityStatus: unauthorizedIdentity.status, identityStatus: identity.status, nextReignId: nextWorld.currentReignId, nextPhase: nextWorld.phase, nextWorldVersion: nextWorld.worldVersion, freshHealth: nextWorld.components.every((component) => component.hp === component.maxHp || component.componentId === "foundation:main" || component.componentId === "throne:main"), recoveryCreateStatus: recovery.status, recoveryClaimStatus: recovered.status, recoveryReuseStatus: recoveredAgain.status, protectedTurnStatus: protectedTurn.status }));
}
