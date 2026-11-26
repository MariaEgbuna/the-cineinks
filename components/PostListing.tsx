import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";
import { formatDate } from "../utils/posts";
import type { Post } from "../utils/posts";
import { POSTS_PER_PAGE, getTotalPages } from "../utils/pagination";

type ListingHeaderProps = {
  label: string;
  title: string;
  children?: ReactNode;
};

export function ListingHeader({ label, title, children }: ListingHeaderProps) {
  return (
    <section className="bg-linear-to-b from-accent/10 to-transparent py-6 md:py-8">
      <div className="max-w-[1600px] mx-auto px-5">
        <p className="mb-1 font-mono text-xs font-medium uppercase tracking-wide text-accent">
          {label}
        </p>
        <h1 className="font-serif text-2xl font-semibold leading-tight text-main md:text-3xl">
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {posts.map((post) => (
        <ArticleCard
          key={post.slug}
          slug={post.slug}
          coverImage={post.coverImage}
          category={post.category}
          score={post.score}
          title={post.title}
          excerpt={post.excerpt}
          date={formatDate(post.date)}
        />
      ))}
    </div>
  );
}

type PostListingProps = {
  label: string;
  title: string;
  posts: Post[];
  pageNumber: number;
  basePath: string;
  emptyMessage: string;
};

export default function PostListing({
  label,
  title,
  posts,
  pageNumber,
  basePath,
  emptyMessage,
}: PostListingProps) {
  const totalPages = getTotalPages(posts.length);

  if (pageNumber < 1 || pageNumber > totalPages) notFound();

  const start = (pageNumber - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <main>
      <ListingHeader label={label} title={title}>
        <p className="mt-1.5 font-mono text-sm text-muted">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
          {totalPages > 1 && ` · Page ${pageNumber} of ${totalPages}`}
        </p>
      </ListingHeader>

      <section className="bg-page py-6 md:py-10">
        <div className="max-w-[1600px] mx-auto px-5">
          {posts.length === 0 ? (
            <p className="text-main/60">{emptyMessage}</p>
          ) : (
            <>
              <PostGrid posts={pagePosts} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={pageNumber}
                  totalPages={totalPages}
                  basePath={basePath}
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}