import { notFound } from "next/navigation";
import ReviewsListing from "../../../components/ReviewsListing";
import { getReviewPosts } from "../../../utils/reviews";
import { POSTS_PER_PAGE } from "../../../utils/pagination";
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

// Page 1 is handled by app/reviews/page.tsx, so this only generates
// pages 2 and up.
export function generateStaticParams() {
  const totalPages = Math.max(
    1,
    Math.ceil(getReviewPosts().length / POSTS_PER_PAGE)
  );
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export default async function ReviewsPaginatedPage({ params }: PageProps) {
  const { page } = await params;

  if (!/^\d+$/.test(page)) notFound();
  const pageNumber = parseInt(page, 10);
  if (pageNumber < 2) notFound();

  return <ReviewsListing pageNumber={pageNumber} />;
}