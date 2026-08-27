import { Suspense } from "react";
import SandboxCheckoutClient from "./sandbox-client";

export const metadata = { title: "Test checkout · Siege Me", robots: { index: false, follow: false } };

export default function SandboxCheckoutPage() {
  return (
    <main className="sandbox-page">
      <Suspense fallback={<p className="sandbox-loading">Preparing test checkout…</p>}>
        <SandboxCheckoutClient />
      </Suspense>
    </main>
  );
}
