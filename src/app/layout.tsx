import type { Metadata, Viewport } from "next";
import { productConfig } from "@/config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${productConfig.name} | ${productConfig.tagline}`,
  description: "One throne. One fortress. Everyone can take a shot.",
  metadataBase: new URL("https://siegeme.com"),
  openGraph: {
    title: `${productConfig.name} | ${productConfig.tagline}`,
    description: "One throne. One fortress. Everyone can take a shot.",
    url: "https://siegeme.com",
    siteName: productConfig.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
