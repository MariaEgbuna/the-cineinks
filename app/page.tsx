import Link from "next/link";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import SectionHeading from "../components/SectionHeading";
import { getAllPosts, getFeaturedPost } from "../utils/posts";
import { categories } from "../utils/categories";
import { scoreColor } from "../utils/scoreColor";

// Which category sections show on the home page, in this order
const SECTION_SLUGS = ["movies", "series", "anime", "kdrama"];

export default function Home() {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost(allPosts);

  const remainingPosts = allPosts.filter((post) => post.slug !== featuredPost.slug);

  const recentlyWatched = remainingPosts.slice(0, 3);

  // Everything already shown in the hero, so the sections below skip it
  const heroSlugs = new Set([
    featuredPost.slug,
    ...recentlyWatched.map((post) => post.slug),
  ]);

  // Highest scores first; posts without a score are left out
  const topRated = allPosts
    .filter((post) => post.score !== null)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 5);

  // Same label matching the category pages use, minus the hero posts
  const sections = SECTION_SLUGS.flatMap((slug) => {
    const category = categories.find((c) => c.slug === slug);
    if (!category) return [];
    const posts = allPosts
      .filter(
        (post) =>
          !heroSlugs.has(post.slug) &&
          post.labels?.some((label) => label.toLowerCase() === category.label.toLowerCase())
      )
      .slice(0, 3);
    return posts.length > 0 ? [{ category, posts }] : [];
  });

  return (
    <main>
      <Hero featuredPost={featuredPost} recentlyWatched={recentlyWatched} />

      {/* Top Rated */}
      {topRated.length > 0 && (
        <section className="bg-page py-8 md:py-12">
          <div className="max-w-[1600px] mx-auto px-5">
            <SectionHeading title="Top Rated" />
            {/* One column on phones. On desktop, two columns that read
                down the left (1 to 3) and then down the right (4 and 5). */}
            <ol className="grid grid-cols-1 gap-x-12 gap-y-5 md:grid-flow-col md:grid-cols-2 md:grid-rows-3">
              {topRated.map((post, i) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group flex items-start gap-4 border-b border-line pb-5"
                  >
                    <span className="w-9 shrink-0 font-serif text-3xl font-light leading-none text-accent/40 transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-main leading-snug transition-colors group-hover:text-accent md:text-base">
                        {post.title}
                      </span>
                      <span className="text-xs text-main/40">{post.category}</span>
                    </span>
                    <span
                      className={`shrink-0 rounded bg-ink px-2 py-1 text-xs font-medium ${scoreColor(
                        post.score ?? 0
                      )}`}
                    >
                      {post.score}/10
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* One section per category */}
      {sections.length > 0 && (
        <section className="bg-page pb-8 md:pb-12">
          <div className="max-w-[1600px] mx-auto px-5 flex flex-col gap-12 md:gap-16">
            {sections.map(({ category, posts }) => (
              <CategorySection
                key={category.slug}
                title={category.label}
                href={`/category/${category.slug}`}
                posts={posts}
              />
            ))}
          </div>
        </section>
      )}

      {/* The home page's link to the full archive */}
      <section className="bg-page pb-10 md:pb-14">
        <div className="max-w-[1600px] mx-auto px-5 text-center">
          <Link
            href="/archive"
            className="border-b border-main/20 pb-0.5 text-sm text-main/60 transition-colors hover:border-accent hover:text-accent"
          >
            View all posts →
          </Link>
        </div>
      </section>
    </main>
  );
}