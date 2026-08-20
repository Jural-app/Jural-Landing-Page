import Image from "next/image";

/**
 * Hero: a rounded inset panel filled with the blue background image.
 * Heading at the top, animated iPhone notification GIF peeking from the bottom.
 *
 * ▸ HEIGHT: fixed to one viewport minus the sticky header, so the whole hero
 *   is visible on a 13" screen without scrolling; the phone clips at the edge.
 */
export function Hero() {
  return (
    <section className="bg-white px-4 py-4 sm:px-6 sm:py-5">
      <div
        className="relative flex w-full flex-col items-center justify-start overflow-hidden rounded-[32px] px-6 pt-12 text-center sm:rounded-[44px] sm:pt-16"
        style={{
          height: "calc(100dvh - 160px)",
          background: "url('/hero-bg.jpg') center/cover no-repeat",
        }}
      >
        {/* Heading */}
        <h1 className="display text-white">
          Forget Traditional CRM.<br />
          Just Start Talking.
        </h1>

        {/* iPhone frame, pinned to bottom, peeks up, clipped by the panel edge */}
        <Image
          src="/phone.png"
          alt="Jural iOS app showing a case hearing alert"
          width={594}
          height={432}
          priority
          className="absolute bottom-0 left-1/2 w-[460px] max-w-[82%] -translate-x-1/2"
        />
      </div>
    </section>
  );
}
