import { notFound } from "next/navigation";
import PostListing from "../../../../components/PostListing";
import { categories } from "../../../../utils/categories";
import {
  getPostsForCategory,
  getCategoryTotalPages,
} from "../../../../utils/categoryPosts";
import { getExtraPageParams, parsePageParam } from "../../../../utils/pagination";
import { pageAlternates } from "../../../../utils/seo";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ category: string; page: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug, page } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.label} - Page ${page} | The CineInks`,
    description: `${category.label} reviews and posts from The CineInks, page ${page}.`,
    alternates: pageAlternates(`/category/${category.slug}/${page}`),
  };
}

// Page 1 is handled by app/category/[category]/page.tsx
export function generateStaticParams() {
  return categories.flatMap((category) =>
    getExtraPageParams(getCategoryTotalPages(category.label)).map(({ page }) => ({
      category: category.slug,
      page,
    }))
  );
}

export default async function CategoryPaginatedPage({ params }: PageProps) {
  const { category: slug, page } = await params;
  const category = categories.find((c) => c.slug === slug);
  const pageNumber = parsePageParam(page);

  if (!category || pageNumber === null) notFound();

  return (
    <PostListing
      label="Category"
      title={category.label}
      posts={getPostsForCategory(category.label)}
      pageNumber={pageNumber}
      basePath={`/category/${category.slug}`}
      emptyMessage="No posts in this category yet."
    />
  );
}