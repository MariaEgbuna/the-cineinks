import Link from "next/link";

const categories = [
  { label: "Movies", href: "/category/movies" },
  { label: "Series", href: "/category/series" },
  { label: "Anime", href: "/category/anime" },
  { label: "KDrama", href: "/category/kdrama" },
  { label: "Recap", href: "/category/recap" },
  { label: "List", href: "/category/list" },
  { label: "Spotlight", href: "/category/spotlight" },
  { label: "Extra", href: "/category/extra" },
];

type FooterProps = {
  recentPosts: Post[];
};

export default function Footer({ recentPosts }: FooterProps) {
  return (
    <footer className="bg-ink">
      <div className="max-w-[1600px] mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-cream/10">
          <div>
            <p className="text-xs text-teal-light font-medium mb-3">Categories</p>
            <div className="flex flex-col gap-2">
              {categories.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-cream/60">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-teal-light font-medium mb-3">Information</p>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-cream/60">
                About
              </Link>
              <Link href="/contact" className="text-sm text-cream/60">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-sm text-cream/60">
                Privacy Policy
              </Link>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-teal-light font-medium mb-3">Come Say Hi</p>
            <p className="text-sm text-cream/60 mb-4">
              No fancy film degrees here, just honest takes. Follow along.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/eagercricket/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="text-cream/60"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://x.com/eagercricket"
                target="_blank"
                rel="noopener"
                aria-label="Twitter"
                className="text-cream/60"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2H22l-7.6 8.7L23.3 22H16.6l-5.3-6.9L5.2 22H2l8.1-9.3L1 2h6.9l4.8 6.3L18.9 2zm-1.2 18h1.7L7.4 4H5.6l12.1 16z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
          <p className="font-serif text-xl text-cream">The CineInks</p>
          <p className="text-xs text-cream/30 mt-6">
            © {new Date().getFullYear()} The CineInks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}