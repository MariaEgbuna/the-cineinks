import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";

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