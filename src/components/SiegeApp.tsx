"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { productConfig } from "@/config";
import { DEFENSE_BASE_PRICE_MINOR } from "@/game/config";
import type { PublicWorldDelta, PublicWorldSnapshot } from "@/game/domain/types";
import { useSiegeStore } from "@/game/client/store";
import { authorityApiUrl } from "@/game/client/api";
import { flattenRealtimeMessages, realtimeSequenceAction } from "@/game/client/realtime";
import { generateFortress } from "@/game/world/generator";
import { impactLabel } from "@/game/presentation/labels";
import { serverNow } from "@/game/client/server-time";
import { readAudioSettings, saveAudioSettings, type AudioSettings } from "@/game/client/audio";
import GameCanvas from "@/components/GameCanvas";

declare global {
  interface Window {
    render_game_to_text?: () => string;
    advanceTime?: (ms: number) => void;
    __THREE_GAME_DIAGNOSTICS__?: {
      renderer: unknown;
      engine: string;
      fixedTimestep: number;
      graphics?: { reduced: boolean; reason: string; viewportWidth: number; deviceMemory: number | null };
      contextLost?: boolean;
      camera?: { position: { x: number; y: number; z: number }; quaternion: { x: number; y: number; z: number; w: number }; fov: number };
    };
  }
}

function formatMoney(minor: number) {
  return `$${(minor / 100).toFixed(0)}`;
}

function formatDuration(startedAt: string, skewMs = 0) {
  const minutes = Math.max(0, Math.floor((serverNow(Date.now(), skewMs) - new Date(startedAt).getTime()) / 60000));
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

function ReconnectingOverlay() {
  const mode = useSiegeStore((state) => state.mode);
  if (mode !== "reconnecting") return null;
  return <div className="reconnect-overlay" role="status"><span className="loading-pulse" /><strong>Reconnecting to the siege</strong><small>Holding the last safe world. Commands are paused until authority confirms the next version.</small></div>;
}

function ActiveAttackChip() {
  const mode = useSiegeStore((state) => state.mode);
  const activeAttack = useSiegeStore((state) => state.snapshot?.activeAttack ?? null);
  if (!activeAttack || (mode !== "spectator" && mode !== "empty")) return null;
  return <div className="critical-notice" role="status"><span className="live-dot" /> {activeAttack.label} · shot {activeAttack.shotNumber} incoming</div>;
}

function LiveTicker() {
  const snapshot = useSiegeStore((state) => state.snapshot);
  const [event, setEvent] = useState<{ eventSequence: number; type: string; targetId: string | null; damage: number | null; projectileType?: "STANDARD" | "BREAKER" } | null>(null);
  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      try {
        const response = await fetch(`${authorityApiUrl("/events")}?limit=1`, { cache: "no-store" });
        if (!response.ok) return;
        const payload = await response.json() as { events?: typeof event[] };
        const latest = payload.events?.[0] ?? null;
        if (!cancelled && latest) setEvent(latest);
      } catch {}
    };
    void refresh();
    const timer = window.setInterval(() => void refresh(), 4_000);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, [snapshot?.worldVersion]);
  if (!event || !snapshot) return null;
  const copy = event.targetId ? impactLabel(event.targetId, event.damage ?? 0, event.projectileType ?? "STANDARD", snapshot) : "The live world changed";
  return <div className="live-ticker" role="status" aria-live="polite"><span className="live-dot" /> LAST IMPACT <strong>{copy}</strong><small>event {event.eventSequence}</small></div>;
}

function CriticalNotice() {
  const snapshot = useSiegeStore((state) => state.snapshot);
  const percent = snapshot?.reign ? snapshot.reign.coreIntegrity / snapshot.reign.coreMaxIntegrity : 1;
  if (percent > 0.25 || !snapshot?.reign) return null;
  return <div className="critical-notice" role="status"><span className="live-dot" /> CORE CRITICAL · every impact matters</div>;
}

function DebugOverlay() {
  const snapshot = useSiegeStore((state) => state.snapshot);
  const mode = useSiegeStore((state) => state.mode);
  const [enabled] = useState(() => typeof window !== "undefined" && new URL(window.location.href).searchParams.get("debug") === "1" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"));
  const [camera, setCamera] = useState<{ position: { x: number; y: number; z: number }; fov: number } | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const read = () => {
      const current = window.__THREE_GAME_DIAGNOSTICS__?.camera;
      setCamera(current ? { position: { x: current.position.x, y: current.position.y, z: current.position.z }, fov: current.fov } : null);
    };
    read();
    const timer = window.setInterval(read, 250);
    return () => window.clearInterval(timer);
  }, [enabled]);
  if (!enabled || !snapshot) return null;
  const damaged = snapshot.components.filter((component) => component.state !== "INTACT").map((component) => `${component.componentId}:${component.state}`).join(" · ") || "none";
  return <aside className="debug-overlay" aria-label="Local scene diagnostics"><strong>LOCAL DIAGNOSTICS</strong><span>mode {mode} · phase {snapshot.phase}</span><span>world v{snapshot.worldVersion} · reign {snapshot.currentReignId ?? "none"}</span><span>generator {snapshot.generatorVersion}</span><span>camera {camera ? `${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)} · fov ${camera.fov.toFixed(1)}` : "waiting"}</span><span>damage {damaged}</span></aside>;
}

function CheckoutStatus() {
  const [status, setStatus] = useState<"checking" | "confirmed" | "pending" | "failed">("checking");
  const mounted = useSyncExternalStore(() => () => undefined, () => true, () => false);
  const [dismissed, setDismissed] = useState(false);
  const visible = mounted && !dismissed && new URLSearchParams(window.location.search).get("checkout") === "return";
  useEffect(() => {
    if (!visible) return;
    const expected = (() => {
      try {
        const stored = window.sessionStorage.getItem("siegeme:checkout-intent");
        return stored ? JSON.parse(stored) as { purchaseKind: "ATTACK_PACK" | "DEFENSE_PACK"; baselineQuantity: number; intentId?: string } : null;
      } catch {
        return null;
      }
    })();
    let attempts = 0;
    let timer: number | undefined;
    const check = async () => {
      attempts += 1;
      try {
        const response = await fetch(authorityApiUrl("/entitlements"), { credentials: "include", cache: "no-store" });
        const payload = await response.json() as { entitlements?: Array<{ kind: string; quantityRemaining: number }> };
        const quantity = expected ? payload.entitlements?.find((item) => item.kind === expected?.purchaseKind)?.quantityRemaining ?? 0 : 0;
        if (response.ok && expected && quantity > expected.baselineQuantity) {
          setStatus("confirmed");
          window.sessionStorage.removeItem("siegeme:checkout-intent");
          return;
        }
        if (expected?.intentId) {
          const intentResponse = await fetch(`${authorityApiUrl("/checkout/status")}?intentId=${encodeURIComponent(expected.intentId)}`, { credentials: "include", cache: "no-store" });
          const intent = await intentResponse.json() as { status?: string };
          if (intentResponse.ok && intent.status === "FAILED") { setStatus("failed"); return; }
        }
      } catch {}
      if (attempts >= 5) setStatus("pending");
      else timer = window.setTimeout(() => void check(), 2500);
    };
    void check();
    return () => { if (timer) window.clearTimeout(timer); };
  }, [visible]);
  if (!visible) return null;
  return <div className={`checkout-status checkout-${status}`} role="status"><strong>{status === "checking" ? "Confirming payment…" : status === "confirmed" ? "Payment confirmed" : status === "failed" ? "Payment could not be confirmed" : "Payment is still confirming"}</strong><span>{status === "confirmed" ? "Your matching confirmed entitlement is ready at the throne." : status === "failed" ? "The purchase intent failed without granting shots. Open Attack to try again." : "The server is waiting for the matching entitlement. You can check again from Attack or Defend."}</span><button onClick={() => setDismissed(true)} aria-label="Dismiss payment status">×</button></div>;
}

function protectionActive(snapshot: PublicWorldSnapshot | null, skewMs = 0) {
  return (snapshot?.coronation?.protectedUntil ?? 0) > serverNow(Date.now(), skewMs);
}

function PrimaryActions() {
  const mode = useSiegeStore((state) => state.mode);
  const openSheet = useSiegeStore((state) => state.openSheet);
  const snapshot = useSiegeStore((state) => state.snapshot);
  const skew = useSiegeStore((state) => state.serverClockSkewMs);
  if ((mode !== "spectator" && mode !== "empty" && mode !== "defeat-cinematic") || protectionActive(snapshot, skew)) return null;
  return (
    <div className="primary-actions">
      {mode === "spectator" ? (
        <>
          <button className="action-button action-attack" onClick={() => openSheet("attack")}><span>Attack</span><small>buy 3 shots · {formatMoney(300)}</small></button>
          <button className="action-button action-defend" onClick={() => openSheet("defend")}><span>Defend</span><small>shield the hold · from {formatMoney(snapshot?.reign?.nextDefensePriceMinor ?? DEFENSE_BASE_PRICE_MINOR)}</small></button>
        </>
      ) : (
        <button className="claim-button" onClick={() => openSheet("coronation")}><span>Claim the throne</span><small>publish your identity and begin a reign</small></button>
      )}
    </div>
  );
}

function DefeatCinematic() {
  const mode = useSiegeStore((state) => state.mode);
  const openSheet = useSiegeStore((state) => state.openSheet);
  const snapshot = useSiegeStore((state) => state.snapshot);
  if (mode !== "defeat-cinematic" || snapshot?.phase !== "CORONATION") return null;
  return <div className="defeat-cinematic" role="status"><span className="eyebrow">THE CORE HAS FALLEN</span><strong>The throne is open.</strong><small>The decisive conqueror may publish the next reign.</small><button className="secondary-action" onClick={() => openSheet("coronation")}>Claim the throne <span>→</span></button></div>;
}

function DefensePlacementHud() {
  const mode = useSiegeStore((state) => state.mode);
  const placement = useSiegeStore((state) => state.defensePlacement);
  const snapshot = useSiegeStore((state) => state.snapshot);
  const cancel = useSiegeStore((state) => state.cancelDefense);
  const submit = useSiegeStore((state) => state.submitDefensePlacement);
  const error = useSiegeStore((state) => state.attackError);
  if (mode !== "defense-placement" || !placement) return null;
  const label = placement.slotId.replace(/^(shield_slot|brace_slot):/, "").replaceAll("_", " ");
  return <div className="defense-placement-hud" role="dialog" aria-label="Defense placement"><div><span className="eyebrow">DEFENSE PLACEMENT · {placement.type}</span><strong>{label}</strong><small>{snapshot?.worldVersion ? `live world ${snapshot.worldVersion} · confirm to anchor this defense` : "checking live world"}</small></div><div className="defense-placement-actions"><button className="secondary-action" onClick={cancel}>Cancel</button><button className="sheet-primary" onClick={() => void submit()}>Confirm placement<span>→</span></button></div>{error && <p className="error-note" role="alert">{error}</p>}</div>;
}

function LiveMeta() {
  const snapshot = useSiegeStore((state) => state.snapshot);
  const skew = useSiegeStore((state) => state.serverClockSkewMs);
  const openSheet = useSiegeStore((state) => state.openSheet);
  const router = useRouter();
  if (!snapshot?.reign) return null;
  return (
    <div className="live-meta"><span className="live-dot" /> LIVE REIGN {snapshot.reign.ordinal.toString().padStart(2, "0")}<span className="meta-divider" />{formatDuration(snapshot.reign.startedAt, skew)}<button onClick={() => openSheet("details")} aria-label="Open siege details">details ↗</button><button onClick={() => openSheet("share")} aria-label="Share this reign">share ↗</button><button onClick={() => openSheet("how")} aria-label="How the siege works">how ↗</button><button onClick={() => openSheet("recovery")} aria-label="Open recovery">recover ↗</button><button onClick={() => router.push("/history")}>history ↗</button></div>
  );
}

function ProtectionNotice() {
  const protectedUntil = useSiegeStore((state) => state.snapshot?.coronation?.protectedUntil ?? null);
  const skew = useSiegeStore((state) => state.serverClockSkewMs);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!protectedUntil) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [protectedUntil]);
  const authorityNow = serverNow(now, skew);
  if (!protectedUntil || protectedUntil <= authorityNow) return null;
  return <div className="protection-notice" role="status" aria-live="polite"><span className="live-dot" /> NEW REIGN PROTECTED · {Math.ceil((protectedUntil - authorityNow) / 1000)}s</div>;
}

function Sheet({ children, title, onClose }: { children: React.ReactNode; title: string; onClose: () => void }) {
  return <div className="sheet-backdrop" onClick={onClose}><section className="sheet" role="dialog" aria-modal="true" aria-labelledby="siege-sheet-title" onClick={(event) => event.stopPropagation()}><div className="sheet-handle" /><button className="sheet-close" onClick={onClose} aria-label="Close">×</button><p className="eyebrow">SIEGE ME / LIVE WORLD</p><h2 id="siege-sheet-title">{title}</h2>{children}</section></div>;
}

function SoundControls() {
  const [settings, setSettings] = useState<AudioSettings>(() => readAudioSettings());
  useEffect(() => {
    const update = (event: Event) => {
      const detail = (event as CustomEvent<AudioSettings>).detail;
      if (detail) setSettings(detail);
    };
    window.addEventListener("siegeme:audio-settings", update);
    return () => window.removeEventListener("siegeme:audio-settings", update);
  }, []);
  const update = (next: AudioSettings) => setSettings(saveAudioSettings(next));
  return <fieldset className="audio-controls"><legend>SOUND</legend><label className="form-field">IMPACT VOLUME <span>{Math.round(settings.effectsVolume * 100)}%</span><input type="range" min="0" max="1" step="0.05" value={settings.effectsVolume} onChange={(event) => update({ ...settings, effectsVolume: Number(event.target.value), muted: false })} /></label><button className="secondary-action" onClick={() => update({ ...settings, muted: !settings.muted })}>{settings.muted ? "Unmute impact sound" : "Mute impact sound"}</button></fieldset>;
}

function ContextSheet() {
  const activeSheet = useSiegeStore((state) => state.activeSheet);
  const closeSheet = useSiegeStore((state) => state.closeSheet);
  const snapshot = useSiegeStore((state) => state.snapshot);
  const skew = useSiegeStore((state) => state.serverClockSkewMs);
  const shotLog = useSiegeStore((state) => state.shotLog);
  const resetAttack = useSiegeStore((state) => state.resetAttack);
  const [checkoutState, setCheckoutState] = useState<"idle" | "loading" | "error">("idle");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [identityType, setIdentityType] = useState("Person");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [message, setMessage] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [ctaChoice, setCtaChoice] = useState("VISIT");
  const [coronationState, setCoronationState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [recoveryCode, setRecoveryCode] = useState<string | null>(null);
  const [recoveryState, setRecoveryState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [recoveryInput, setRecoveryInput] = useState("");
  const [entitlementStatus, setEntitlementStatus] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{ id: string; ordinal: number; endedAt: number | null; summary: PublicWorldSnapshot | null }>>([]);
  const [events, setEvents] = useState<Array<{ eventSequence: number; type: string; createdAt: number; targetId: string | null; damage: number | null; projectileType?: "STANDARD" | "BREAKER" }>>([]);
  const [contributors, setContributors] = useState<Array<{ playerLabel: string; damage: number; coreDamage: number; defensesPlaced: number; titles: string[] }>>([]);
  const [historyStatus, setHistoryStatus] = useState<"idle" | "loading" | "ready" | "error">("loading");
  const [eventsStatus, setEventsStatus] = useState<"idle" | "loading" | "ready" | "error">("loading");
  const [contributorsStatus, setContributorsStatus] = useState<"idle" | "loading" | "ready" | "error">("loading");
  const claimTurn = useSiegeStore((state) => state.claimTurn);
  const turnStatus = useSiegeStore((state) => state.turnStatus);
  const turnError = useSiegeStore((state) => state.attackError);
  const queuePosition = useSiegeStore((state) => state.queuePosition);

  useEffect(() => {
    if (activeSheet !== "details") return;
    let cancelled = false;
    void fetch(`${authorityApiUrl("/history")}?limit=3`, { cache: "no-store" }).then(async (response) => {
      if (!response.ok) throw new Error("history unavailable");
      const payload = await response.json() as { reigns?: Array<{ id: string; ordinal: number; endedAt: number | null; summary: PublicWorldSnapshot | null }> };
      if (!cancelled) { setHistory(payload.reigns ?? []); setHistoryStatus("ready"); }
    }).catch(() => { if (!cancelled) setHistoryStatus("error"); });
    void fetch(`${authorityApiUrl("/events")}?limit=8`, { cache: "no-store" }).then(async (response) => {
      if (!response.ok) throw new Error("events unavailable");
      const payload = await response.json() as { events?: typeof events };
      if (!cancelled) { setEvents(payload.events ?? []); setEventsStatus("ready"); }
    }).catch(() => { if (!cancelled) setEventsStatus("error"); });
    if (snapshot?.currentReignId) {
      void fetch(`${authorityApiUrl("/contributors")}?reignId=${encodeURIComponent(snapshot.currentReignId)}`, { cache: "no-store" }).then(async (response) => {
        if (!response.ok) throw new Error("contributors unavailable");
        const payload = await response.json() as { contributors?: typeof contributors };
        if (!cancelled) { setContributors(payload.contributors ?? []); setContributorsStatus("ready"); }
      }).catch(() => { if (!cancelled) setContributorsStatus("error"); });
    }
    return () => { cancelled = true; };
  }, [activeSheet, snapshot?.currentReignId]);

  async function startCheckout(purchaseKind: "ATTACK_PACK" | "DEFENSE_PACK") {
    setCheckoutState("loading");
    setCheckoutError(null);
    try {
      let baselineQuantity = 0;
      try {
        const entitlementResponse = await fetch(authorityApiUrl("/entitlements"), { credentials: "include", cache: "no-store" });
        const entitlementPayload = await entitlementResponse.json() as { entitlements?: Array<{ kind: string; quantityRemaining: number }> };
        baselineQuantity = entitlementPayload.entitlements?.find((item) => item.kind === purchaseKind)?.quantityRemaining ?? 0;
      } catch {}
      const response = await fetch(authorityApiUrl("/checkout"), { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ purchase_kind: purchaseKind }) });
      const payload = await response.json() as { checkoutUrl?: string; sessionId?: string; error?: string };
      if (!response.ok || !payload.checkoutUrl) {
        setCheckoutState("error");
        setCheckoutError(payload.error ?? "Dodo checkout is unavailable.");
        return;
      }
      const intentId = payload.sessionId ?? new URL(payload.checkoutUrl, window.location.origin).searchParams.get("intent");
      window.sessionStorage.setItem("siegeme:checkout-intent", JSON.stringify({ purchaseKind, baselineQuantity, intentId }));
      window.location.assign(payload.checkoutUrl);
    } catch {
      setCheckoutState("error");
      setCheckoutError("The secure checkout could not be reached. Try again.");
    }
  }

  async function startAttackCheckout() { return startCheckout("ATTACK_PACK"); }

  async function confirmEntitlements() {
    setCheckoutState("loading");
    setCheckoutError(null);
    try {
      const response = await fetch(authorityApiUrl("/entitlements"), { credentials: "include", cache: "no-store" });
      const payload = await response.json() as { entitlements?: Array<{ kind: string; quantityRemaining: number }>; error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Entitlements could not be checked");
      const attack = payload.entitlements?.find((item) => item.kind === "ATTACK_PACK")?.quantityRemaining ?? 0;
      const defense = payload.entitlements?.find((item) => item.kind === "DEFENSE_PACK")?.quantityRemaining ?? 0;
      setEntitlementStatus(`${attack} attack shots · ${defense} defense placements confirmed`);
      setCheckoutState("idle");
    } catch (error) {
      setCheckoutState("error");
      setCheckoutError(error instanceof Error ? error.message : "Entitlements could not be checked");
    }
  }

  const beginDefense = useSiegeStore((state) => state.beginDefense);

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
      const response = await fetch(authorityApiUrl("/identity"), { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ displayName, identityType, destinationUrl: destinationUrl || null, message: message || null, socialHandle: socialHandle || null, ctaChoice }) });
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
  if (activeSheet === "share") {
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/reigns/${snapshot?.currentReignId ?? "current"}` : "https://siegeme.com";
    const shareCardUrl = typeof window !== "undefined" ? `${window.location.origin}/api/share-card/${encodeURIComponent(snapshot?.currentReignId ?? "current")}` : "https://api.siegeme.com/share-card/current.svg";
    const share = async () => {
      if (navigator.share) await navigator.share({ title: "Siege Me", text: "Watch the live global siege.", url: shareUrl });
      else await navigator.clipboard?.writeText(shareUrl);
    };
    return <Sheet title="Share the live siege" onClose={closeSheet}><p className="sheet-lede">Send the current reign to someone who wants to watch the fortress fall.</p><div className="share-link"><span>LIVE REIGN LINK</span><strong>{shareUrl}</strong></div><button className="sheet-primary" onClick={() => void share()}>Copy or share link<span>↗</span></button><a className="secondary-action share-card-link" href={shareCardUrl} target="_blank" rel="noreferrer">Open share card<span>↗</span></a><p className="muted-note">The link is a public view. It never grants payment, authority, or identity access. The card is a deterministic public summary.</p></Sheet>;
  }
  if (activeSheet === "summary") {
    const totalDamage = shotLog.reduce((total, shot) => total + shot.damage, 0);
    const coreShots = shotLog.filter((shot) => shot.targetId === "core:main").length;
    return <Sheet title="Your shots are spent" onClose={() => { closeSheet(); resetAttack(); }}><p className="sheet-lede">Every paid attempt in this pack has been resolved by the live authority. Outcomes are recorded against this reign for everyone.</p><div className="detail-grid"><span><strong>{shotLog.length}</strong>shots fired</span><span><strong>{totalDamage}</strong>total damage</span><span><strong>{coreShots}</strong>core hits</span><span><strong>{shotLog.filter((shot) => shot.targetId === "miss").length}</strong>misses</span></div>{shotLog.length > 0 && <div className="history-list"><span className="card-label">SHOT RECORD</span>{shotLog.map((shot, index) => <div key={`${shot.targetId}:${index}`}><strong>SHOT {index + 1}</strong><small>{shot.targetId.replace(":", " ")} · −{shot.damage}</small></div>)}</div>}<button className="sheet-primary" onClick={() => { closeSheet(); resetAttack(); }}>Back to the siege<span>→</span></button><p className="muted-note">Another pack can be bought at any time — unused packs never expire with the reign.</p></Sheet>;
  }
  if (activeSheet === "coronation") return <Sheet title="Take the throne" onClose={closeSheet}><p className="sheet-lede">Your decisive shot opened a new reign. Publish a bounded public identity and the fortress will be regenerated for everyone.</p><div className="form-grid"><label className="form-field">DISPLAY NAME<input value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={48} placeholder="Your name" /></label><label className="form-field">IDENTITY TYPE<select value={identityType} onChange={(event) => setIdentityType(event.target.value)}><option>Person</option><option>Company</option><option>Product</option><option>Project</option><option>Community</option><option>Campaign</option><option>Creator</option></select></label><label className="form-field full-field">DESTINATION URL <span className="field-optional">OPTIONAL</span><input value={destinationUrl} onChange={(event) => setDestinationUrl(event.target.value)} maxLength={2048} placeholder="https://..." /></label><label className="form-field">SOCIAL HANDLE <span className="field-optional">OPTIONAL</span><input value={socialHandle} onChange={(event) => setSocialHandle(event.target.value)} maxLength={41} placeholder="@yourname" /></label><label className="form-field">CTA<select value={ctaChoice} onChange={(event) => setCtaChoice(event.target.value)}><option value="VISIT">Visit</option><option value="FOLLOW">Follow</option><option value="LEARN_MORE">Learn more</option><option value="SUPPORT">Support</option></select></label><label className="form-field full-field">MESSAGE <span className="field-optional">OPTIONAL</span><textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={160} placeholder="A short message for the live world" /></label></div><button className="sheet-primary" onClick={submitCoronation} disabled={coronationState === "loading" || !displayName.trim()}>{coronationState === "loading" ? "Starting the new reign…" : "Publish and begin reign"}<span>→</span></button><button className="secondary-action" onClick={createRecoveryCode} disabled={recoveryState === "loading"}>{recoveryState === "loading" ? "Creating recovery code…" : "Create cross-device recovery code"}</button>{recoveryCode && <div className="recovery-code"><span>STORE THIS ONCE</span><strong>{recoveryCode}</strong><small>It expires in 30 days and can be used once.</small></div>}{(checkoutError || recoveryError) && <p className="error-note" role="alert">{checkoutError ?? recoveryError}</p>}<p className="muted-note">Automated safety moderation checks identity type, markup, URL scheme, private hosts, and field limits before the identity is published.</p></Sheet>;
  if (activeSheet === "recovery") return <Sheet title="Recover a reign" onClose={closeSheet}><p className="sheet-lede">Paste the one-time recovery code created during coronation. This restores the silent player identity on this device without adding a login wall.</p><label className="form-field full-field">RECOVERY CODE<input value={recoveryInput} onChange={(event) => setRecoveryInput(event.target.value.toUpperCase())} placeholder="SIEGE-..." autoCapitalize="characters" /></label><button className="sheet-primary" onClick={claimRecovery} disabled={recoveryState === "loading" || !recoveryInput.trim()}>{recoveryState === "loading" ? "Checking code…" : "Restore identity"}<span>→</span></button>{recoveryError && <p className="error-note" role="alert">{recoveryError}</p>}<p className="muted-note">Codes are hashed in D1 and cannot be displayed again after creation.</p></Sheet>;
  if (activeSheet === "identity") return <Sheet title={snapshot?.ruler?.displayName ?? "The ruler"} onClose={closeSheet}><div className="identity-sheet"><div className="large-avatar">FH</div><div><p className="sheet-kicker">CURRENT RULER · {snapshot?.ruler?.identityType}</p><p className="sheet-message">{snapshot?.ruler?.message}</p><div className="sheet-stats"><span><strong>{snapshot?.reign?.ordinal.toString().padStart(2, "0")}</strong>reign</span><span><strong>{snapshot?.reign ? formatDuration(snapshot.reign.startedAt, skew) : "--"}</strong>duration</span><span><strong>{snapshot?.worldVersion}</strong>world version</span></div></div></div><p className="muted-note">Identity details are locked to this reign. Destination links will appear here only after a moderated public identity is published.</p></Sheet>;
  if (activeSheet === "attack") return <Sheet title="Choose your angle" onClose={closeSheet}><p className="sheet-lede">A paid pack is three finite shots. Buy the pack first, then claim one live turn before aiming.</p><div className="purchase-card"><div><span className="card-label">ATTACK PACK</span><strong>3 shots</strong><small>one-time · outcome depends on aim and the live fortress</small></div><span className="price">$3</span></div><button className="sheet-primary" onClick={startAttackCheckout} disabled={checkoutState === "loading"}>{checkoutState === "loading" ? "Opening secure checkout…" : "Buy 3 shots"}<span>→</span></button><button className="secondary-action" onClick={() => void confirmEntitlements()} disabled={checkoutState === "loading"}>Check confirmed shots</button><button className="secondary-action" onClick={() => void claimTurn()} disabled={turnStatus === "claiming"}>{turnStatus === "claiming" ? "Claiming live turn…" : turnStatus === "queued" ? "Queued for next turn" : "Use confirmed shots · claim turn"}</button>{entitlementStatus && <p className="confirmed-note">{entitlementStatus}</p>}{turnStatus === "queued" && <p className="queue-note" role="status">Queued for the next live turn{queuePosition ? ` · position ${queuePosition}` : ""}. This sheet can stay open while the authority promotes you.</p>}{(checkoutError || (turnStatus !== "queued" && turnError)) && <p className="error-note" role="alert">{checkoutError ?? turnError}</p>}<p className="muted-note">Keyboard controls: arrows or A/D/W/S aim, +/- changes power, Space or Enter fires once a live turn is active.</p><p className="muted-note">Dodo confirms payment on the server. A checkout return never grants shots by itself.</p></Sheet>;
  if (activeSheet === "defend") { const slots = snapshot ? generateFortress(snapshot.worldSeed, snapshot.generatorVersion).defenseSlots.filter((slot) => !snapshot.activeDefenses.some((defense) => defense.slotId === slot.id)) : []; const braceEligible = snapshot?.components.some((component) => component.state === "DAMAGED" || component.state === "CRITICAL") ?? false; return <Sheet title="Hold the line" onClose={closeSheet}><p className="sheet-lede">Choose a finite shield or brace between live turns. Defense delays destruction, but never heals the Core.</p><div className="defense-options"><div><span className="option-icon">◌</span><strong>Shield</strong><small>absorbs two projectile impacts at the selected approach</small><button className="secondary-action" onClick={() => startCheckout("DEFENSE_PACK")} disabled={checkoutState === "loading"}>Buy shield · {formatMoney(snapshot?.reign?.nextDefensePriceMinor ?? DEFENSE_BASE_PRICE_MINOR)}</button>{slots.filter((slot) => slot.type === "SHIELD").map((slot) => <button className="secondary-action" key={slot.id} onClick={() => { beginDefense("SHIELD", slot.id); closeSheet(); }}>Preview {slot.id.replace("shield_slot:", "").replaceAll("_", " ")}</button>)}</div><div><span className="option-icon">⌗</span><strong>Brace</strong><small>absorbs one projectile impact and protects a damaged structure</small><button className="secondary-action" onClick={() => startCheckout("DEFENSE_PACK")} disabled={checkoutState === "loading"}>Buy brace · {formatMoney(snapshot?.reign?.nextDefensePriceMinor ?? DEFENSE_BASE_PRICE_MINOR)}</button>{braceEligible ? slots.filter((slot) => slot.type === "BRACE").map((slot) => <button className="secondary-action" key={slot.id} onClick={() => { beginDefense("BRACE", slot.id); closeSheet(); }}>Preview {slot.id.replace("brace_slot:", "").replaceAll("_", " ")}</button>) : <p className="muted-note">BRACE unlocks after a structure is damaged or critical.</p>}</div></div>{checkoutError && <p className="error-note" role="alert">{checkoutError}</p>}<p className="muted-note">The next placement raises the price. Placement is checked against the live slot and world version after you confirm.</p></Sheet>; }
  if (activeSheet === "how") return <Sheet title="How the siege works" onClose={closeSheet}><div className="how-steps"><div><strong>01 · Watch</strong><span>Everyone sees the same fortress and versioned world.</span></div><div><strong>02 · Choose</strong><span>Attackers buy finite shots. Defenders place finite shields and braces.</span></div><div><strong>03 · Aim</strong><span>Drag the world to set yaw, elevation, and power. The authority resolves the shot.</span></div><div><strong>04 · Rule</strong><span>When the Core falls, the decisive conqueror can publish the next reign.</span></div></div><SoundControls /><p className="muted-note">Payments confirm on the server. Redirects, local animations, and client predictions never grant damage or ownership.</p></Sheet>;
  return <Sheet title="The siege, at a glance" onClose={closeSheet}><div className="detail-grid"><span><strong>{snapshot?.reign?.siegeCharge ?? 0}%</strong>siege charge</span><span><strong>{snapshot?.reign?.royalGuardCharge ?? 0}%</strong>royal guard{snapshot?.reign?.royalShieldPulseArmed ? " · pulse armed" : ""}</span><span><strong>{snapshot?.worldVersion}</strong>state version</span><span><strong>{snapshot?.components.filter((item) => item.state === "DESTROYED").length}</strong>structures down</span></div><p className="muted-note">This view is the versioned snapshot received from the Cloudflare siege authority.</p>{contributorsStatus === "loading" && <p className="muted-note">Loading reign contributors…</p>}{contributorsStatus === "error" && <p className="error-note" role="alert">Contribution records are temporarily unavailable.</p>}{contributors.length > 0 && <div className="history-list"><span className="card-label">REIGN CONTRIBUTORS</span>{contributors.slice(0, 5).map((contributor) => <div key={contributor.playerLabel}><strong>{contributor.titles[0] ?? contributor.playerLabel}</strong><small>{contributor.damage} damage · {contributor.coreDamage} Core · {contributor.defensesPlaced} defenses</small></div>)}</div>}{eventsStatus === "loading" && <p className="muted-note">Loading recent impacts…</p>}{eventsStatus === "error" && <p className="error-note" role="alert">Recent impacts are temporarily unavailable.</p>}{eventsStatus === "ready" && events.length === 0 && <p className="muted-note">No recent impacts are recorded in the retained event window.</p>}{events.length > 0 && <div className="history-list"><span className="card-label">RECENT IMPACTS</span>{events.map((event) => <div key={event.eventSequence}><strong>{event.type === "ATTACK_RESOLVED" ? "IMPACT" : "DEFENSE"}</strong><small>{event.targetId ? impactLabel(event.targetId, event.damage ?? 0, event.projectileType ?? "STANDARD", snapshot) : "world state changed"}</small></div>)}</div>}{historyStatus === "loading" && <p className="muted-note">Loading recent reigns…</p>}{historyStatus === "error" && <p className="error-note" role="alert">Recent reigns are temporarily unavailable.</p>}{historyStatus === "ready" && history.length === 0 && <p className="muted-note">No archived reigns are available yet.</p>}{history.length > 0 && <div className="history-list"><span className="card-label">RECENT REIGNS</span>{history.map((reign) => <div key={reign.id}><strong>REIGN {String(reign.ordinal).padStart(2, "0")}</strong><small>{reign.endedAt ? new Date(reign.endedAt).toLocaleDateString() : "active"} · {reign.summary?.components.filter((item) => item.state === "DESTROYED").length ?? 0} structures down</small></div>)}</div>}</Sheet>;
}

function AttackControls() {
  const aim = useSiegeStore((state) => state.attackAim);
  const reset = useSiegeStore((state) => state.resetAttack);
  const mode = useSiegeStore((state) => state.mode);
  const result = useSiegeStore((state) => state.lastResult);
  const error = useSiegeStore((state) => state.attackError);
  const impact = useSiegeStore((state) => state.impactEffect);
  const remainingShots = useSiegeStore((state) => state.remainingShots);
  const breakerShotsRemaining = useSiegeStore((state) => state.breakerShotsRemaining);
  const claimTurn = useSiegeStore((state) => state.claimTurn);
  const cancelTurn = useSiegeStore((state) => state.cancelTurn);
  const turnStatus = useSiegeStore((state) => state.turnStatus);
  const turn = useSiegeStore((state) => state.turn);
  const skew = useSiegeStore((state) => state.serverClockSkewMs);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!turn) return;
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [turn]);
  if (!mode.startsWith("attack")) return (
    <>
      {error ? <div className="shot-result error-result" role="alert">{error}<button onClick={reset}>dismiss</button></div> : result ? <div className="shot-result" role="status">{result}{remainingShots !== null && remainingShots > 0 ? <><span className="confirmed-note">{remainingShots} shot{remainingShots === 1 ? "" : "s"} left</span><button onClick={() => void claimTurn()} disabled={turnStatus === "claiming"}>{turnStatus === "claiming" ? "claiming…" : "fire next shot"}</button></> : <button onClick={reset}>close</button>}</div> : null}
    </>
  );
  const remainingTurnSeconds = turn ? Math.max(0, Math.ceil((turn.expiresAt - serverNow(now, skew)) / 1000)) : null;
  return <div className="attack-hud" aria-live="polite"><div><span className="eyebrow">LIVE ATTACK · SERVER AUTHORITY</span><h2>{mode === "attack-flight" ? "Impact in progress" : mode === "attack-requesting" ? "Validating attack" : "Pull back. Pick a wall."}</h2><p>{mode === "attack-flight" ? "The committed impact is travelling to the fortress." : mode === "attack-requesting" ? "The siege authority is checking your entitlement and aim." : "Drag anywhere on the world, then release to fire."}</p><small className="input-help">Keyboard: arrows or A/D/W/S to aim, +/- to change power, Space or Enter to fire.</small></div><div className="attack-readout"><span>SHOT <strong>{turn ? `${turn.shotNumber}/3` : "-"}</strong></span><span>POWER <strong>{Math.round(aim.power * 100)}%</strong></span><span>AIM <strong>{aim.yaw < -0.2 ? "LEFT" : aim.yaw > 0.2 ? "RIGHT" : "CENTER"}</strong></span>{remainingShots !== null && <span>LEFT <strong>{remainingShots}</strong></span>}{remainingTurnSeconds !== null && <span>TURN <strong>{remainingTurnSeconds}s</strong></span>}{breakerShotsRemaining > 0 && <span>BREAKER <strong>{breakerShotsRemaining} READY</strong></span>}{mode === "attack-aim" && <button className="secondary-action attack-cancel" onClick={() => void cancelTurn()}>Release turn</button>}</div>{impact && <div className="damage-number" key={impact.key}>−{impact.damage}</div>}</div>;
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
    return JSON.stringify({ coordinateSystem: "world x left/right, y up, z front/back; screen camera is fixed 3/4", mode: state.mode, loadingStep: state.loadingStep, turnStatus: state.turnStatus, queuePosition: state.queuePosition, turn: state.turn ? { id: state.turn.id, reignId: state.turn.reignId, shotNumber: state.turn.shotNumber, expiresAt: state.turn.expiresAt } : null, aim: state.attackAim, projectile: state.projectile, impact: state.impactEffect, lastResult: state.lastResult, attackError: state.attackError, world: state.snapshot ? { phase: state.snapshot.phase, worldVersion: state.snapshot.worldVersion, coreIntegrity: state.snapshot.reign?.coreIntegrity ?? null, ruler: state.snapshot.ruler?.displayName ?? null, components: state.snapshot.components.filter((item) => item.state !== "INTACT").map((item) => `${item.componentId}:${item.state}`) } : null });
  }, []);

  useEffect(() => {
    window.render_game_to_text = worldText;
    window.advanceTime = (ms) => useSiegeStore.getState().advanceTime(ms);
    let cancelled = false;
    const query = new URLSearchParams(window.location.search);
    const empty = query.get("empty") === "1";
    const load = async () => {
      const probe = document.createElement("canvas");
      const graphicsSupported = Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
      if (!graphicsSupported) { setMode("unsupported"); return; }
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
          for (const message of flattenRealtimeMessages(JSON.parse(event.data))) {
            const typed = message as { type?: string; eventSequence?: number; snapshot?: PublicWorldSnapshot; delta?: PublicWorldDelta; projectileType?: "STANDARD" | "BREAKER"; impact?: { targetId: string; damage: number; point?: [number, number, number] | null } };
            if (typeof typed.eventSequence === "number") {
              const sequenceAction = realtimeSequenceAction(lastEventSequence, typed.eventSequence);
              if (sequenceAction === "resync") {
                useSiegeStore.getState().setResyncing(true);
                socket?.send("resync");
                return;
              }
              if (sequenceAction === "ignore") continue;
              lastEventSequence = typed.eventSequence;
            }
            if (typed.snapshot && (typed.type === "snapshot" || typed.type === "turn_claimed" || typed.type === "attack_resolved" || typed.type === "reign_started")) setRealtimeSnapshot(typed.snapshot);
            if (typed.delta && (typed.type === "attack_resolved" || typed.type === "defense_placed")) setRealtimeDelta(typed.delta);
            // Spectators see other players' impacts land (S04) without minting anything.
            if (typed.type === "attack_resolved" && typed.impact) {
              const state = useSiegeStore.getState();
              if ((state.mode === "spectator" || state.mode === "empty") && !state.projectile) {
                state.showImpact({ key: `remote-${typed.eventSequence ?? crypto.randomUUID()}`, targetId: typed.impact.targetId, damage: typed.impact.damage, projectileType: typed.projectileType ?? "STANDARD", impactPoint: typed.impact.point ?? null });
              }
            }
          }
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
      <DebugOverlay />
      <CheckoutStatus />
      {mode === "loading" && <div className="loading-screen"><ProductMark /><div className="loading-center"><div className="loading-sigil">✦</div><p className="eyebrow">THE GLOBAL THRONE</p><h1>Preparing the siege</h1><p className="loading-step"><span className="loading-pulse" />{loadingStep}</p></div><p className="loading-footer">one throne · one world · {productConfig.domain}</p></div>}
      {mode !== "loading" && mode !== "unavailable" && mode !== "unsupported" && <><header className="top-chrome"><ProductMark /><IdentityChip /><CoreIndicator /></header><LiveMeta /><ProtectionNotice /><ActiveAttackChip /><CriticalNotice /><LiveTicker /><ReconnectingOverlay /><DefeatCinematic /><PrimaryActions /><DefensePlacementHud /><AttackControls /><ContextSheet /></>}
      {mode === "unavailable" && <div className="unavailable-copy"><p className="eyebrow">LIVE AUTHORITY OFFLINE</p><h1>The siege is unavailable.</h1><p>This client will not substitute a local world. Start the Cloudflare authority or check the deployment configuration, then reconnect.</p><button className="sheet-primary" onClick={() => window.location.reload()}>Reconnect <span>↻</span></button></div>}
      {mode === "unsupported" && <div className="unavailable-copy"><p className="eyebrow">GRAPHICS UNAVAILABLE</p><h1>This browser cannot render the siege.</h1><p>Siege Me needs WebGL for the live fortress. Update your browser or enable hardware acceleration, then try again.</p><button className="sheet-primary" onClick={() => window.location.reload()}>Try again <span>↻</span></button></div>}
      {mode === "empty" && <div className="empty-copy"><p className="eyebrow">NO ACTIVE REIGN</p><h1>The throne is empty.</h1><p>There is no ruler to attack yet. The first coronation seeds the world for everyone.</p></div>}
    </main>
  );
}
