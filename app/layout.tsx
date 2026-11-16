import type { Metadata } from "next";
import { Lora, Inter, Courier_Prime } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SITE_URL } from "../utils/site";
import { getSearchablePosts } from "../utils/posts";
import { Analytics } from "@vercel/analytics/next";

// Headings and titles: an editorial serif
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

// Body text: clean and readable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Typewriter accent, only used where you add the font-mono class
const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
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
        data-scroll-behavior="smooth"
        className={`${lora.variable} ${inter.variable} ${courierPrime.variable}`}
        suppressHydrationWarning
      >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {/* Skip link: invisible until a keyboard user presses Tab, then it
            lets them jump past the header straight to the page content. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded focus:bg-teal focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-teal-light"
        >
          Skip to content
        </a>

        {/* Structured data script. The replace() stops "<" from breaking out of the script tag. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header searchablePosts={searchablePosts} />
        {/* The skip link lands here */}
        <div id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}