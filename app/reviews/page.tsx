import ReviewsListing from "../../components/ReviewsListing";
import { pageAlternates } from "../../utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews | The CineInks",
  description:
    "Every review and quick take on The CineInks: movies, series, anime and K-dramas, newest first.",
  alternates: pageAlternates("/reviews"),
};

export default function ReviewsPage() {
  return <ReviewsListing pageNumber={1} />;
}