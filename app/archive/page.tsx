import PostListing from "../../components/PostListing";
import { getAllPosts } from "../../utils/posts";
import { pageAlternates } from "../../utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts | The CineInks",
  description:
    "Browse every review, recap, and post on The CineInks: movies, series, anime and K-dramas, newest first.",
  alternates: pageAlternates("/archive"),
};

export default function ArchivePage() {
  return (
    <PostListing
      label="Archive"
      title="All Posts"
      posts={getAllPosts()}
      pageNumber={1}
      basePath="/archive"
      emptyMessage="No posts yet."
    />
  );
}