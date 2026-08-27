"use client";

import { useEffect, useMemo, useState } from "react";
import { productConfig } from "@/config";
import type { PublicWorldDelta, PublicWorldSnapshot } from "@/game/domain/types";
import { useSiegeStore } from "@/game/client/store";
import { authorityApiUrl } from "@/game/client/api";
import GameCanvas from "@/components/GameCanvas";

declare global {
  interface Window {
    render_game_to_text?: () => string;
    advanceTime?: (ms: number) => void;
    __THREE_GAME_DIAGNOSTICS__?: {
      renderer: unknown;
      engine: string;
      fixedTimestep: number;
    };
  }
}

function formatMoney(minor: number) {
  return `$${(minor / 100).toFixed(0)}`;
}

function formatDuration(startedAt: string) {
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(startedAt).getTime()) / 60000));
  return `${Math.floor(minutes / 60).toString().padStart(2, "0")}h ${String(minutes % 60).padStart(2, "0")}m`;
}

function ProductMark() {
  return <div className="product-mark" aria-label={`${productConfig.name}, ${productConfig.domain}`}><span className="mark-glyph">✦</span><span>{productConfig.name}</span><span className="product-domain">{productConfig.domain}</span></div>;
}

function IdentityChip() {
  const snapshot = useSiegeStore((state) => state.snapshot);
  const openSheet = useSiegeStore((state) => state.openSheet);
  if (!snapshot?.ruler) return null;
  return (
    <button className="identity-chip" onClick={() => openSheet("identity")} aria-label="Open ruler identity">
      <span className="identity-avatar">FH</span>
      <span className="identity-copy"><strong>{snapshot.ruler.displayName}</strong><small>{snapshot.ruler.identityType}</small></span>
      <span className="chip-chevron">↗</span>
    </button>
  );
}

function CoreIndicator() {
  const snapshot = useSiegeStore((state) => state.snapshot);
  if (!snapshot?.reign) return null;
  const percent = Math.round((snapshot.reign.coreIntegrity / snapshot.reign.coreMaxIntegrity) * 100);
  const critical = percent <= 25;
  return (
    <div className={`core-indicator ${critical ? "is-critical" : ""}`} aria-label={`Core Integrity ${percent} percent`}>
      <div className="core-label"><span>{critical ? "CORE CRITICAL" : "CORE INTEGRITY"}</span><strong>{percent}<em>%</em></strong></div>
      <div className="core-track"><span style={{ width: `${percent}%` }} /></div>
    </div>
  );
}

function PrimaryActions() {
  const mode = useSiegeStore((state) => state.mode);
  const openSheet = useSiegeStore((state) => state.openSheet);
  const snapshot = useSiegeStore((state) => state.snapshot);
  if ((mode !== "spectator" && mode !== "empty") || snapshot?.coronation) return null;
  return (
    <div className="primary-actions">
      {mode === "spectator" ? (
        <>
          <button className="action-button action-attack" onClick={() => openSheet("attack")}><span>Attack</span><small>buy 3 shots · {formatMoney(300)}</small></button>
          <button className="action-button action-defend" onClick={() => openSheet("defend")}><span>Defend</span><small>shield the hold · from {formatMoney(snapshot?.reign?.nextDefensePriceMinor ?? 300)}</small></button>
        </>
      ) : (
        <button className="claim-button" onClick={() => openSheet("coronation")}><span>Claim the throne</span><small>publish your identity and begin a reign</small></button>
      )}
    </div>
  );
}

function LiveMeta() {
  const snapshot = useSiegeStore((state) => state.snapshot);
  const openSheet = useSiegeStore((state) => state.openSheet);
  if (!snapshot?.reign) return null;
  return (
    <div className="live-meta"><span className="live-dot" /> LIVE REIGN {snapshot.reign.ordinal.toString().padStart(2, "0")}<span className="meta-divider" />{formatDuration(snapshot.reign.startedAt)}<button onClick={() => openSheet("details")} aria-label="Open siege details">details ↗</button><button onClick={() => openSheet("recovery")} aria-label="Open recovery">recover ↗</button></div>
  );
}

function ProtectionNotice() {
  const protectedUntil = useSiegeStore((state) => state.snapshot?.coronation?.protectedUntil ?? null);
  const [now, setNow] = useState(0);
  useEffect(() => {
    if (!protectedUntil) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [protectedUntil]);
  if (!protectedUntil || (now > 0 && protectedUntil <= now)) return null;
  return <div className="protection-notice"><span className="live-dot" /> NEW REIGN PROTECTED{now > 0 ? ` · ${Math.ceil((protectedUntil - now) / 1000)}s` : ""}</div>;
}

function Sheet({ children, title, onClose }: { children: React.ReactNode; title: string; onClose: () => void }) {
  return <div className="sheet-backdrop" onClick={onClose}><section className="sheet" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><button className="sheet-close" onClick={onClose} aria-label="Close">×</button><p className="eyebrow">SIEGE ME / LIVE WORLD</p><h2>{title}</h2>{children}</section></div>;
}

function ContextSheet() {
  const activeSheet = useSiegeStore((state) => state.activeSheet);
  const closeSheet = useSiegeStore((state) => state.closeSheet);
  const snapshot = useSiegeStore((state) => state.snapshot);
  const [checkoutState, setCheckoutState] = useState<"idle" | "loading" | "error">("idle");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [identityType, setIdentityType] = useState("Person");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [message, setMessage] = useState("");
  const [coronationState, setCoronationState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [recoveryCode, setRecoveryCode] = useState<string | null>(null);
  const [recoveryState, setRecoveryState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [recoveryInput, setRecoveryInput] = useState("");
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const claimTurn = useSiegeStore((state) => state.claimTurn);
  const turnStatus = useSiegeStore((state) => state.turnStatus);
  const turnError = useSiegeStore((state) => state.attackError);

  async function startCheckout(purchaseKind: "ATTACK_PACK" | "DEFENSE_PACK") {
    setCheckoutState("loading");
    setCheckoutError(null);
    try {
      const response = await fetch(authorityApiUrl("/checkout"), { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ purchase_kind: purchaseKind }) });
      const payload = await response.json() as { checkoutUrl?: string; error?: string };
      if (!response.ok || !payload.checkoutUrl) {
        setCheckoutState("error");
        setCheckoutError(payload.error ?? "Dodo checkout is unavailable.");
        return;
      }
      window.location.assign(payload.checkoutUrl);
    } catch {
      setCheckoutState("error");
      setCheckoutError("The secure checkout could not be reached. Try again.");
    }
  }

  async function startAttackCheckout() { return startCheckout("ATTACK_PACK"); }

  async function placeDefense(type: "SHIELD" | "BRACE", slotId: string) {
    setCheckoutState("loading");
    setCheckoutError(null);
    try {
      const response = await fetch(authorityApiUrl("/defense/place"), { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ commandId: crypto.randomUUID(), reignId: snapshot?.currentReignId, expectedWorldVersion: snapshot?.worldVersion, type, slotId }) });
      const payload = await response.json() as { snapshot?: PublicWorldSnapshot; error?: string };
      if (!response.ok || !payload.snapshot) throw new Error(payload.error ?? "Defense placement was rejected");
      useSiegeStore.getState().setSnapshot(payload.snapshot);
      closeSheet();
    } catch (error) {
      setCheckoutState("error");
      setCheckoutError(error instanceof Error ? error.message : "Defense placement was rejected");
    }
  }

  async function createRecoveryCode() {
    setRecoveryState("loading");
    setRecoveryError(null);
    try {
      const response = await fetch(authorityApiUrl("/recovery/create"), { method: "POST", credentials: "include" });
      const payload = await response.json() as { recoveryCode?: string; error?: string };
      if (!response.ok || !payload.recoveryCode) throw new Error(payload.error ?? "Recovery code could not be created");
      setRecoveryCode(payload.recoveryCode);
      setRecoveryState("success");
    } catch (error) {
      setRecoveryState("error");
      setRecoveryError(error instanceof Error ? error.message : "Recovery code could not be created");
    }
  }

  async function submitCoronation() {
    setCoronationState("loading");
    setCheckoutError(null);
    try {
      const response = await fetch(authorityApiUrl("/identity"), { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ displayName, identityType, destinationUrl: destinationUrl || null, message: message || null }) });
      const payload = await response.json() as { snapshot?: PublicWorldSnapshot; error?: string };
      if (!response.ok || !payload.snapshot) throw new Error(payload.error ?? "The throne could not be coronated");
      useSiegeStore.getState().setSnapshot(payload.snapshot);
      setCoronationState("success");
      closeSheet();
    } catch (error) {
      setCoronationState("error");
      setCheckoutError(error instanceof Error ? error.message : "The throne could not be coronated");
    }
  }

  async function claimRecovery() {
    setRecoveryState("loading");
    setRecoveryError(null);
    try {
      const response = await fetch(authorityApiUrl("/recovery/claim"), { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ code: recoveryInput }) });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Recovery code could not be claimed");
      setRecoveryState("success");
      window.location.reload();
    } catch (error) {
      setRecoveryState("error");
      setRecoveryError(error instanceof Error ? error.message : "Recovery code could not be claimed");
    }
  }

  if (!activeSheet) return null;
  if (activeSheet === "coronation") return <Sheet title="Take the throne" onClose={closeSheet}><p className="sheet-lede">Your decisive shot opened a new reign. Publish a bounded public identity and the fortress will be regenerated for everyone.</p><div className="form-grid"><label className="form-field">DISPLAY NAME<input value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={48} placeholder="Your name" /></label><label className="form-field">IDENTITY TYPE<select value={identityType} onChange={(event) => setIdentityType(event.target.value)}><option>Person</option><option>Company</option><option>Product</option><option>Project</option><option>Community</option><option>Campaign</option><option>Creator</option></select></label><label className="form-field full-field">DESTINATION URL <span className="field-optional">OPTIONAL</span><input value={destinationUrl} onChange={(event) => setDestinationUrl(event.target.value)} maxLength={2048} placeholder="https://..." /></label><label className="form-field full-field">MESSAGE <span className="field-optional">OPTIONAL</span><textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={160} placeholder="A short message for the live world" /></label></div><button className="sheet-primary" onClick={submitCoronation} disabled={coronationState === "loading" || !displayName.trim()}>{coronationState === "loading" ? "Starting the new reign…" : "Publish and begin reign"}<span>→</span></button><button className="secondary-action" onClick={createRecoveryCode} disabled={recoveryState === "loading"}>{recoveryState === "loading" ? "Creating recovery code…" : "Create cross-device recovery code"}</button>{recoveryCode && <div className="recovery-code"><span>STORE THIS ONCE</span><strong>{recoveryCode}</strong><small>It expires in 30 days and can be used once.</small></div>}{(checkoutError || recoveryError) && <p className="error-note" role="alert">{checkoutError ?? recoveryError}</p>}<p className="muted-note">Automated safety moderation checks identity type, markup, URL scheme, private hosts, and field limits before the identity is published.</p></Sheet>;
  if (activeSheet === "recovery") return <Sheet title="Recover a reign" onClose={closeSheet}><p className="sheet-lede">Paste the one-time recovery code created during coronation. This restores the silent player identity on this device without adding a login wall.</p><label className="form-field full-field">RECOVERY CODE<input value={recoveryInput} onChange={(event) => setRecoveryInput(event.target.value.toUpperCase())} placeholder="SIEGE-..." autoCapitalize="characters" /></label><button className="sheet-primary" onClick={claimRecovery} disabled={recoveryState === "loading" || !recoveryInput.trim()}>{recoveryState === "loading" ? "Checking code…" : "Restore identity"}<span>→</span></button>{recoveryError && <p className="error-note" role="alert">{recoveryError}</p>}<p className="muted-note">Codes are hashed in D1 and cannot be displayed again after creation.</p></Sheet>;
  if (activeSheet === "identity") return <Sheet title={snapshot?.ruler?.displayName ?? "The ruler"} onClose={closeSheet}><div className="identity-sheet"><div className="large-avatar">FH</div><div><p className="sheet-kicker">CURRENT RULER · {snapshot?.ruler?.identityType}</p><p className="sheet-message">{snapshot?.ruler?.message}</p><div className="sheet-stats"><span><strong>{snapshot?.reign?.ordinal.toString().padStart(2, "0")}</strong>reign</span><span><strong>{snapshot?.reign ? formatDuration(snapshot.reign.startedAt) : "--"}</strong>duration</span><span><strong>{snapshot?.worldVersion}</strong>world version</span></div></div></div><p className="muted-note">Identity details are locked to this reign. Destination links will appear here only after a moderated public identity is published.</p></Sheet>;
  if (activeSheet === "attack") return <Sheet title="Choose your angle" onClose={closeSheet}><p className="sheet-lede">A paid pack is three finite shots. Buy the pack first, then claim one live turn before aiming.</p><div className="purchase-card"><div><span className="card-label">ATTACK PACK</span><strong>3 shots</strong><small>one-time · outcome depends on aim and the live fortress</small></div><span className="price">$3</span></div><button className="sheet-primary" onClick={startAttackCheckout} disabled={checkoutState === "loading"}>{checkoutState === "loading" ? "Opening secure checkout…" : "Buy 3 shots"}<span>→</span></button><button className="secondary-action" onClick={() => void claimTurn()} disabled={turnStatus === "claiming"}>{turnStatus === "claiming" ? "Claiming live turn…" : turnStatus === "queued" ? "Queued for next turn" : "I have confirmed shots · claim turn"}</button>{(checkoutError || turnError) && <p className="error-note" role="alert">{checkoutError ?? turnError}</p>}<p className="muted-note">Dodo confirms payment on the server. A checkout return never grants shots by itself.</p></Sheet>;
  if (activeSheet === "defend") return <Sheet title="Hold the line" onClose={closeSheet}><p className="sheet-lede">Choose a finite shield or brace between live turns. Defense delays destruction, but never heals the Core.</p><div className="defense-options"><div><span className="option-icon">◌</span><strong>Shield</strong><small>absorbs two projectile impacts at the Core approach</small><button className="secondary-action" onClick={() => startCheckout("DEFENSE_PACK")} disabled={checkoutState === "loading"}>Buy shield · $3</button><button className="secondary-action" onClick={() => placeDefense("SHIELD", "shield_slot:core_front")} disabled={checkoutState === "loading"}>Place shield</button></div><div><span className="option-icon">⌗</span><strong>Brace</strong><small>absorbs one projectile impact at the center wall</small><button className="secondary-action" onClick={() => startCheckout("DEFENSE_PACK")} disabled={checkoutState === "loading"}>Buy brace · $3</button><button className="secondary-action" onClick={() => placeDefense("BRACE", "brace_slot:front_center")} disabled={checkoutState === "loading"}>Place brace</button></div></div>{checkoutError && <p className="error-note" role="alert">{checkoutError}</p>}<p className="muted-note">Payment creates a finite entitlement. Placement is separately checked against the live slot and world version.</p></Sheet>;
  return <Sheet title="The siege, at a glance" onClose={closeSheet}><div className="detail-grid"><span><strong>{snapshot?.reign?.siegeCharge ?? 0}%</strong>siege charge</span><span><strong>{snapshot?.reign?.royalGuardCharge ?? 0}%</strong>royal guard</span><span><strong>{snapshot?.worldVersion}</strong>state version</span><span><strong>{snapshot?.components.filter((item) => item.state === "DESTROYED").length}</strong>structures down</span></div><p className="muted-note">This view is the versioned snapshot received from the Cloudflare siege authority.</p></Sheet>;
}

function AttackControls() {
  const aim = useSiegeStore((state) => state.attackAim);
  const reset = useSiegeStore((state) => state.resetAttack);
  const mode = useSiegeStore((state) => state.mode);
  const result = useSiegeStore((state) => state.lastResult);
  const error = useSiegeStore((state) => state.attackError);
  const impact = useSiegeStore((state) => state.impactEffect);
  if (!mode.startsWith("attack")) return error ? <div className="shot-result error-result">{error}<button onClick={reset}>dismiss</button></div> : result ? <div className="shot-result">{result}<button onClick={reset}>close</button></div> : null;
  return <div className="attack-hud"><div><span className="eyebrow">LIVE ATTACK · SERVER AUTHORITY</span><h2>{mode === "attack-flight" ? "Impact in progress" : mode === "attack-requesting" ? "Validating attack" : "Pull back. Pick a wall."}</h2><p>{mode === "attack-flight" ? "The committed impact is travelling to the fortress." : mode === "attack-requesting" ? "The siege authority is checking your entitlement and aim." : "Drag anywhere on the world, then release to fire."}</p></div><div className="attack-readout"><span>POWER <strong>{Math.round(aim.power * 100)}%</strong></span><span>AIM <strong>{aim.yaw < -0.2 ? "LEFT" : aim.yaw > 0.2 ? "RIGHT" : "CENTER"}</strong></span></div>{impact && <div className="damage-number" key={impact.key}>−{impact.damage}</div>}</div>;
}

export default function SiegeApp() {
  const mode = useSiegeStore((state) => state.mode);
  const loadingStep = useSiegeStore((state) => state.loadingStep);
  const setLoadingStep = useSiegeStore((state) => state.setLoadingStep);
  const setSnapshot = useSiegeStore((state) => state.setSnapshot);
  const setRealtimeSnapshot = useSiegeStore((state) => state.setRealtimeSnapshot);
  const setRealtimeDelta = useSiegeStore((state) => state.setRealtimeDelta);
  const snapshot = useSiegeStore((state) => state.snapshot);
  const setMode = useSiegeStore((state) => state.setMode);
  const hasSnapshot = Boolean(snapshot);
  const worldText = useMemo(() => () => {
    const state = useSiegeStore.getState();
    return JSON.stringify({ coordinateSystem: "world x left/right, y up, z front/back; screen camera is fixed 3/4", mode: state.mode, loadingStep: state.loadingStep, aim: state.attackAim, projectile: state.projectile, lastResult: state.lastResult, attackError: state.attackError, world: state.snapshot ? { phase: state.snapshot.phase, worldVersion: state.snapshot.worldVersion, coreIntegrity: state.snapshot.reign?.coreIntegrity ?? null, ruler: state.snapshot.ruler?.displayName ?? null, components: state.snapshot.components.filter((item) => item.state !== "INTACT").map((item) => `${item.componentId}:${item.state}`) } : null });
  }, []);

  useEffect(() => {
    window.render_game_to_text = worldText;
    window.advanceTime = (ms) => useSiegeStore.getState().advanceTime(ms);
    let cancelled = false;
    const query = new URLSearchParams(window.location.search);
    const empty = query.get("empty") === "1";
    const load = async () => {
      setLoadingStep("Connecting");
      setLoadingStep("Loading world");
      try {
        const response = await fetch(authorityApiUrl(`/world${empty ? "?empty=1" : ""}`), { cache: "no-store", credentials: "include" });
        if (!response.ok) throw new Error("Live world unavailable");
        const loaded = await response.json();
        if (!cancelled) {
          setLoadingStep("World ready");
          setSnapshot(loaded);
        }
      } catch {
        if (!cancelled) setMode("unavailable");
      }
    };
    void load();
    return () => { cancelled = true; };
  }, [setLoadingStep, setMode, setSnapshot, worldText]);

  useEffect(() => {
    if (!hasSnapshot) return;
    const configuredUrl = process.env.NEXT_PUBLIC_SIEGE_WS_URL;
    const localHost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const socketUrl = configuredUrl ?? (localHost ? `ws://${window.location.hostname}:8787/ws` : `wss://api.${productConfig.domain}/ws`);
    let cancelled = false;
    let retryTimer: number | undefined;
    let socket: WebSocket | undefined;
    let lastEventSequence = 0;

    const connect = () => {
      if (cancelled) return;
      socket = new WebSocket(socketUrl);
      socket.onopen = () => {
        if (!cancelled && useSiegeStore.getState().mode === "reconnecting") setMode(useSiegeStore.getState().snapshot?.phase === "ACTIVE" ? "spectator" : "empty");
      };
      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as { type?: string; eventSequence?: number; snapshot?: PublicWorldSnapshot; delta?: PublicWorldDelta };
          if (typeof message.eventSequence === "number") {
            if (lastEventSequence > 0 && message.eventSequence > lastEventSequence + 1) {
              socket?.send("resync");
              return;
            }
            if (message.eventSequence < lastEventSequence) return;
            lastEventSequence = message.eventSequence;
          }
          if (message.snapshot && (message.type === "snapshot" || message.type === "attack_resolved")) setRealtimeSnapshot(message.snapshot);
          if (message.delta && message.type === "attack_resolved") setRealtimeDelta(message.delta);
        } catch {
          socket?.close();
        }
      };
      socket.onclose = () => {
        if (cancelled) return;
        const currentMode = useSiegeStore.getState().mode;
        if (currentMode === "spectator" || currentMode === "empty") setMode("reconnecting");
        retryTimer = window.setTimeout(connect, 1500);
      };
      socket.onerror = () => socket?.close();
    };

    connect();
    return () => {
      cancelled = true;
      if (retryTimer) window.clearTimeout(retryTimer);
      socket?.close();
    };
  }, [hasSnapshot, setMode, setRealtimeDelta, setRealtimeSnapshot]);

  useEffect(() => {
    if (snapshot && mode === "loading") setMode(snapshot.phase === "ACTIVE" ? "spectator" : "empty");
  }, [mode, setMode, snapshot]);

  return (
    <main className={`siege-app mode-${mode}`}>
      <GameCanvas />
      <div className="vignette" />
      {mode === "loading" && <div className="loading-screen"><ProductMark /><div className="loading-center"><div className="loading-sigil">✦</div><p className="eyebrow">THE GLOBAL THRONE</p><h1>Preparing the siege</h1><p className="loading-step"><span className="loading-pulse" />{loadingStep}</p></div><p className="loading-footer">one throne · one world · {productConfig.domain}</p></div>}
      {mode !== "loading" && mode !== "unavailable" && <><header className="top-chrome"><ProductMark /><IdentityChip /><CoreIndicator /></header><LiveMeta /><ProtectionNotice /><PrimaryActions /><AttackControls /><ContextSheet /></>}
      {mode === "unavailable" && <div className="unavailable-copy"><p className="eyebrow">LIVE AUTHORITY OFFLINE</p><h1>The siege is unavailable.</h1><p>This client will not substitute a local world. Start the Cloudflare authority or check the deployment configuration, then reconnect.</p><button className="sheet-primary" onClick={() => window.location.reload()}>Reconnect <span>↻</span></button></div>}
      {mode === "empty" && <div className="empty-copy"><p className="eyebrow">NO ACTIVE REIGN</p><h1>The throne is empty.</h1><p>There is no ruler to attack yet. The first coronation seeds the world for everyone.</p></div>}
    </main>
  );
}
