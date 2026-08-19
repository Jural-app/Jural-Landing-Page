import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/**
 * Flip this one line to swap the whole site's sans. Both faces load as CSS
 * variables; only the active one is bound to --f-sans, which is what
 * globals.css reads for --font-sans.
 */
const SANS: "jakarta" | "geist" = "geist";

const geist = Geist({ subsets: ["latin"], variable: "--f-geist", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--f-jakarta", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--f-mono", display: "swap" });

const title = "Jural | Your whole practice, in one thread";
const description =
  "An AI pocket CRM for solo attorneys and small legal teams. Say what happened and Jural writes the time entry, drafts the letter, builds the invoice. The model runs on your iPhone, so client matters never leave the phone.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jural.app"),
  title,
  description,
  openGraph: { title, description, type: "website", siteName: "Jural", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${jakarta.variable} ${mono.variable}`}
      style={
        {
          "--f-sans": SANS === "jakarta" ? "var(--f-jakarta)" : "var(--f-geist)",
        } as React.CSSProperties
      }
    >
      <body>{children}</body>
    </html>
  );
}
