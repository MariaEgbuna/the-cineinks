import { notFound } from "next/navigation";
import PostListing from "../../../components/PostListing";
import { getAllPosts } from "../../../utils/posts";
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
    title: `All Posts - Page ${page} | The CineInks`,
    description: "Browse every review, recap, and post on The CineInks.",
    alternates: pageAlternates(`/archive/${page}`),
  };
}

export function generateStaticParams() {
  return getExtraPageParams(getTotalPages(getAllPosts().length));
}

export default async function ArchivePaginatedPage({ params }: PageProps) {
  const { page } = await params;
  const pageNumber = parsePageParam(page);

  if (pageNumber === null) notFound();

  return (
    <PostListing
      label="Archive"
      title="All Posts"
      posts={getAllPosts()}
      pageNumber={pageNumber}
      basePath="/archive"
      emptyMessage="No posts yet."
    />
  );
}