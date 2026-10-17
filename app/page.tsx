import Link from "next/link";
import Hero from "../components/Hero";
import ArticleCard from "../components/ArticleCard";
import { getAllPosts, getFeaturedPost, formatDate } from "../utils/posts";

export default function Home() {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost(allPosts);

  const remainingPosts = allPosts.filter((post) => post.slug !== featuredPost.slug);

  const recentlyWatched = remainingPosts.slice(0, 4);
  const gridPosts = remainingPosts.slice(4, 10);

  return (
    <>
      <main>
        <div data-nosnippet>
          <Hero featuredPost={featuredPost} recentlyWatched={recentlyWatched} />
          {/* Changed: bg-cream is now bg-page so it follows the theme */}
          <section className="bg-page py-6 md:py-10">
            <div className="max-w-[1600px] mx-auto px-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {gridPosts.map((post) => (
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
              <div className="text-center mt-8">
                {/* Changed: text-ink and border-ink are now text-main and border-main */}
                <Link
                  href="/archive"
                  className="text-sm text-main/60 border-b border-main/20 pb-0.5"
                >
                  View all posts
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}