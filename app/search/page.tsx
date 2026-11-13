import Link from "next/link";
import ArticleCard from "../../components/ArticleCard";
import Pagination from "../../components/Pagination";
import { getAllPosts, formatDate } from "../../utils/posts";
import { POSTS_PER_PAGE } from "../../utils/pagination";
import type { Post } from "../../utils/posts";
import type { Metadata } from "next";

type PageProps = {
  searchParams: Promise<{ q?: string | string[]; page?: string | string[] }>;
};

function getQuery(q: string | string[] | undefined): string {
  const value = Array.isArray(q) ? q[0] : q;
  return (value ?? "").trim().slice(0, 100);
}

function getPageNumber(page: string | string[] | undefined): number {
  const value = Array.isArray(page) ? page[0] : page;
  const number = parseInt(value ?? "1", 10);
  return Number.isNaN(number) || number < 1 ? 1 : number;
}

// Every word in the search must match somewhere in the post, otherwise the
// post is left out. Matches in the title count most, then excerpt and tags,
// then the body text.
function scorePost(post: Post, terms: string[]): number {
  const title = post.title.toLowerCase();
  const excerpt = post.excerpt.toLowerCase();
  const tags = [post.category, ...(post.labels ?? [])].join(" ").toLowerCase();
  const content = (post.content ?? "").toLowerCase();

  let total = 0;
  for (const term of terms) {
    let termScore = 0;
    if (title.includes(term)) termScore += 5;
    if (excerpt.includes(term)) termScore += 3;
    if (tags.includes(term)) termScore += 3;
    if (content.includes(term)) termScore += 1;
    if (termScore === 0) return 0;
    total += termScore;
  }
  return total;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q, page } = await searchParams;
  const query = getQuery(q);
  const pageNumber = getPageNumber(page);
  const pageSuffix = pageNumber > 1 ? ` (page ${pageNumber})` : "";

  return {
    title: query
      ? `Search results for "${query}"${pageSuffix} | The CineInks`
      : "Search | The CineInks",
    // Search result pages shouldn't be indexed by Google
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, page } = await searchParams;
  const query = getQuery(q);
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const results =
    terms.length === 0
      ? []
      : getAllPosts()
          .map((post) => ({ post, score: scorePost(post, terms) }))
          .filter((entry) => entry.score > 0)
          .sort(
            (a, b) =>
              b.score - a.score ||
              new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
          )
          .map((entry) => entry.post);

  // Pagination: a page number that is too high falls back to the last page
  const totalPages = Math.max(1, Math.ceil(results.length / POSTS_PER_PAGE));
  const currentPage = Math.min(getPageNumber(page), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pageResults = results.slice(start, start + POSTS_PER_PAGE);

  return (
    <main>
      <section className="bg-bar py-5 md:py-8">
        <div className="max-w-[1600px] mx-auto px-5">
          <h1 className="font-serif text-3xl text-main mb-4">Search</h1>
          <form action="/search" method="get" role="search" className="flex max-w-xl">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search posts..."
              aria-label="Search posts"
              className="min-w-0 flex-1 border border-main/20 bg-card px-4 py-2.5 text-sm text-main outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="bg-teal px-6 text-sm font-medium text-teal-light"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="bg-page py-6 md:py-10">
        <div className="max-w-[1600px] mx-auto px-5">
          {terms.length === 0 ? (
            <p className="text-main/60">
              Type a title, actor or genre above to search every post.
            </p>
          ) : results.length === 0 ? (
            <div className="text-main/60">
              <p>No posts found for &ldquo;{query}&rdquo;.</p>
              <p className="mt-2">
                Try fewer words or a different spelling, or{" "}
                <Link href="/archive" className="text-accent underline">
                  browse the archive
                </Link>
                .
              </p>
            </div>
          ) : (
            <>
              <p className="mb-5 text-sm text-main/60">
                {totalPages > 1
                  ? `Showing ${start + 1}–${start + pageResults.length} of ${results.length} results for `
                  : `${results.length} ${results.length === 1 ? "result" : "results"} for `}
                &ldquo;{query}&rdquo;
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {pageResults.map((post) => (
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
                  basePath="/search"
                  queryParams={{ q: query }}
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}