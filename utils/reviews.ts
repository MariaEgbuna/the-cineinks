import { getAllPosts } from "./posts";
import type { Post } from "./posts";

export function hasLabel(post: Post, label: string): boolean {
  return post.labels?.some((l) => l.toLowerCase() === label.toLowerCase()) ?? false;
}

export function isReview(post: Post): boolean {
  return /^(review|quick take)s?$/i.test(post.category.trim());
}

export function getReviewPosts(): Post[] {
  return getAllPosts().filter(isReview);
}