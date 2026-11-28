"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import type { SearchablePost } from "../utils/posts";

type NavItem = { label: string; href: string };

// What people are most likely to browse by: always visible
const mainItems: NavItem[] = [
  { label: "Movies", href: "/category/movies" },
  { label: "Series", href: "/category/series" },
  { label: "Anime", href: "/category/anime" },
  { label: "KDrama", href: "/category/kdrama" },
];

// Post types: under "More" on desktop, a second row group on phones.
// Only the wording is plural. The URLs are the same as before.
const moreItems: NavItem[] = [
  { label: "Recaps", href: "/category/recap" },
  { label: "Lists", href: "/category/list" },
  { label: "Spotlight", href: "/category/spotlight" },
  { label: "Extras", href: "/category/extra" },
];

// A link also matches its paginated pages, like /category/series/2
function isActiveLink(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const linkBase =
  "w-fit border-b-2 py-1 text-sm font-semibold transition-colors md:pt-0 md:text-base";
const activeClass = "border-accent text-main";
const idleClass = "border-transparent text-main/75 hover:text-main";

type NavLinkProps = {
  item: NavItem;
  pathname: string;
  onSelect: () => void;
};

function NavLink({ item, pathname, onSelect }: NavLinkProps) {
  const isActive = isActiveLink(pathname, item.href);

  return (
    <Link
      href={item.href}
      onClick={onSelect}
      aria-current={isActive ? "page" : undefined}
      className={`${linkBase} ${isActive ? activeClass : idleClass}`}
    >
      {item.label}
    </Link>
  );
}

type HeaderProps = {
  searchablePosts: SearchablePost[];
};

export default function Header({ searchablePosts }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  const isMoreActive = moreItems.some((item) => isActiveLink(pathname, item.href));

  function closeMenus() {
    setIsMenuOpen(false);
    setIsMoreOpen(false);
  }

  // While "More" is open, a click outside it or the Escape key closes it
  useEffect(() => {
    if (!isMoreOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!moreRef.current?.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      // Don't drop keyboard users at the top of the page
      if (moreRef.current?.contains(document.activeElement)) {
        moreButtonRef.current?.focus();
      }
      setIsMoreOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMoreOpen]);

  return (
    <header className="bg-bar">
      <div className="max-w-[1600px] mx-auto px-5 pt-4">
        <div className="relative flex flex-wrap items-center justify-between gap-3 pb-4">
          <Link href="/" onClick={closeMenus} className="flex items-center gap-2 md:gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
              {/* sizes="40px" matches the w-10 (40px) box above, so the browser
                  downloads a small logo instead of a full-screen-width one. */}
              <Image
                src="/logo.png"
                alt="The CineInks logo"
                fill
                sizes="40px"
                className="object-cover scale-125"
              />
            </div>
            <p className="font-serif text-xl md:text-2xl font-semibold tracking-tight text-main whitespace-nowrap">
              The CineInks
            </p>
          </Link>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <SearchBar posts={searchablePosts} />

            {/* Light and dark mode toggle */}
            <ThemeToggle />

            {/* Hamburger toggle, only visible below the md breakpoint */}
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="site-nav"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex items-center text-main md:hidden"
            >
              {isMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Phones: opens with the menu button, as two compact, wrapping groups.
            md and up: one row, always shown. All links stay in the HTML,
            even while hidden. */}
        <nav
          id="site-nav"
          aria-label="Main"
          className={`${
            isMenuOpen ? "block" : "hidden"
          } border-t border-main/10 py-2 md:block md:py-3`}
        >
          <div className="flex flex-col md:flex-row md:flex-wrap md:items-center md:gap-6">
            {/* md:contents lets these links join the desktop row */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 md:contents">
              {mainItems.map((item) => (
                <NavLink key={item.href} item={item} pathname={pathname} onSelect={closeMenus} />
              ))}
            </div>

            <div
              ref={moreRef}
              // Closes the list when keyboard focus tabs out of it
              onBlur={(event) => {
                const next = event.relatedTarget;
                if (next && !event.currentTarget.contains(next)) {
                  setIsMoreOpen(false);
                }
              }}
              className="mt-2 border-t border-line pt-2 md:relative md:mt-0 md:border-0 md:pt-0"
            >
              <button
                ref={moreButtonRef}
                type="button"
                aria-expanded={isMoreOpen}
                aria-controls="more-links"
                onClick={() => setIsMoreOpen((open) => !open)}
                className={`${linkBase} hidden cursor-pointer items-center gap-1 md:flex ${
                  isMoreActive ? activeClass : idleClass
                }`}
              >
                More
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                  className={`transition-transform ${isMoreOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* z-40 sits above the page and below the search results */}
              <div
                id="more-links"
                className={`flex flex-wrap gap-x-5 gap-y-1 md:absolute md:flex-nowrap md:gap-y-3 md:left-0 md:top-full md:z-40 md:mt-2 md:w-44 md:flex-col md:rounded md:border md:border-line md:bg-card md:p-4 md:shadow-lg ${
                  isMoreOpen ? "md:flex" : "md:hidden"
                }`}
              >
                {moreItems.map((item) => (
                  <NavLink key={item.href} item={item} pathname={pathname} onSelect={closeMenus} />
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}