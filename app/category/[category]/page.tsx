import { notFound } from "next/navigation";
import ArticleCard from "../../../components/ArticleCard";
import { getAllPosts, formatDate } from "../../../utils/posts";
import { categories } from "../../../utils/categories";
import type { Metadata } from "next";

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

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  const posts = getAllPosts().filter((post) =>
    post.labels?.some((label) => label.toLowerCase() === category.label.toLowerCase())
  );

  return (
    <main>
      <section className="bg-ink py-8">
        <div className="max-w-[1600px] mx-auto px-5">
          <h1 className="font-serif text-3xl text-cream">{category.label}</h1>
        </div>
      </section>
      <section className="bg-cream py-10">
        <div className="max-w-[1600px] mx-auto px-5">
          {posts.length === 0 ? (
            <p className="text-ink/60">No posts in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {posts.map((post) => (
                <ArticleCard
                  key={post.slug}
                  slug={post.slug}
                  coverImage={post.coverImage}
                  category={post.category}
                  score={post.score}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={formatDate(post.date)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}