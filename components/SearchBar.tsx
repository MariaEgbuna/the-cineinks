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
      {/* Changed in the search box: every cream color is now a main color,
          because the header can be light now. */}
      {isOpen ? (
        <div className="flex items-center gap-2 bg-main/10 rounded px-3 py-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-main/60 shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="bg-transparent text-main text-sm placeholder:text-main/40 outline-none w-40 md:w-56"
          />
          <button
            aria-label="Close search"
            onClick={closeSearch}
            className="text-main/60 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : (
        <button aria-label="Search" onClick={openSearch} className="text-main">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      )}

      {/* Results dropdown, unchanged from before */}
      {isOpen && trimmedQuery && (
        <div className="absolute right-0 mt-2 w-72 md:w-80 bg-card border border-line rounded shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-sm text-main/60 px-4 py-3">No results found.</p>
          ) : (
            results.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                onClick={closeSearch}
                className="block px-4 py-3 border-b border-line last:border-b-0 hover:bg-main/5"
              >
                <p className="text-sm font-medium text-main leading-snug">
                  {post.title}
                </p>
                <p className="text-xs text-main/50 mt-0.5">{post.category}</p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}