import { ImageResponse } from "next/og";

/*
 * The card shown when a Jural link is shared (iMessage, Slack, LinkedIn, X) and
 * the fallback image for every page. Drawn from the hero: same eyebrow, same
 * headline, brand blue. Satori only lays out flexbox, so every box with more
 * than one child declares display: flex.
 */

export const alt = "Jural: the legal CRM you run by talking to it";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "white",
          background: "linear-gradient(135deg, #061a3d 0%, #0a4fa3 55%, #0e82e8 100%)",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1.5 }}>Jural</div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            For law firms
          </div>
          <div
            style={{
              marginTop: 20,
              maxWidth: 940,
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2.5,
            }}
          >
            The legal CRM you run by talking to it.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          <div>Private, AI-native, on iPhone and Mac</div>
          <div>jural.app</div>
        </div>
      </div>
    ),
    size,
  );
}
