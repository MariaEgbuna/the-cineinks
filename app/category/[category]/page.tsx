import { notFound } from "next/navigation";
import PostListing from "../../../components/PostListing";
import { categories } from "../../../utils/categories";
import { getPostsForCategory } from "../../../utils/categoryPosts";
import { pageAlternates } from "../../../utils/seo";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.label} | The CineInks`,
    description: `${category.label} reviews and posts from The CineInks, honest takes on what I've watched.`,
    alternates: pageAlternates(`/category/${category.slug}`),
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  return (
    <PostListing
      label="Category"
      title={category.label}
      posts={getPostsForCategory(category.label)}
      pageNumber={1}
      basePath={`/category/${category.slug}`}
      emptyMessage="No posts in this category yet."
    />
  );
}