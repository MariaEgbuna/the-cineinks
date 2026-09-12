import Link from "next/link";
import ArticleCard from "../../components/ArticleCard";
import Pagination from "../../components/Pagination";
import { getAllPosts, formatDate } from "../../utils/posts";

const POSTS_PER_PAGE = 9;

export default function ArchivePage() {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const pagePosts = allPosts.slice(0, POSTS_PER_PAGE);

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
            <Pagination currentPage={1} totalPages={totalPages} />
          </div>
        </section>
      </main>
    </>
  );
}