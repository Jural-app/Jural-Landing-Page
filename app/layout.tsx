import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";

/* Body / UI: clean, neutral, legible at any size. */
const sans = Inter({ subsets: ["latin"], variable: "--f-sans", display: "swap" });
/* Display: the refined grotesque used across premium legal/AI products.
   Tighter and more assertive than Inter for large headlines. */
const display = Inter_Tight({ subsets: ["latin"], variable: "--f-display", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--f-mono", display: "swap" });

const title = "Jural: The Legal CRM Built for Attorneys";
const description =
  "Jural combines a premium legal CRM with AI agents that draft, bill, and follow up on matters, so your practice spends less time on admin and more time on clients.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", siteName: "Jural" },
};

export const viewport: Viewport = {
  themeColor: "#0e82e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
