import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SITE_URL } from "../utils/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-fraunces",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "The CineInks",
  description: "No fancy film degrees here. Just honest takes on what I'm watching or have watched.",
  metadataBase: new URL(SITE_URL),
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
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}