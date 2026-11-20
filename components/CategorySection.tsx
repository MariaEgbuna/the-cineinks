import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import ScoreBadge from "./ScoreBadge";
import { formatDate } from "../utils/posts";
import type { Post } from "../utils/posts";

type CategorySectionProps = {
  title: string;
  href: string;
  posts: Post[];
};

export default function CategorySection({ title, href, posts }: CategorySectionProps) {
  if (posts.length === 0) return null;

  return (
    <section>
      <SectionHeading title={title} href={href} />
      {/* Phones get one swipeable row (-mx-5 px-5 lets it run to the
          screen edge, and the next card peeks in). Desktop: a row of four cards. */}
      <div className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group w-[68%] shrink-0 snap-start sm:w-[45%] md:w-auto"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden bg-line">
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 25vw, (min-width: 640px) 45vw, 68vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Desktop only: soft shade and category badge over the image */}
              <div className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-linear-to-t from-black/50 to-transparent md:block" />
              {/* Changed: text-cream instead of text-teal-light */}
              <span className="absolute bottom-2.5 left-2.5 hidden rounded bg-teal px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-cream md:block">
                {post.category}
              </span>

              {/* Changed: round score badge */}
              {post.score !== null && (
                <ScoreBadge
                  score={post.score}
                  className="absolute top-1.5 right-1.5 z-10 md:top-2.5 md:right-2.5"
                />
              )}
            </div>

            <div className="min-w-0 pt-2.5 md:pt-3">
              {/* Phone only: the category on its own line */}
              <p className="mb-1 font-mono text-[11px] font-medium uppercase tracking-wide text-accent md:hidden">
                {post.category}
              </p>
              <h3 className="font-serif text-sm leading-snug text-main line-clamp-2 transition-colors group-hover:text-accent md:line-clamp-3 md:text-base">
                {post.title}
              </h3>
              <p className="mt-1.5 font-mono text-xs text-muted">{formatDate(post.date)}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Small swipe cue, phones only */}
      {posts.length > 1 && (
        <p
          aria-hidden="true"
          className="mt-2 text-right font-mono text-[11px] uppercase tracking-wide text-muted md:hidden"
        >
          Swipe →
        </p>
      )}
    </section>
  );
}