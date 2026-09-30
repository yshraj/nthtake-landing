import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "EditTrack — Review, revise, get paid";

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
          background: "#FCFAF8",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              color: "#C65A32",
              fontSize: 22,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            EditTrack
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#111111",
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              maxWidth: 900,
            }}
          >
            Less back-and-forth. Clearer feedback.
          </div>
          <div
            style={{
              color: "rgba(17,17,17,0.6)",
              fontSize: 28,
              maxWidth: 760,
            }}
          >
            Send a watermarked preview. Your client reviews, approves, pays,
            and the clean files unlock.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
