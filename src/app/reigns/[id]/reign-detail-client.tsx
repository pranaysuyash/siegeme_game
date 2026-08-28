"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Reign = { id: string; ordinal: number; startedAt: number; endedAt: number | null; summary: { worldVersion?: number; components?: Array<{ state: string }>; ruler?: { displayName?: string; identityType?: string } | null } | null };
type Contributor = { playerLabel: string; shots: number; hits: number; damage: number; coreDamage: number; powerOrbHits: number; defensesPlaced: number; titles: string[] };

export default function ReignDetailClient({ reignId }: { reignId: string }) {
  const [reign, setReign] = useState<Reign | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    let cancelled = false;
    void Promise.all([fetch(`/api/reigns/${encodeURIComponent(reignId)}`, { cache: "no-store" }), fetch(`/api/contributors?reignId=${encodeURIComponent(reignId)}`, { cache: "no-store" })]).then(async ([reignResponse, contributorsResponse]) => {
      if (!reignResponse.ok) throw new Error("reign unavailable");
      const reignPayload = await reignResponse.json() as { reign?: Reign };
      const contributorPayload = contributorsResponse.ok ? await contributorsResponse.json() as { contributors?: Contributor[] } : { contributors: [] };
      if (!cancelled) { setReign(reignPayload.reign ?? null); setContributors(contributorPayload.contributors ?? []); setStatus(reignPayload.reign ? "ready" : "error"); }
    }).catch(() => { if (!cancelled) setStatus("error"); });
    return () => { cancelled = true; };
  }, [reignId]);
  const destroyed = reign?.summary?.components?.filter((component) => component.state === "DESTROYED").length ?? 0;
  return <main className="history-page reign-detail-page"><Link className="history-back" href="/history">← Back to reign history</Link>{status === "loading" && <p className="history-status" role="status">Loading reign record…</p>}{status === "error" && <p className="error-note" role="alert">This public reign record is unavailable.</p>}{reign && <><header><p className="eyebrow">PUBLIC REIGN {String(reign.ordinal).padStart(2, "0")}</p><h1>{reign.summary?.ruler?.displayName ?? "Unnamed reign"}</h1><p className="history-lede">{reign.summary?.ruler?.identityType ?? "Public identity"} · {new Date(reign.startedAt).toLocaleDateString()} → {reign.endedAt ? new Date(reign.endedAt).toLocaleDateString() : "active"}</p></header><section className="detail-grid history-metrics"><span><strong>{reign.summary?.worldVersion ?? "--"}</strong>final world version</span><span><strong>{destroyed}</strong>structures down</span><span><strong>{contributors.length}</strong>contributors</span></section><section aria-labelledby="contributors-title"><div className="history-section-heading"><p className="eyebrow">S34 · CONTRIBUTIONS</p><h2 id="contributors-title">Who moved the siege</h2></div>{contributors.length === 0 ? <p className="history-status">No contributor record is available for this reign.</p> : <div className="ranking-list">{contributors.map((contributor) => <div className="ranking-row" key={contributor.playerLabel}><strong>{contributor.titles[0] ?? contributor.playerLabel}</strong><small>{contributor.shots} shots · {contributor.hits} hits · {contributor.damage} damage · {contributor.coreDamage} Core · {contributor.powerOrbHits} Orb · {contributor.defensesPlaced} defenses</small></div>)}</div>}</section></>}</main>;
}
