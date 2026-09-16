import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { categories } from "./categories";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type Post = {
  title: string;
  slug: string;
  date: string;
  category: string;
  labels: string[];
  score: number | null;
  excerpt: string;
  coverImage: string;
  featured?: boolean;
  content: string;
};

export type SearchablePost = {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
};

export function getAllPosts(): Post[] {
  const filenames = readdirSync(POSTS_DIR).filter((name) => name.endsWith(".md"));

  const posts = filenames.map((filename) => {
    const raw = readFileSync(path.join(POSTS_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    return { ...data, content } as Post;
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

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getMainTypeLabel(post: Post): string | undefined {
  const mainTypeLabels = categories
    .filter((c) => c.isMainType)
    .map((c) => c.label.toLowerCase());

  return post.labels?.find((label) =>
    mainTypeLabels.includes(label.toLowerCase())
  );
}

export function getRelatedPosts(
  post: Post,
  allPosts: Post[],
  limit: number = 3
): Post[] {
  const mainType = getMainTypeLabel(post);

  if (!mainType) return [];

  return allPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => getMainTypeLabel(p)?.toLowerCase() === mainType.toLowerCase())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
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