import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { DemoForm } from "@/components/DemoForm";

export const metadata: Metadata = {
  title: "Book a demo | Jural",
  description:
    "Book a demo to see Jural on a real matter. The private, AI-native practice platform for solo attorneys and small law firms.",
};

/**
 * Split page: the form carries the left, an image carries the right.
 *
 * The nav stays, the footer does not. Someone who has already clicked "book a
 * demo" does not need a footer full of section links offering ways to leave
 * before they finish the form, but they do still need a way to go and check
 * something first without reaching for the back button.
 */
export default function DemoPage() {
  return (
    <main className="min-h-dvh bg-[var(--color-paper)]">
      <Header />

      <section className="mx-auto grid max-w-[1240px] gap-14 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:py-12">
        {/* ------------------------------------------------ left: the ask */}
        <div>
          <h1 className="max-w-[18ch] text-[clamp(1.95rem,1.2rem+1.7vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--color-ink)] [font-family:var(--font-display)]">
            See Jural on your own matters.
          </h1>

          <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
            Tell us where to reach you. We will be in touch within one business day to
            arrange a time.
          </p>

          <DemoForm />
        </div>

        {/* ----------------------------------------------- right: the image */}
        {/* Inset top and bottom so the image sits slightly shorter than the form
            column rather than matching it edge to edge. */}
        <aside className="lg:self-stretch lg:py-7">
          <div className="relative h-full min-h-[300px] overflow-hidden rounded-[28px] bg-[var(--color-canvas)]">
            {/* Decorative, so the alt is empty on purpose: it carries nothing the
                form does not already say. Swap for a product shot or a customer
                photo when there is one worth naming. */}
            <Image
              src="/cta-3.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              /* Pulled off centre so the crop keeps her in frame. */
              className="object-cover object-[35%_center]"
            />
          </div>
        </aside>
      </section>

      {/* Thin legal strip: the one piece of footer worth keeping on a page
          where someone is handing over their details. */}
      <div className="border-t border-[var(--color-line)]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-6 gap-y-2 px-5 py-5 text-[13px] text-[var(--color-ink-3)] sm:px-8">
          <a href="/security" className="transition-colors hover:text-[var(--color-ink)]">Security</a>
          <a href="/privacy" className="transition-colors hover:text-[var(--color-ink)]">Privacy</a>
          <a href="/terms" className="transition-colors hover:text-[var(--color-ink)]">Terms</a>
          <span className="ml-auto">&copy; 2026 Jural</span>
        </div>
      </div>
    </main>
  );
}
