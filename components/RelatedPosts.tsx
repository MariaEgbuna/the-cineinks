"use client";

import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
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
      <div className="max-w-225 mx-auto px-5 py-10">
        {/* Changed: text-ink is now text-main */}
        <h2 className="font-serif text-2xl text-main mb-5">Related Posts</h2>
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