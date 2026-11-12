import { notFound } from "next/navigation";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";
import { formatDate } from "../utils/posts";
import {
  getPostsForCategory,
  CATEGORY_POSTS_PER_PAGE,
} from "../utils/categoryPosts";

type CategoryListingProps = {
  category: { slug: string; label: string };
  pageNumber: number;
};

export default function CategoryListing({ category, pageNumber }: CategoryListingProps) {
  const posts = getPostsForCategory(category.label);
  const totalPages = Math.max(1, Math.ceil(posts.length / CATEGORY_POSTS_PER_PAGE));

  if (pageNumber < 1 || pageNumber > totalPages) notFound();

  const start = (pageNumber - 1) * CATEGORY_POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + CATEGORY_POSTS_PER_PAGE);

  return (
    <main>
      <section className="bg-bar py-5 md:py-8">
        <div className="max-w-[1600px] mx-auto px-5">
          <h1 className="font-serif text-3xl text-main">{category.label}</h1>
        </div>
      </section>
      <section className="bg-page py-6 md:py-10">
        <div className="max-w-[1600px] mx-auto px-5">
          {posts.length === 0 ? (
            <p className="text-main/60">No posts in this category yet.</p>
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
                  basePath={`/category/${category.slug}`}
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}