import type { D1Database } from "@cloudflare/workers-types";
import { describe, expect, it } from "vitest";
import { buildGrantStatements, columnExists, shouldDeferForMissingIntent, type GrantInput } from "./payments";

function makeDb(tableColumns: Record<string, string[]>): D1Database {
  const handler = (sql: string) => {
    const stmt: Record<string, unknown> = {
      bind: () => stmt,
      run: async () => ({}) as never,
      first: async () => null,
      all: async () => {
        const match = /PRAGMA table_info\((\w+)\)/.exec(sql);
        const cols = match ? (tableColumns[match[1]] ?? []) : [];
        return { results: cols.map((name) => ({ name })) } as never;
      },
    };
    return stmt as never;
  };
  return { prepare: (sql: string) => handler(sql) } as unknown as D1Database;
}

const sampleGrant: GrantInput = {
  provider: "DODO",
  grantId: "g1",
  intentId: "intent-1",
  paymentId: "pay-1",
  playerId: "player-1",
  kind: "DEFENSE_PACK",
  quantity: 1,
};

describe("buildGrantStatements (SV-3 migration resilience)", () => {
  it("includes purchase_intent_id / intent_id when the columns exist", () => {
    const stmts = buildGrantStatements(true, true, sampleGrant, 1000);
    expect(stmts[0].sql).toContain("purchase_intent_id");
    expect(stmts[1].sql).toContain("intent_id");
    expect(stmts[0].args).toContain("intent-1");
  });

  it("omits purchase_intent_id / intent_id when the migration has not applied", () => {
    const stmts = buildGrantStatements(false, false, sampleGrant, 1000);
    expect(stmts[0].sql).not.toContain("purchase_intent_id");
    expect(stmts[1].sql).not.toContain("intent_id");
    expect(stmts[0].args).not.toContain("intent-1");
    expect(stmts[2].sql).toContain("UPDATE purchase_intents");
  });
});

describe("columnExists (SV-3)", () => {
  it("reports a present column", async () => {
    const db = makeDb({ payments_present: ["id", "purchase_intent_id"] });
    expect(await columnExists(db, "payments_present", "purchase_intent_id")).toBe(true);
  });

  it("reports an absent column without throwing", async () => {
    const db = makeDb({ payments_absent: ["id"] });
    expect(await columnExists(db, "payments_absent", "purchase_intent_id")).toBe(false);
  });
});

describe("shouldDeferForMissingIntent (SV-2)", () => {
  it("defers a first-seen paid event whose intent is not yet observed", () => {
    expect(shouldDeferForMissingIntent({ type: "payment.succeeded" }, false)).toBe(true);
  });

  it("does not defer a duplicate (retry path must attempt the grant)", () => {
    expect(shouldDeferForMissingIntent({ type: "payment.succeeded" }, true)).toBe(false);
  });

  it("does not defer non-payment events", () => {
    expect(shouldDeferForMissingIntent({ type: "refund.succeeded" }, false)).toBe(false);
  });
});
