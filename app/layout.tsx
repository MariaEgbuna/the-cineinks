import type { Metadata } from "next";
import { Poppins, PT_Serif } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SITE_URL } from "../utils/site";
import { getSearchablePosts } from "../utils/posts";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
  display: "swap",
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

const themeScript = `
try {
  var saved = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchablePosts = getSearchablePosts();

  return (
    <html
      lang="en"
      // Changed: inter.variable is now poppins.variable
      className={`${ptSerif.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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