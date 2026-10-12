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

const SITE_DESCRIPTION =
  "Honest reviews and takes on movies, series, anime, and K-dramas. No fancy film degrees here, just what I'm watching or have watched.";

export const metadata: Metadata = {
  title: "The CineInks",
  description: SITE_DESCRIPTION,
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
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "The CineInks",
    type: "website",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The CineInks",
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The CineInks",
  alternateName: "CineInks",
  url: SITE_URL,
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
        {/* Structured data script. The replace() stops "<" from breaking out of the script tag. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header searchablePosts={searchablePosts} />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}