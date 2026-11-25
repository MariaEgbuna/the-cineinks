import type { Metadata } from "next";
import { pageAlternates } from "../../utils/seo";

export const metadata: Metadata = {
  title: "About | The CineInks",
  description:
    "Who writes The CineInks and what to expect: honest reviews, recaps and takes on movies, series, anime and K-dramas.",
  alternates: pageAlternates("/about"),
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}