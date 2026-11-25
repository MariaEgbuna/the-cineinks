import Image from "next/image";
import Link from "next/link";
import ScoreBadge from "./ScoreBadge";

type ArticleRowProps = {
  slug: string;
  coverImage: string;
  category: string;
  score: number | null;
  title: string;
  excerpt: string;
  date: string;
  compact?: boolean;
};

export default function ArticleRow({
  slug,
  coverImage,
  category,
  score,
  title,
  excerpt,
  date,
  compact = false,
}: ArticleRowProps) {
  return (
    <Link href={`/posts/${slug}`} className="group flex items-start gap-4">
      <div
        className={`relative shrink-0 overflow-hidden bg-line aspect-4/3 ${
          compact ? "w-28" : "w-36 sm:w-52"
        }`}
      >
        {coverImage && (
          // alt="" because the title is written right next to the image
          <Image
            src={coverImage}
            alt=""
            fill
            sizes={compact ? "112px" : "(min-width: 640px) 208px, 144px"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* Changed: round score badge */}
        {score !== null && (
          <ScoreBadge score={score} className="absolute top-1.5 right-1.5" />
        )}
      </div>

      <div className="min-w-0">
        <p className="flex items-center gap-2 text-xs mb-1">
          <span className="font-medium text-accent">{category}</span>
          <span aria-hidden="true" className="text-muted">•</span>
          <span className="text-muted">{date}</span>
        </p>
        <h3
          className={`font-serif text-main leading-snug transition-colors group-hover:text-accent ${
            compact ? "text-sm" : "text-base md:text-lg"
          }`}
        >
          {title}
        </h3>
        {!compact && (
          <p className="hidden sm:block text-sm text-main/60 leading-relaxed mt-1.5 line-clamp-2">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}