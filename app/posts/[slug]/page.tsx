import React from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "../../../utils/posts";
import { scoreColor } from "../../../utils/scoreColor";
import { Metadata } from "next";
import { SITE_URL } from "../../../utils/site";
import MarkdownImage from "../../../components/MarkdownImage";
import RelatedPosts from "../../../components/RelatedPosts";

type MarkdownImageComponent = React.ComponentType<React.ImgHTMLAttributes<HTMLImageElement>>;

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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/posts/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedCandidates = getRelatedPosts(post, allPosts);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const structuredData = post.score !== null
    ? {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: {
          "@type": post.labels.includes("Movies") ? "Movie" : "CreativeWorkSeries",
          name: post.title.replace(/^REVIEW:\s*/i, ""),
          ...(post.coverImage && { image: `${SITE_URL}${post.coverImage}` }),
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: post.score,
          bestRating: 10,
          worstRating: 0,
        },
        author: {
          "@type": "Person",
          name: "The CineInks",
        },
        datePublished: post.date,
        url: `${SITE_URL}/posts/${post.slug}`,
      }
    : null;

  return (
    <main>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      {/* Changed: bg-ink is now bg-bar */}
      <section className="bg-bar">
        <div className="max-w-225 mx-auto px-5 py-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-teal text-teal-light text-xs px-2.5 py-1 rounded">
              {post.category}
            </span>
            {/* Changed: bg-white/10 is now bg-ink, so the light score colors
                stay readable even when the header is light */}
            {post.score !== null && (
              <span
                className={`bg-ink text-sm font-medium px-3 py-1 rounded ${scoreColor(
                  post.score
                )}`}
              >
                {post.score}/10
              </span>
            )}
          </div>
          {/* Changed: text-cream is now text-main, text-cream/60 is now text-main/60 */}
          <h1 className="font-serif text-3xl md:text-4xl text-main leading-tight mb-3">
            {post.title}
          </h1>
          <p className="text-sm text-main/60">{formattedDate}</p>
        </div>
      </section>

      <section className="bg-page">
        <div className="max-w-225 mx-auto px-5 py-10 prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ img: MarkdownImage as unknown as MarkdownImageComponent }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </section>

      <RelatedPosts candidates={relatedCandidates} />
    </main>
  );
}