import Image from "next/image";
import Link from "next/link";
import { scoreColor } from "../utils/scoreColor";

type ArticleCardProps = {
  slug: string;
  coverImage: string;
  category: string;
  score: number | null;
  title: string;
  excerpt: string;
  date: string;
};

export default function ArticleCard({
  slug,
  coverImage,
  category,
  score,
  title,
  excerpt,
  date,
}: ArticleCardProps) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="block bg-cream overflow-hidden border border-black/5"
    >
      <div className="relative bg-black/10 aspect-[4/3]">
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        )}
        <span className="absolute bottom-2.5 left-2.5 bg-teal text-teal-light text-xs px-2 py-1 rounded">
          {category}
        </span>
        {score !== null && (
          <span
            className={`absolute top-2.5 right-2.5 bg-ink text-xs font-medium px-2.5 py-1 rounded ${scoreColor(
              score
            )}`}
          >
            {score}/10
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg text-ink leading-snug mb-1.5">
          {title}
        </h3>
        <p className="text-sm text-ink/60 leading-relaxed mb-2.5">
          {excerpt}
        </p>
        <p className="text-xs text-ink/40">{date}</p>
      </div>
    </Link>
  );
}