import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141414",
        }}
      >
        <svg
          width="118"
          height="118"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect x="4" y="12.4" width="16" height="11.2" fill="#C8F04A" />
          <rect x="10" y="15" width="4" height="6.2" fill="#141414" />
          <path
            fill="#C8F04A"
            d="M 5.57 12.93 L 3.29 4.43 L 15.85 1.07 L 18.13 9.57 L 14.17 10.63 L 12.90 5.89 L 8.26 7.14 L 9.53 11.87 Z"
          />
        </svg>
      </div>
    ),
    size,
  );
}
