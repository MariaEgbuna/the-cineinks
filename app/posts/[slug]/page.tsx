import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "../../../utils/posts";
import { scoreColor } from "../../../utils/scoreColor";
import { Metadata } from "next";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | The CineInks`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <main>
        <section className="bg-ink">
          <div className="max-w-[900px] mx-auto px-5 py-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-teal text-teal-light text-xs px-2.5 py-1 rounded">
                {post.category}
              </span>
              {post.score !== null && (
                <span
                  className={`bg-white/10 text-sm font-medium px-3 py-1 rounded ${scoreColor(
                    post.score
                  )}`}
                >
                  {post.score}/10
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-cream leading-tight mb-3">
              {post.title}
            </h1>
            <p className="text-sm text-cream/60">{formattedDate}</p>
          </div>
        </section>

        <section className="bg-cream">
          <div className="max-w-[900px] mx-auto px-5 py-10 prose prose-neutral">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </section>
      </main>
    </>
  );
}