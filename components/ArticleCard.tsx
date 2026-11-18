import Image from "next/image";
import Link from "next/link";
import ScoreBadge from "./ScoreBadge";

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
      // flex-row-reverse puts the thumbnail on the right on phones.
      // Desktop switches to a block, so the full card is unchanged.
      className="group flex flex-row-reverse items-start gap-3 bg-card border border-line p-3 transition duration-300 hover:border-accent/40 md:block md:overflow-hidden md:p-0 md:hover:-translate-y-1 md:hover:shadow-xl md:hover:shadow-black/10 dark:md:hover:shadow-accent/10"
    >
      <div className="relative bg-line aspect-4/3 w-28 shrink-0 overflow-hidden sm:w-40 md:w-full">
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 160px, 112px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Desktop only: soft shade and category badge over the image */}
        <div className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-linear-to-t from-black/50 to-transparent md:block" />
        <span className="absolute bottom-2.5 left-2.5 hidden bg-teal text-teal-light font-mono text-[11px] uppercase tracking-wide px-2 py-1 rounded md:block">
          {category}
        </span>

        {/* Changed: round score badge */}
        {score !== null && (
          <ScoreBadge
            score={score}
            className="absolute top-1.5 right-1.5 z-10 md:top-2.5 md:right-2.5"
          />
        )}
      </div>

      <div className="min-w-0 flex-1 md:p-4">
        {/* Phone only: the category as a text line above the title */}
        <p className="mb-1 font-mono text-[11px] font-medium uppercase tracking-wide text-accent md:hidden">
          {category}
        </p>
        <h3 className="font-serif text-sm text-main leading-snug line-clamp-3 transition-colors group-hover:text-accent md:mb-1.5 md:text-lg md:line-clamp-none">
          {title}
        </h3>
        {/* Hidden on small phones, two lines on larger phones, full on desktop */}
        <p className="hidden sm:block text-sm text-main/60 leading-relaxed mt-1 line-clamp-2 md:mt-0 md:mb-2.5 md:line-clamp-none">
          {excerpt}
        </p>
        <p className="mt-1.5 font-mono text-xs text-muted md:mt-0">{date}</p>
      </div>
    </Link>
  );
}