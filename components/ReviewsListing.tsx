import { notFound } from "next/navigation";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";
import { formatDate } from "../utils/posts";
import { getReviewPosts } from "../utils/reviews";
import { POSTS_PER_PAGE } from "../utils/pagination";

type ReviewsListingProps = {
  pageNumber: number;
};

export default function ReviewsListing({ pageNumber }: ReviewsListingProps) {
  const reviews = getReviewPosts();
  const totalPages = Math.max(1, Math.ceil(reviews.length / POSTS_PER_PAGE));

  if (pageNumber < 1 || pageNumber > totalPages) notFound();

  const start = (pageNumber - 1) * POSTS_PER_PAGE;
  const pagePosts = reviews.slice(start, start + POSTS_PER_PAGE);

  return (
    <main>
      <section className="bg-linear-to-b from-accent/10 to-transparent py-6 md:py-8">
        <div className="max-w-[1600px] mx-auto px-5">
          <p className="mb-1 font-mono text-xs font-medium uppercase tracking-wide text-accent">
            Reviews
          </p>
          <h1 className="font-serif text-2xl font-semibold leading-tight text-main md:text-3xl">
            Reviews &amp; Quick Takes
          </h1>
          <p className="mt-1.5 font-mono text-sm text-muted">
            {reviews.length} {reviews.length === 1 ? "post" : "posts"}
            {totalPages > 1 && ` · Page ${pageNumber} of ${totalPages}`}
          </p>
        </div>
      </section>

      <section className="bg-page py-6 md:py-10">
        <div className="max-w-[1600px] mx-auto px-5">
          {reviews.length === 0 ? (
            <p className="text-main/60">No reviews yet.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {pagePosts.map((post) => (
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
              {totalPages > 1 && (
                <Pagination
                  currentPage={pageNumber}
                  totalPages={totalPages}
                  basePath="/reviews"
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}