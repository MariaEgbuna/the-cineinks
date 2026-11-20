import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | The CineInks",
};

export default function NotFound() {
  return (
    <main className="bg-linear-to-b from-accent/10 to-transparent py-16 md:py-28">
      <div className="max-w-225 mx-auto px-5 text-center">
        <p className="font-mono text-6xl font-light text-accent/40 mb-4">404</p>
        <h1 className="font-serif text-2xl font-semibold text-main mb-3 md:text-3xl">
          This one didn&apos;t make the cut
        </h1>
        <p className="text-main/60 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Head
          back home or browse everything I&apos;ve written.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded bg-teal text-cream px-6 py-3 text-sm font-medium"
          >
            Back home
          </Link>
          <Link
            href="/archive"
            className="rounded border border-main/20 text-main px-6 py-3 text-sm font-medium"
          >
            Browse the archive
          </Link>
        </div>
      </div>
    </main>
  );
}