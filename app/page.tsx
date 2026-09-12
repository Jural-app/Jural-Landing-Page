import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Pillars } from "@/components/Pillars";
import { Conversation } from "@/components/Conversation";
import { Features } from "@/components/Features";
import { Trust } from "@/components/Trust";
import { Start } from "@/components/Start";
import { Faq, QA } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

/*
 * No offers or ratings: there is no public price and no review source yet, and
 * structured data has to match what the page can prove.
 */
const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "BusinessApplication",
  operatingSystem: "iOS, macOS",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/** Mirrors the visible FAQ word for word, as Google requires. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QA.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a.join(" ") },
  })),
};

export default function Home() {
  return (
    <main>
      <JsonLd data={appJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Header />
      <Hero />
      <Problem />
      <Conversation />
      <Features />
      <Pillars />
      <Trust />
      <Start />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
