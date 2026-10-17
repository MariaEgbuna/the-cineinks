import Image from "next/image";
import Link from "next/link";
import { scoreColor } from "../utils/scoreColor";
import type { Post } from "../utils/posts";

type HeroProps = {
  featuredPost: Post;
  recentlyWatched: Post[];
};

export default function Hero({ featuredPost, recentlyWatched }: HeroProps) {
  return (
    // Changed: bg-ink is now bg-bar
    <section className="bg-bar">
      <div className="max-w-[1600px] mx-auto px-5 py-6 grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-5">
        {/* Changed: bg-white/5 is now bg-main/5 (the empty space behind the cover image) */}
        <Link
          href={`/posts/${featuredPost.slug}`}
          className="relative block bg-main/5 rounded-xl aspect-[4/3] md:aspect-[16/9] p-5 flex flex-col justify-end overflow-hidden"
        >
          {featuredPost.coverImage && (
            <Image
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              priority
              className="object-cover"
            />
          )}
          {/* Dark gradient so the title stays readable regardless
              of how light or busy the underlying cover image is. */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          {/* Everything on top of the image keeps its fixed colors on purpose:
              the score badge, the category badge, and the cream title. */}
          {featuredPost.score !== null && (
            <span
              className={`absolute top-4 right-4 bg-ink text-sm font-medium px-3 py-1 z-10 ${scoreColor(
                featuredPost.score
              )}`}
            >
              {featuredPost.score}/10
            </span>
          )}

          <div className="relative z-10">
            <span className="inline-block bg-teal text-teal-light text-xs px-2.5 py-1 mb-3">
              {featuredPost.category}
            </span>
            <h1 className="font-serif text-2xl md:text-3xl text-cream leading-snug">
              {featuredPost.title}
            </h1>
          </div>
        </Link>

        <div className="p-5 flex flex-col">
          {/* Changed: text-teal-light is now text-accent */}
          <p className="text-xs text-accent font-medium mb-3">
            Latest Posts
          </p>
          <div className="flex flex-col justify-between flex-1 gap-3">
            {recentlyWatched.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="flex gap-2.5 items-center"
              >
                {/* Changed: bg-white/10 is now bg-main/10 */}
                <div className="relative w-9 h-9 bg-main/10 rounded-md shrink-0 overflow-hidden">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    )}
                  </div>
                <div>
                  {/* Changed: text-cream/80 is now text-main/80, text-cream/40 is now text-main/50 */}
                  <p className="text-sm text-main/80 font-normal leading-snug">
                    {post.title}
                  </p>
                  <p className="text-xs text-main/50 mt-0.5">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}