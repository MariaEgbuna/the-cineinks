"use client";

import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import type { Post } from "../utils/posts";
import { formatDate } from "../utils/posts";

type RelatedPostsProps = {
  candidates: Post[];
  limit?: number;
};

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
    <section className="bg-cream border-t border-black/5">
      <div className="max-w-[900px] mx-auto px-5 py-10">
        <h2 className="font-serif text-2xl text-ink mb-5">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {selected.map((related) => (
            <ArticleCard
              key={related.slug}
              slug={related.slug}
              coverImage={related.coverImage}
              category={related.category}
              score={related.score}
              title={related.title}
              excerpt={related.excerpt}
              date={formatDate(related.date)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}