"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { SearchablePost } from "../utils/posts";

type SearchBarProps = {
  posts: SearchablePost[];
};

const MAX_RESULTS = 6;

export default function SearchBar({ posts }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close the dropdown when clicking anywhere outside this component.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function openSearch() {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function closeSearch() {
    setIsOpen(false);
    setQuery("");
  }

  const trimmedQuery = query.trim().toLowerCase();

  const results = trimmedQuery
    ? posts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(trimmedQuery) ||
            post.excerpt.toLowerCase().includes(trimmedQuery)
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, MAX_RESULTS)
    : [];

  return (
    <div ref={containerRef} className="relative">
      {isOpen ? (
        <div className="flex items-center gap-2 bg-cream/10 rounded px-3 py-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cream/60 shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="bg-transparent text-cream text-sm placeholder:text-cream/40 outline-none w-40 md:w-56"
          />
          <button
            aria-label="Close search"
            onClick={closeSearch}
            className="text-cream/60 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : (
        <button aria-label="Search" onClick={openSearch} className="text-cream">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      )}

      {isOpen && trimmedQuery && (
        <div className="absolute right-0 mt-2 w-72 md:w-80 bg-cream border border-black/10 rounded shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-sm text-ink/60 px-4 py-3">No results found.</p>
          ) : (
            results.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                onClick={closeSearch}
                className="block px-4 py-3 border-b border-black/5 last:border-b-0 hover:bg-black/5"
              >
                <p className="text-sm font-medium text-ink leading-snug">
                  {post.title}
                </p>
                <p className="text-xs text-ink/50 mt-0.5">{post.category}</p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}