import Link from "next/link";
import { socials } from "./socials";

const pageLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "By the Numbers", href: "/stats" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const linkClass = "text-sm text-main/60 transition-colors hover:text-accent";

// Phones only: the left column hugs the middle from the left side, and the
// right column from the right side. Desktop is a normal row.
const gridLinkClass = `${linkClass} odd:text-right even:text-left`;

export default function Footer() {
  return (
    <footer className="bg-bar border-t border-line">
      <div className="max-w-[1600px] mx-auto px-5 py-5">
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-8 gap-y-3.5 md:flex md:flex-wrap md:gap-x-5 md:gap-y-2"
        >
          {pageLinks.map((link) => (
            <Link key={link.href} href={link.href} className={gridLinkClass}>
              {link.label}
            </Link>
          ))}
          {/* Desktop only, since phones already have the RSS icon below.
              A plain link, since the feed is a data file and not a page. */}
          <a href="/feed.xml" className={`${linkClass} hidden md:inline`}>
            RSS Feed
          </a>
        </nav>

        {/* Phones: icons above the copyright.
            Desktop: copyright on the left, icons on the right. */}
        <div className="mt-4 flex flex-col items-center gap-3 border-t border-line pt-4 md:flex-row-reverse md:justify-between">
          <div className="flex gap-5">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-main/60 transition-colors hover:text-accent"
              >
                <Icon />
              </a>
            ))}
            <a
              href="/feed.xml"
              aria-label="RSS feed"
              className="text-main/60 transition-colors hover:text-accent"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" fill="currentColor" />
              </svg>
            </a>
          </div>

          <p className="text-xs text-muted">
            © {new Date().getFullYear()} The CineInks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}