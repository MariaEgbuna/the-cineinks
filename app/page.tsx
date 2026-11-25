import Image from "next/image";
import Link from "next/link";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import SectionHeading from "../components/SectionHeading";
import ScoreBadge from "../components/ScoreBadge";
import { getAllPosts, getFeaturedPost, formatDate } from "../utils/posts";
import { categories } from "../utils/categories";
import { hasLabel, isReview } from "../utils/reviews";
import { pageAlternates } from "../utils/seo";
import type { Post } from "../utils/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: pageAlternates("/"),
};

// A portrait thumbnail with the text beside it, for Spotlight posts
function SpotlightCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group flex items-start gap-3 md:gap-4">
      <div className="relative aspect-3/4 w-28 shrink-0 overflow-hidden bg-line md:w-2/5">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 14vw, 112px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="min-w-0">
        <h3 className="font-serif text-sm leading-snug text-main line-clamp-3 transition-colors group-hover:text-accent md:text-base">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-main/60 line-clamp-2 md:text-sm md:line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <p className="mt-1.5 font-mono text-xs text-muted">{formatDate(post.date)}</p>
      </div>
    </Link>
  );
}

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

  const available = allPosts.filter((post) => !heroSlugs.has(post.slug));

  // The same rule the /reviews page uses (see utils/reviews.ts)
  const reviews = available.filter(isReview).slice(0, 4);

  const spotlight = available.filter((post) => hasLabel(post, "Spotlight")).slice(0, 3);

  const extras = available.filter((post) => hasLabel(post, "Extra")).slice(0, 6);

  // The four mediums, shown as quick links to their category pages
  const mediums = categories.filter((c) => c.isMainType);

  return (
    <main>
      <Hero featuredPost={featuredPost} recentlyWatched={recentlyWatched} />

      {/* Top Rated */}
      {topRated.length > 0 && (
        <section className="bg-page py-8 md:py-12">
          <div className="max-w-[1600px] mx-auto px-5">
            <SectionHeading
              title="Top Rated"
              href="/stats"
              linkLabel="My stats"
            />
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
                      <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
                        {post.category}
                      </span>
                    </span>
                    <ScoreBadge score={post.score ?? 0} size="row" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Browse by medium: the label on its own line, the pills below */}
      <section className="bg-page pb-8 md:pb-10">
        <div className="max-w-[1600px] mx-auto px-5">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-wide text-muted">
            Browse By:
          </p>
          <div className="flex flex-wrap gap-2">
            {mediums.map((medium) => (
              <Link
                key={medium.slug}
                href={`/category/${medium.slug}`}
                className="rounded-full border border-main/20 px-4 py-1.5 text-sm text-main/80 transition-colors hover:border-accent hover:text-accent"
              >
                {medium.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews, Spotlight and Extras */}
      <section className="bg-page pb-8 md:pb-12">
        <div className="max-w-[1600px] mx-auto px-5 flex flex-col gap-12 md:gap-16">
          {reviews.length > 0 && (
            <CategorySection title="Reviews" href="/reviews" posts={reviews} />
          )}

          {spotlight.length > 0 && (
            <section>
              <SectionHeading title="Spotlight" href="/category/spotlight" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                {spotlight.map((post) => (
                  <SpotlightCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Extras: a plain text list, no images. One column on phones;
              on desktop two columns that read down the left, then the right. */}
          {extras.length > 0 && (
            <section>
              <SectionHeading title="Extras" href="/category/extra" />
              <ul className="grid grid-cols-1 gap-x-12 md:grid-flow-col md:grid-cols-2 md:grid-rows-3">
                {extras.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="group block border-b border-line py-3.5"
                    >
                      <p className="mb-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide">
                        <span className="font-medium text-accent">{post.category}</span>
                        <span aria-hidden="true" className="text-muted">•</span>
                        <span className="text-muted">{formatDate(post.date)}</span>
                      </p>
                      <h3 className="font-serif text-sm leading-snug text-main transition-colors group-hover:text-accent md:text-base">
                        {post.title}
                      </h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </section>

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