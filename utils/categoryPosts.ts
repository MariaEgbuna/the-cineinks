import { getAllPosts } from "./posts";
import type { Post } from "./posts";

export const CATEGORY_POSTS_PER_PAGE = 9;

// Same label matching the category pages have always used
export function getPostsForCategory(label: string): Post[] {
  return getAllPosts().filter((post) =>
    post.labels?.some((l) => l.toLowerCase() === label.toLowerCase())
  );
}

export function getCategoryTotalPages(label: string): number {
  const total = getPostsForCategory(label).length;
  return Math.max(1, Math.ceil(total / CATEGORY_POSTS_PER_PAGE));
}