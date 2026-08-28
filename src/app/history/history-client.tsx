"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Reign = { id: string; ordinal: number; startedAt: number; endedAt: number | null; summary: { ruler?: { displayName?: string } | null; reign?: { coreIntegrity?: number; coreMaxIntegrity?: number } | null } | null };
type Contributor = { playerLabel: string; damage: number; coreDamage: number; defensesPlaced: number; titles: string[] };

function dateLabel(value: number | null) {
  return value ? new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "active";
}

export default function HistoryClient() {
  const [reigns, setReigns] = useState<Reign[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/history?limit=20", { cache: "no-store" }).then(async (response) => {
      if (!response.ok) throw new Error("history unavailable");
      const payload = await response.json() as { reigns?: Reign[] };
      const loaded = payload.reigns ?? [];
      const contributorResponses = await Promise.all(loaded.slice(0, 8).map((reign) => fetch(`/api/contributors?reignId=${encodeURIComponent(reign.id)}`, { cache: "no-store" })));
      const contributorPayloads = await Promise.all(contributorResponses.filter((response) => response.ok).map((response) => response.json() as Promise<{ contributors?: Contributor[] }>));
      if (!cancelled) {
        setReigns(loaded);
        setContributors(contributorPayloads.flatMap((payload) => payload.contributors ?? []).sort((a, b) => b.damage - a.damage).slice(0, 10));
        setStatus("ready");
      }
    }).catch(() => { if (!cancelled) setStatus("error"); });
    return () => { cancelled = true; };
  }, []);

  return <main className="history-page"><header><p className="eyebrow">SIEGE ME / PUBLIC ARCHIVE</p><h1>Reign history</h1><p className="history-lede">Every completed reign leaves a public, privacy-safe record. Follow the timeline, then open a reign to inspect its final state and anonymous contribution board.</p><Link className="history-back" href="/">← Return to the live siege</Link></header>{status === "loading" && <p className="history-status" role="status">Loading the archive…</p>}{status === "error" && <p className="error-note" role="alert">The public archive is temporarily unavailable.</p>}{status === "ready" && reigns.length === 0 && <p className="history-status">No completed reigns are archived yet.</p>}{reigns.length > 0 && <section aria-labelledby="timeline-title"><div className="history-section-heading"><p className="eyebrow">S32 · TIMELINE</p><h2 id="timeline-title">The throne changes hands</h2></div><div className="timeline-list">{reigns.map((reign) => <Link className="timeline-card" key={reign.id} href={`/reigns/${encodeURIComponent(reign.id)}`}><span className="timeline-ordinal">REIGN {String(reign.ordinal).padStart(2, "0")}</span><strong>{reign.summary?.ruler?.displayName ?? "Unnamed reign"}</strong><small>{dateLabel(reign.startedAt)} → {dateLabel(reign.endedAt)}</small><span className="timeline-arrow">↗</span></Link>)}</div></section>}{contributors.length > 0 && <section aria-labelledby="hall-title"><div className="history-section-heading"><p className="eyebrow">S33 / S34 · HALL OF FAME</p><h2 id="hall-title">Contribution rankings</h2></div><div className="ranking-list">{contributors.map((contributor, index) => <div className="ranking-row" key={`${contributor.playerLabel}:${index}`}><span className="ranking-number">{String(index + 1).padStart(2, "0")}</span><strong>{contributor.titles[0] ?? contributor.playerLabel}</strong><small>{contributor.damage} damage · {contributor.coreDamage} Core · {contributor.defensesPlaced} defenses</small></div>)}</div></section>}</main>;
}
