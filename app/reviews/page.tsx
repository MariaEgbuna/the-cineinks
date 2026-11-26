import PostListing from "../../components/PostListing";
import { getReviewPosts } from "../../utils/reviews";
import { pageAlternates } from "../../utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews | The CineInks",
  description:
    "Every review and quick take on The CineInks: movies, series, anime and K-dramas, newest first.",
  alternates: pageAlternates("/reviews"),
};

export default function ReviewsPage() {
  return (
    <PostListing
      label="Reviews"
      title="Reviews & Quick Takes"
      posts={getReviewPosts()}
      pageNumber={1}
      basePath="/reviews"
      emptyMessage="No reviews yet."
    />
  );
}