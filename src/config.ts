export const productConfig = {
  name: "Siege Me",
  domain: "siegeme.com",
  tagline: "Rule or ruin.",
} as const;

export function isDodoConfigured() {
  return Boolean(process.env.DODO_PAYMENTS_API_KEY && process.env.DODO_ATTACK_PRODUCT_ID);
}
