import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { categories } from "./categories";

// Lives in its own file so browser components can use it too
export { formatDate } from "./formatDate";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type Post = {
  title: string;
  slug: string;
  date: string;
  category: string;
  labels: string[];
  score: number | null;
  verdict: string;
  excerpt: string;
  coverImage: string;
  featured?: boolean;
  // Banner info, all optional. Empty string when not filled in.
  year: string;
  length: string;
  genres: string;
  content: string;
};

export type SearchablePost = {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
};

// Only what the Related Posts list displays. No article text, so it stays
// small when it is sent to the browser.
export type RelatedPost = Pick<
  Post,
  "slug" | "title" | "coverImage" | "category" | "score" | "date"
>;

export function toRelatedPost(post: Post): RelatedPost {
  return {
    slug: post.slug,
    title: post.title,
    coverImage: post.coverImage,
    category: post.category,
    score: post.score,
    date: post.date,
  };
}

// Decap skips optional fields left blank, and a hand-typed year can come
// through as a number, so text fields are cleaned in one place.
function cleanString(value: unknown): string {
  if (typeof value === "number") return String(value);
  return typeof value === "string" ? value.trim() : "";
}

// gray-matter turns an unquoted front matter date (date: 2026-11-14) into a
// Date object, even though the rest of the site treats dates as strings.
// Convert it to an ISO string here so every page gets the same thing.
function cleanDate(value: unknown): string {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? "" : value.toISOString();
  }
  return typeof value === "string" ? value.trim() : "";
}

// Always returns a list of non-empty text, even when labels are missing
function cleanLabels(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map(cleanString).filter(Boolean);
}

// Genres can be written as plain text ("Horror, Comedy") or as a list
// (["Horror", "Comedy"]). Either way they end up as one string.
function cleanGenres(value: unknown): string {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
      .join(", ");
  }
  return cleanString(value);
}

export function getAllPosts(): Post[] {
  const filenames = readdirSync(POSTS_DIR).filter((name) => name.endsWith(".md"));

  const posts = filenames.map((filename) => {
    const raw = readFileSync(path.join(POSTS_DIR, filename), "utf-8");
    const { data, content } = matter(raw);

    const score: number | null =
      typeof data.score === "number" ? data.score : null;

    const slug = cleanString(data.slug) || filename.replace(/\.md$/, "");

    return {
      ...data,
      content,
      slug,
      title: cleanString(data.title) || slug,
      category: cleanString(data.category),
      labels: cleanLabels(data.labels),
      excerpt: cleanString(data.excerpt),
      date: cleanDate(data.date),
      score,
      coverImage: cleanString(data.coverImage),
      verdict: cleanString(data.verdict),
      year: cleanString(data.year),
      length: cleanString(data.length),
      genres: cleanGenres(data.genres),
    } as Post;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedPost(posts: Post[]): Post {
  return posts.find((post) => post.featured) ?? posts[0];
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

function getMatchingLabel(post: Post): string | undefined {
  const mainTypeLabels = categories
    .filter((c) => c.isMainType)
    .map((c) => c.label.toLowerCase());

  const mainType = post.labels.find((label) =>
    mainTypeLabels.includes(label.toLowerCase())
  );

  return mainType ?? post.labels[0];
}

export function getRelatedPosts(post: Post, allPosts: Post[]): Post[] {
  const matchingLabel = getMatchingLabel(post);

  if (!matchingLabel) return [];

  return allPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => getMatchingLabel(p)?.toLowerCase() === matchingLabel.toLowerCase())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getSearchablePosts(): SearchablePost[] {
  return getAllPosts().map((post) => ({
    title: post.title,
    slug: post.slug,
    date: post.date,
    category: post.category,
    excerpt: post.excerpt,
  }));
}