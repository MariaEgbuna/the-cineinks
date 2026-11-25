import type { Metadata } from "next";

// Builds the `alternates` block for a page: its canonical path, plus the RSS link
export function pageAlternates(path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: path,
    types: { "application/rss+xml": "/feed.xml" },
  };
}