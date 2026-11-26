import { notFound } from "next/navigation";
import PostListing from "../../../components/PostListing";
import { getReviewPosts } from "../../../utils/reviews";
import {
  getTotalPages,
  getExtraPageParams,
  parsePageParam,
} from "../../../utils/pagination";
import { pageAlternates } from "../../../utils/seo";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ page: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;

  return {
    title: `Reviews - Page ${page} | The CineInks`,
    description:
      "Every review and quick take on The CineInks: movies, series, anime and K-dramas, newest first.",
    alternates: pageAlternates(`/reviews/${page}`),
  };
}

// Page 1 is handled by app/reviews/page.tsx
export function generateStaticParams() {
  return getExtraPageParams(getTotalPages(getReviewPosts().length));
}

export default async function ReviewsPaginatedPage({ params }: PageProps) {
  const { page } = await params;
  const pageNumber = parsePageParam(page);

  if (pageNumber === null) notFound();

  return (
    <PostListing
      label="Reviews"
      title="Reviews & Quick Takes"
      posts={getReviewPosts()}
      pageNumber={pageNumber}
      basePath="/reviews"
      emptyMessage="No reviews yet."
    />
  );
}