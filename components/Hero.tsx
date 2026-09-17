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
    <section className="bg-ink">
      <div className="max-w-[1600px] mx-auto px-5 py-6 grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-5">
        <Link
          href={`/posts/${featuredPost.slug}`}
          className="relative block bg-white/5 rounded-xl aspect-[3/4] md:aspect-[16/9] p-5 flex flex-col justify-end overflow-hidden"
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
          {/* Dark gradient so title and excerpt stay readable regardless
              of how light or busy the underlying cover image is. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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
            <h1 className="font-serif text-2xl md:text-3xl text-cream leading-snug mb-2">
              {featuredPost.title}
            </h1>
            <p className="text-sm text-cream/70 leading-relaxed line-clamp-3 md:line-clamp-none">
              {featuredPost.excerpt}
            </p>
          </div>
        </Link>

        <div className="p-5 flex flex-col">
          <p className="text-xs text-teal-light font-medium mb-3">
            Latest Posts
          </p>
          <div className="flex flex-col justify-between flex-1 gap-3">
            {recentlyWatched.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="flex gap-2.5 items-center"
              >
                <div className="relative w-9 h-9 bg-white/10 rounded-md shrink-0 overflow-hidden">
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
                  <p className="text-sm text-cream/80 font-normal leading-snug">
                    {post.title}
                  </p>
                  <p className="text-xs text-cream/40 mt-0.5">
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