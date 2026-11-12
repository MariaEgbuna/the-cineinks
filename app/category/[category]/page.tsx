import { notFound } from "next/navigation";
import CategoryListing from "../../../components/CategoryListing";
import { categories } from "../../../utils/categories";
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
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  return <CategoryListing category={category} pageNumber={1} />;
}