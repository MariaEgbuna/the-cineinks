import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { scoreColor } from "../utils/scoreColor";
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
      {/* Phones: a list of rows. Desktop: one row of four cards. */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-4 md:gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group flex items-start gap-3 border-b border-line pb-4 last:border-b-0 last:pb-0 md:block md:border-0 md:pb-0"
          >
            {/* Phone: small thumbnail on the left. Desktop: full-width image on top. */}
            <div className="relative aspect-4/3 w-28 shrink-0 overflow-hidden bg-line md:w-full">
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 25vw, 112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Desktop only: soft shade and category badge over the image */}
              <div className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-linear-to-t from-black/50 to-transparent md:block" />
              <span className="absolute bottom-2.5 left-2.5 hidden rounded bg-teal px-2 py-1 text-xs text-teal-light md:block">
                {post.category}
              </span>

              {post.score !== null && (
                <span
                  className={`absolute top-1.5 right-1.5 z-10 rounded bg-ink px-1.5 py-0.5 text-[11px] font-medium md:top-2.5 md:right-2.5 md:px-2.5 md:py-1 md:text-xs ${scoreColor(
                    post.score
                  )}`}
                >
                  {post.score}/10
                </span>
              )}
            </div>

            <div className="min-w-0 md:pt-3">
              {/* Phone only: the category on its own line, so a long name never squeezes the date */}
              <p className="mb-1 text-xs font-medium text-accent md:hidden">
                {post.category}
              </p>
              <h3 className="font-serif text-sm leading-snug text-main line-clamp-3 transition-colors group-hover:text-accent md:text-base">
                {post.title}
              </h3>
              {/* The date sits under the title on every screen size */}
              <p className="mt-1.5 text-xs text-main/40">{formatDate(post.date)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}