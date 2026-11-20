import ArticleCard from "../../components/ArticleCard";
import Pagination from "../../components/Pagination";
import { formatDate } from "../../utils/posts";
import { getReviewPosts } from "../../utils/reviews";
import { POSTS_PER_PAGE } from "../../utils/pagination";
import type { Metadata } from "next";

type PageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

function getPageNumber(page: string | string[] | undefined): number {
  const value = Array.isArray(page) ? page[0] : page;
  const number = parseInt(value ?? "1", 10);
  return Number.isNaN(number) || number < 1 ? 1 : number;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { page } = await searchParams;
  const pageNumber = getPageNumber(page);
  const suffix = pageNumber > 1 ? ` - Page ${pageNumber}` : "";

  return {
    title: `Reviews${suffix} | The CineInks`,
    description:
      "Every review and quick take on The CineInks: movies, series, anime and K-dramas, newest first.",
  };
}

export default async function ReviewsPage({ searchParams }: PageProps) {
  const { page } = await searchParams;

  const reviews = getReviewPosts();

  // A page number that is too high falls back to the last page
  const totalPages = Math.max(1, Math.ceil(reviews.length / POSTS_PER_PAGE));
  const currentPage = Math.min(getPageNumber(page), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
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
            {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
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
                  currentPage={currentPage}
                  totalPages={totalPages}
                  basePath="/reviews"
                  queryParams={{}}
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}