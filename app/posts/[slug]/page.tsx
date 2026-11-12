import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "../../../utils/posts";
import { scoreColor } from "../../../utils/scoreColor";
import { Metadata } from "next";
import { SITE_URL } from "../../../utils/site";
import MarkdownImage from "../../../components/MarkdownImage";
import RelatedPosts from "../../../components/RelatedPosts";
import ReadingProgress from "../../../components/ReadingProgress";

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

  // About 200 words a minute, never less than 1
  const wordCount = post.content.trim().split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));

  const hasCover = Boolean(post.coverImage);

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
      <ReadingProgress />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}

      {/* Banner: cover image behind the title. Without a cover, it falls
          back to the plain header. The padding sets the banner height. */}
      <section className="relative overflow-hidden bg-bar">
        {hasCover && (
          <>
            <Image
              src={post.coverImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-black/20" />
          </>
        )}

        <div
          className={`relative max-w-225 mx-auto px-5 ${
            hasCover ? "pt-40 pb-8 md:pt-64 md:pb-12" : "py-6 md:py-10"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-teal text-teal-light text-xs px-2.5 py-1 rounded">
              {post.category}
            </span>
            {/* bg-ink keeps the light score colors readable on any header */}
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
          <h1
            className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 ${
              hasCover ? "text-cream" : "text-main"
            }`}
          >
            {post.title}
          </h1>
          <p className={`text-sm ${hasCover ? "text-cream/70" : "text-main/60"}`}>
            {formattedDate} · {readingMinutes} min read
          </p>
        </div>
      </section>

      <section className="bg-page">
        <div
          id="post-body"
          className="max-w-225 mx-auto px-5 py-5 md:py-10 prose"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ img: MarkdownImage as unknown as MarkdownImageComponent }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Rating card, only for posts that have a score. The optional
            verdict line shows under the label, and the bar fills to the
            score out of 10 in the score's own color. */}
        {post.score !== null && (
          <div className="max-w-225 mx-auto px-5 pb-10 md:pb-14">
            <aside className="flex items-center gap-5 border-l-4 border-accent bg-card p-5">
              <span
                className={`shrink-0 bg-ink px-4 py-3 font-serif text-3xl font-semibold rounded ${scoreColor(
                  post.score
                )}`}
              >
                {post.score}/10
              </span>
              <div className={`min-w-0 flex-1 ${scoreColor(post.score)}`}>
                <p className="text-xs font-medium uppercase tracking-wide text-accent">
                  Rating
                </p>
                {post.verdict && (
                  <p className="mt-1 text-sm leading-snug text-main/70">
                    {post.verdict}
                  </p>
                )}
                <div className="mt-2 h-1.5 bg-main/10">
                  <div
                    className="h-full bg-current"
                    style={{
                      width: `${Math.min(100, Math.max(0, post.score * 10))}%`,
                    }}
                  />
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>

      <RelatedPosts candidates={relatedCandidates} />
    </main>
  );
}