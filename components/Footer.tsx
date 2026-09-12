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

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="max-w-[1600px] mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b border-cream/10">
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