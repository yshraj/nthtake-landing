import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nthtake - One studio link";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101010",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="12.4" width="16" height="11.2" fill="#C8F04A" />
            <rect x="10" y="15" width="4" height="6.2" fill="#141414" />
            <path
              fill="#C8F04A"
              d="M 5.57 12.93 L 3.29 4.43 L 15.85 1.07 L 18.13 9.57 L 14.17 10.63 L 12.90 5.89 L 8.26 7.14 L 9.53 11.87 Z"
            />
          </svg>
          <div
            style={{
              color: "#C8F04A",
              fontSize: 22,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            Nthtake
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#F4F4F4",
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              maxWidth: 900,
            }}
          >
            Less back-and-forth. Clearer takes.
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 28,
              maxWidth: 760,
            }}
          >
            Send a watermarked preview. The client marks the take. When they
            pay, the master unlocks.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
