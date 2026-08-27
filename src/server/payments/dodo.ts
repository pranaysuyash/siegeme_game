import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

type DodoEnvironment = "test_mode" | "live_mode";

function getDodoEnvironment(): DodoEnvironment {
  return process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "live_mode" : "test_mode";
}

function dodoApiBaseUrl() {
  return getDodoEnvironment() === "live_mode" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";
}

export function dodoConfigured() {
  return Boolean(process.env.DODO_PAYMENTS_API_KEY && process.env.DODO_ATTACK_PRODUCT_ID);
}

export async function createAttackCheckout(input: { returnUrl: string; metadata: Record<string, string> }) {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  const productId = process.env.DODO_ATTACK_PRODUCT_ID;
  if (!apiKey || !productId) throw new Error("Dodo Payments is not configured");

  const response = await fetch(`${dodoApiBaseUrl()}/checkouts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      product_cart: [{ product_id: productId, quantity: 1 }],
      return_url: input.returnUrl,
      metadata: input.metadata,
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Dodo checkout failed with status ${response.status}`);
  return response.json() as Promise<{ session_id: string; checkout_url: string }>;
}

export function verifyDodoWebhook(rawBody: string, headers: Headers) {
  const secret = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  const webhookId = headers.get("webhook-id");
  const timestamp = headers.get("webhook-timestamp");
  const signatureHeader = headers.get("webhook-signature");
  if (!secret || !webhookId || !timestamp || !signatureHeader) return false;

  const encodedSecret = secret.startsWith("whsec_") ? secret.slice("whsec_".length) : secret;
  const signedPayload = `${webhookId}.${timestamp}.${rawBody}`;
  const expected = createHmac("sha256", Buffer.from(encodedSecret, "base64")).update(signedPayload).digest("base64");
  return signatureHeader.split(" ").some((candidate) => {
    const value = candidate.replace(/^v\d+,/, "");
    const actual = Buffer.from(value);
    const wanted = Buffer.from(expected);
    return actual.length === wanted.length && timingSafeEqual(actual, wanted);
  });
}
