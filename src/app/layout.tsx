import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "EditTrack — Review, revise, get paid",
  description:
    "Send a watermarked preview. Your client reviews, approves, pays, and the clean files unlock. No client account needed.",
  metadataBase: new URL("https://edittrack.studio"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "EditTrack — Review, revise, get paid",
    description:
      "Send a watermarked preview. Your client reviews, approves, pays, and the clean files unlock. No client account needed.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EditTrack — Review, revise, get paid",
    description:
      "Send a watermarked preview. Your client reviews, approves, pays, and the clean files unlock. No client account needed.",
  },
};

export const viewport = {
  themeColor: "#FCFAF8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
