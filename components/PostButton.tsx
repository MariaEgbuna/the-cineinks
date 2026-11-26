import Image from "next/image";
import Link from "next/link";
import type { Post } from "../utils/posts";

type PostButtonProps = {
  post: Post;
  text: string;
};

// Only spans are used inside, so the .prose paragraph styles
// in globals.css don't affect the button.
export default function PostButton({ post, text }: PostButtonProps) {
  // Removes an arrow typed by hand, so there are never two
  const name = text.replace(/\s*(→|->)\s*$/, "");

  return (
    <div className="not-prose my-5">
      <Link
        href={`/posts/${post.slug}`}
        className={`group inline-flex max-w-full items-center gap-2.5 rounded-full border border-accent py-1 pr-4 transition-colors hover:bg-accent/10 ${
          post.coverImage ? "pl-1" : "min-h-10 pl-4"
        }`}
      >
        {post.coverImage && (
          <span className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-full bg-line">
            {/* alt="" because the name is written next to the image */}
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="32px"
              className="object-cover"
            />
          </span>
        )}
        <span className="min-w-0 text-[13px] font-semibold leading-snug text-main md:text-sm">
          {name}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </div>
  );
}