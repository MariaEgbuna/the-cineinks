"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import ScoreBadge from "./ScoreBadge";
import type { Post } from "../utils/posts";

type RelatedPostsProps = {
  candidates: Post[];
  limit?: number;
};

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function RelatedPosts({ candidates, limit = 3 }: RelatedPostsProps) {
  const [selected, setSelected] = useState<Post[] | null>(null);

  useEffect(() => {
    const shuffled = [...candidates];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setSelected(shuffled.slice(0, limit));
  }, [candidates, limit]);

  if (!selected || selected.length === 0) return null;

  return (
    <section className="bg-page border-t border-line">
      {/* Same width as the article, so the list lines up with the text above */}
      <div className="max-w-225 mx-auto px-5 py-6 md:py-10">
        <SectionHeading title="Related Posts" />
        <div className="flex flex-col gap-4">
          {selected.map((related) => (
            <Link
              key={related.slug}
              href={`/posts/${related.slug}`}
              className="group flex items-start gap-3 border-b border-line pb-4 last:border-b-0 last:pb-0 sm:gap-4"
            >
              <div className="relative aspect-4/3 w-28 shrink-0 overflow-hidden bg-line sm:w-40">
                {related.coverImage && (
                  <Image
                    src={related.coverImage}
                    alt={related.title}
                    fill
                    sizes="(min-width: 640px) 160px, 112px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {/* Changed: round score badge */}
                {related.score !== null && (
                  <ScoreBadge
                    score={related.score}
                    className="absolute top-1.5 right-1.5"
                  />
                )}
              </div>

              <div className="min-w-0">
                <p className="mb-1 font-mono text-[11px] font-medium uppercase tracking-wide text-accent">
                  {related.category}
                </p>
                <h3 className="font-serif text-sm leading-snug text-main line-clamp-3 transition-colors group-hover:text-accent sm:text-base">
                  {related.title}
                </h3>
                <p className="mt-1.5 font-mono text-xs text-muted">{formatDate(related.date)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}