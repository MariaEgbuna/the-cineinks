import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | The CineInks",
  description:
    "Who writes The CineInks and what to expect: honest reviews, recaps and takes on movies, series, anime and K-dramas.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}