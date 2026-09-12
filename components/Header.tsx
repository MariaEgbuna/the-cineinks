"use client";

import { categories } from "../utils/categories";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  ...categories.map((c) => ({ label: c.label, href: `/category/${c.slug}` })),
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-ink">
      <div className="max-w-[1600px] mx-auto px-5 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cream/10" />
            <div className="text-left">
              <p className="font-serif text-2xl text-cream">The CineInks</p>
              <p className="text-xs text-cream/60 mt-0.5">
                No fancy film degrees here. Just honest takes on what I&apos;m watching or have watched.
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <button aria-label="Search" className="text-cream">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Hamburger toggle, only visible below the md breakpoint */}
            <button
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="text-cream md:hidden"
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

        {/* On mobile, this only renders when isMenuOpen is true and
            stacks vertically. On md screens and up, it always shows
            and lays out horizontally, ignoring the toggle entirely. */}
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex border-t border-cream/10 flex-col md:flex-row md:flex-wrap gap-3 md:gap-5 py-3`}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm pb-1 ${
                  isActive
                    ? "text-cream border-b-2 border-teal-light w-fit"
                    : "text-cream/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}