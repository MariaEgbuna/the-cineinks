import { notFound } from "next/navigation";
import ArticleCard from "../../../components/ArticleCard";
import Pagination from "../../../components/Pagination";
import { getAllPosts, formatDate } from "../../../utils/posts";
import type { Metadata } from "next";

const POSTS_PER_PAGE = 9;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;

  return {
    title: `All Posts - Page ${page} | The CineInks`,
    description: "Browse every review, recap, and post on The CineInks.",
  };
}

export function generateStaticParams() {
  const totalPosts = getAllPosts().length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Page 1 is handled separately by app/archive/page.tsx, so this
  // only needs to generate pages 2 and up.
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

type PageProps = {
  params: Promise<{ page: string }>;
};

export default async function ArchivePaginatedPage({ params }: PageProps) {
  const { page } = await params;
  const pageNumber = parseInt(page, 10);

  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  if (isNaN(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound();
  }

  const start = (pageNumber - 1) * POSTS_PER_PAGE;
  const pagePosts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <>
      <main>
        <section className="bg-ink py-8">
          <div className="max-w-[1600px] mx-auto px-5">
            <h1 className="font-serif text-3xl text-cream">All Posts</h1>
          </div>
        </section>
        <section className="bg-cream py-10">
          <div className="max-w-[1600px] mx-auto px-5">
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
            <Pagination currentPage={pageNumber} totalPages={totalPages} />
          </div>
        </section>
      </main>
    </>
  );
}