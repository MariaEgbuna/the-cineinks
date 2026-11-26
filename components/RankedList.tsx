import Link from "next/link";
import SectionHeading from "./SectionHeading";
import ScoreBadge from "./ScoreBadge";
import type { Post } from "../utils/posts";

type RankedListProps = {
  title: string;
  posts: Post[];
};

export default function RankedList({ title, posts }: RankedListProps) {
  if (posts.length === 0) return null;

  return (
    <div>
      <SectionHeading title={title} />
      <ol className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="group flex items-center gap-4 border-b border-line pb-4"
            >
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
  );
}