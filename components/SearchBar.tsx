"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SearchablePost } from "../utils/posts";

type SearchBarProps = {
  posts: SearchablePost[];
};

const MAX_RESULTS = 6;

export default function SearchBar({ posts }: SearchBarProps) {
  const router = useRouter();
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

  // Enter or the magnifier button: go to the full results page
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    closeSearch();
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
    <div ref={containerRef} className="md:relative flex items-center">
      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          role="search"
          // Changed: on phones the box floats just below the header row
          // (full width, 44px tall, with a shadow) and doesn't move anything.
          // From md up it sits inline like before.
          className="absolute inset-x-0 top-full z-40 -mt-2 flex h-11 items-center gap-2 rounded border border-line bg-card px-3 shadow-lg focus-within:ring-2 focus-within:ring-accent md:static md:mt-0 md:h-auto md:border-0 md:bg-main/10 md:py-1.5 md:shadow-none"
        >
          {/* The magnifier is a submit button */}
          <button
            type="submit"
            aria-label="Search"
            className="text-main/60 shrink-0 hover:text-main"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeSearch();
            }}
            placeholder="Search posts..."
            aria-label="Search posts"
            className="min-w-0 flex-1 bg-transparent text-main text-sm placeholder:text-muted outline-none md:w-56 md:flex-none"
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={closeSearch}
            className="text-main/60 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </form>
      ) : (
        <button aria-label="Search" onClick={openSearch} className="flex items-center text-main">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      )}

      {/* Quick results dropdown.
          Changed: on phones it starts below the floating box (mt-11) */}
      {isOpen && trimmedQuery && (
        <div className="absolute left-0 right-0 top-full mt-11 md:left-auto md:mt-2 md:w-80 bg-card border border-line rounded shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-sm text-main/60 px-4 py-3">No quick matches.</p>
          ) : (
            results.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                onClick={closeSearch}
                className="block px-4 py-3 border-b border-line hover:bg-main/5"
              >
                <p className="text-sm font-medium text-main leading-snug">
                  {post.title}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-muted mt-0.5">{post.category}</p>
              </Link>
            ))
          )}

          {/* Always offered, since the full page shows every match */}
          <Link
            href={`/search?q=${encodeURIComponent(query.trim())}`}
            onClick={closeSearch}
            className="sticky bottom-0 block border-t border-line bg-card px-4 py-3 text-sm font-medium text-accent hover:bg-main/5"
          >
            See all results for &ldquo;{query.trim()}&rdquo; →
          </Link>
        </div>
      )}
    </div>
  );
}