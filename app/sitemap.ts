import type { MetadataRoute } from "next";
import { SITE_URL } from "../utils/site";
import { getAllPosts } from "../utils/posts";
import { categories } from "../utils/categories";
import { getCategoryTotalPages } from "../utils/categoryPosts";
import { POSTS_PER_PAGE } from "../utils/pagination";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const totalArchivePages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/archive`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    { url: `${SITE_URL}/contact`, lastModified: new Date() },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date() },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/category/${category.slug}`,
    lastModified: new Date(),
  }));

  // Page 2 and up of each category (only exists once a category passes one page)
  const categoryPaginatedPages: MetadataRoute.Sitemap = categories.flatMap((category) => {
    const totalPages = getCategoryTotalPages(category.label);
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      url: `${SITE_URL}/category/${category.slug}/${i + 2}`,
      lastModified: new Date(),
    }));
  });

  const archivePages: MetadataRoute.Sitemap = Array.from(
    { length: totalArchivePages - 1 },
    (_, i) => ({
      url: `${SITE_URL}/archive/${i + 2}`,
      lastModified: new Date(),
    })
  );

  return [
    ...staticPages,
    ...postPages,
    ...categoryPages,
    ...categoryPaginatedPages,
    ...archivePages,
  ];
}