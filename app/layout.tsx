import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SITE_URL } from "../utils/site";
import { getSearchablePosts } from "../utils/posts";
import { Analytics } from "@vercel/analytics/next";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

const publicSans = localFont({
  src: "./fonts/public-sans-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "The CineInks",
  description: "No fancy film degrees here. Just honest takes on what I'm watching or have watched.",
  metadataBase: new URL(SITE_URL),
  other: {
    "p:domain_verify": "c8377afcc71ef5f213af8797e73ddc0f",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "The CineInks",
    description: "No fancy film degrees here. Just honest takes on what I'm watching or have watched.",
    url: SITE_URL,
    siteName: "The CineInks",
    type: "website",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The CineInks",
    description: "No fancy film degrees here. Just honest takes on what I'm watching or have watched.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchablePosts = getSearchablePosts();

  return (
    <html lang="en" className={`${instrumentSerif.variable} ${publicSans.variable}`}>
      <body>
        <Header searchablePosts={searchablePosts} />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}