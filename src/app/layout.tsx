import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nthtake - One studio link",
  description:
    "Send a watermarked preview. The client marks the take. When they pay, the master unlocks.",
  metadataBase: new URL("https://nthtake.studio"),
  openGraph: {
    title: "Nthtake - One studio link",
    description:
      "Send a watermarked preview. The client marks the take. When they pay, the master unlocks.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nthtake - One studio link",
    description:
      "Send a watermarked preview. The client marks the take. When they pay, the master unlocks.",
  },
};

export const viewport = {
  themeColor: "#101010",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
