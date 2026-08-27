import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://api.siegeme.com wss://api.siegeme.com http://127.0.0.1:8787 ws://127.0.0.1:8787 http://localhost:8787 ws://localhost:8787; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" },
      ],
    }];
  },
  experimental: {
    optimizePackageImports: ["@react-three/drei"],
  },
};

export default nextConfig;
