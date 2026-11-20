import Image from "next/image";
import Link from "next/link";
import ScoreBadge from "./ScoreBadge";
import { formatDate } from "../utils/posts";
import type { Post } from "../utils/posts";

type HeroProps = {
  featuredPost: Post;
  recentlyWatched: Post[];
};

export default function Hero({ featuredPost, recentlyWatched }: HeroProps) {
  const tiles = recentlyWatched.slice(0, 4);

  return (
    <section className="bg-bar">
      <div className="max-w-[1600px] mx-auto px-5 py-4 md:py-6">
        {/* Phones: one column, the lead on top and a list of four below.
            Desktop: lead takes the left half, tiles fill the right half. */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 md:h-[540px]">
          {/* Lead story */}
          <Link
            href={`/posts/${featuredPost.slug}`}
            className="group relative aspect-4/3 overflow-hidden bg-main/5 animate-fade-up transition-shadow hover:ring-2 ring-accent md:col-span-2 md:row-span-2 md:aspect-auto"
          >
            {featuredPost.coverImage && (
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            {/* Changed: a darker, taller fade on phones so the text stays
                readable over bright cover art. Desktop keeps the old look. */}
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-black/5 md:from-black/90 md:via-black/30 md:to-transparent" />

            {featuredPost.score !== null && (
              <ScoreBadge
                score={featuredPost.score}
                size="lead"
                className="absolute top-3 right-3 z-10 md:top-4 md:right-4"
              />
            )}

            <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-6">
              {/* Changed: text-cream instead of text-teal-light (about 5.7:1
                  instead of 3:1 on the teal) */}
              <span className="mb-2 inline-block bg-teal px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-cream rounded md:mb-3">
                {featuredPost.category}
              </span>
              {/* Changed: soft text shadow so letters never blend into the image */}
              <h1 className="font-serif text-lg leading-snug text-cream line-clamp-3 [text-shadow:0_1px_4px_rgb(0_0_0/0.8)] md:text-4xl md:line-clamp-none">
                {featuredPost.title}
              </h1>
              {/* Changed: full cream (was cream/70) plus the same shadow */}
              <p className="mt-1.5 font-mono text-xs text-cream [text-shadow:0_1px_3px_rgb(0_0_0/0.8)] md:mt-2 md:text-sm">
                {formatDate(featuredPost.date)}
              </p>
            </div>
          </Link>

          {/* Small heading, phones only */}
          <p className="-mb-1 pt-2 font-mono text-xs font-medium uppercase tracking-wide text-accent md:hidden">
            Latest posts
          </p>

          {/* The four other posts: list rows on phones, image tiles on desktop */}
          {tiles.map((post, i) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              style={{ animationDelay: `${(i + 1) * 90}ms` }}
              className="group flex items-start gap-3 border-b border-line pb-4 animate-fade-up last:border-b-0 last:pb-0 md:relative md:block md:overflow-hidden md:border-0 md:bg-main/5 md:pb-0 md:transition-shadow md:hover:ring-2 ring-accent"
            >
              {/* Phone: small thumbnail on the left.
                  Desktop: fills the whole tile as the background. */}
              <div className="relative aspect-4/3 w-28 shrink-0 overflow-hidden bg-main/10 md:absolute md:inset-0 md:aspect-auto md:w-auto md:bg-transparent">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 25vw, 112px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 md:group-hover:scale-110"
                  />
                )}
                {post.score !== null && (
                  <ScoreBadge
                    score={post.score}
                    className="absolute top-1.5 right-1.5 z-10 md:top-2 md:right-2"
                  />
                )}
              </div>

              {/* Desktop only: the dark fade behind the tile text.
                  Changed: slightly darker middle (via-black/35, was /20) */}
              <div className="absolute inset-0 hidden bg-linear-to-t from-black/85 via-black/35 to-transparent md:block" />

              {/* Phone: text on the right. Desktop: text over the bottom of the tile. */}
              <div className="min-w-0 md:absolute md:inset-x-0 md:bottom-0 md:z-10 md:p-4">
                <p className="mb-1 font-mono text-[11px] font-medium uppercase tracking-wide text-accent md:mb-0 md:text-teal-light">
                  {post.category}
                </p>
                <h2 className="font-serif text-sm leading-snug text-main line-clamp-4 transition-colors group-hover:text-accent md:mt-0.5 md:text-base md:text-cream md:line-clamp-3 md:[text-shadow:0_1px_3px_rgb(0_0_0/0.8)] md:group-hover:text-cream">
                  {post.title}
                </h2>
                {/* Phones only: the date sits under the title */}
                <p className="mt-1.5 font-mono text-xs text-muted md:hidden">
                  {formatDate(post.date)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}