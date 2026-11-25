import type { MetadataRoute } from "next";
import { SITE_URL } from "../utils/site";
import { getAllPosts } from "../utils/posts";
import { categories } from "../utils/categories";
import { getCategoryTotalPages, getPostsForCategory } from "../utils/categoryPosts";
import { getReviewPosts } from "../utils/reviews";
import { POSTS_PER_PAGE } from "../utils/pagination";

// The date of the newest post in a list, or undefined if the list is empty.
function newestDate(posts: { date: string }[]): Date | undefined {
  const times = posts
    .map((post) => new Date(post.date).getTime())
    .filter((time) => !Number.isNaN(time));
  return times.length > 0 ? new Date(Math.max(...times)) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const reviews = getReviewPosts();

  const siteUpdated = newestDate(posts);
  const reviewsUpdated = newestDate(reviews);

  const totalArchivePages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const totalReviewPages = Math.max(
    1,
    Math.ceil(reviews.length / POSTS_PER_PAGE)
  );

  // About, Contact and Privacy don't change when a post is published, so
  // they get no date at all rather than a wrong one.
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: siteUpdated },
    { url: `${SITE_URL}/archive`, lastModified: siteUpdated },
    { url: `${SITE_URL}/stats`, lastModified: siteUpdated },
    { url: `${SITE_URL}/reviews`, lastModified: reviewsUpdated },
    { url: `${SITE_URL}/about` },
    { url: `${SITE_URL}/contact` },
    { url: `${SITE_URL}/privacy-policy` },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/category/${category.slug}`,
    lastModified: newestDate(getPostsForCategory(category.label)),
  }));

  // Page 2 and up of each category (only exists once a category passes one page)
  const categoryPaginatedPages: MetadataRoute.Sitemap = categories.flatMap((category) => {
    const totalPages = getCategoryTotalPages(category.label);
    const updated = newestDate(getPostsForCategory(category.label));
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      url: `${SITE_URL}/category/${category.slug}/${i + 2}`,
      lastModified: updated,
    }));
  });

  const archivePages: MetadataRoute.Sitemap = Array.from(
    { length: totalArchivePages - 1 },
    (_, i) => ({
      url: `${SITE_URL}/archive/${i + 2}`,
      lastModified: siteUpdated,
    })
  );

  // Page 2 and up of the reviews list
  const reviewPages: MetadataRoute.Sitemap = Array.from(
    { length: totalReviewPages - 1 },
    (_, i) => ({
      url: `${SITE_URL}/reviews/${i + 2}`,
      lastModified: reviewsUpdated,
    })
  );

  return [
    ...staticPages,
    ...postPages,
    ...categoryPages,
    ...categoryPaginatedPages,
    ...archivePages,
    ...reviewPages,
  ];
}