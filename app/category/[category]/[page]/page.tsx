import { notFound } from "next/navigation";
import CategoryListing from "../../../../components/CategoryListing";
import { categories } from "../../../../utils/categories";
import { getCategoryTotalPages } from "../../../../utils/categoryPosts";
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
  };
}

// Page 1 is handled by app/category/[category]/page.tsx, so this only
// generates pages 2 and up, and only for categories that have them.
export function generateStaticParams() {
  return categories.flatMap((category) => {
    const totalPages = getCategoryTotalPages(category.label);
    return Array.from({ length: totalPages - 1 }, (_, i) => ({
      category: category.slug,
      page: String(i + 2),
    }));
  });
}

export default async function CategoryPaginatedPage({ params }: PageProps) {
  const { category: slug, page } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  if (!/^\d+$/.test(page)) notFound();
  const pageNumber = parseInt(page, 10);
  if (pageNumber < 2) notFound();

  return <CategoryListing category={category} pageNumber={pageNumber} />;
}