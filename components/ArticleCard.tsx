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
      className="group block bg-card overflow-hidden border border-line transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-accent/10"
    >
      <div className="relative bg-line aspect-4/3 overflow-hidden">
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* Soft shade at the bottom so the category badge always reads */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50 to-transparent" />
        {/* The category and score badges sit on top of the image, so they keep their fixed colors */}
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
        <h3 className="font-serif text-lg text-main leading-snug mb-1.5 transition-colors group-hover:text-accent">
          {title}
        </h3>
        <p className="text-sm text-main/60 leading-relaxed mb-2.5">
          {excerpt}
        </p>
        <p className="text-xs text-main/40">{date}</p>
      </div>
    </Link>
  );
}