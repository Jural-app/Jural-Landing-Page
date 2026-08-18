import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--f-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--f-mono", display: "swap" });

const title = "Jural — Your practice, minus the software";
const description =
  "An on-device AI that holds every matter, document and deadline you have — and the law that governs them. It answers, drafts, files and bills from one thread on your iPhone. Nothing it knows ever leaves the device.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jural.app"),
  title,
  description,
  openGraph: { title, description, type: "website", siteName: "Jural", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#faf9f7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
