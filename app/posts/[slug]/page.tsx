import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "../../../utils/posts";
import { scoreTone } from "../../../utils/scoreColor";
import { Metadata } from "next";
import { SITE_URL } from "../../../utils/site";
import MarkdownImage from "../../../components/MarkdownImage";
import RelatedPosts from "../../../components/RelatedPosts";
import ReadingProgress from "../../../components/ReadingProgress";
import ShareButtons from "../../../components/ShareButtons";

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

  const postUrl = `${SITE_URL}/posts/${post.slug}`;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // About 200 words a minute, never less than 1
  const wordCount = post.content.trim().split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));

  const hasCover = Boolean(post.coverImage);

  // Text and bar colors for the Rating card (null when the post has no score)
  const tone = post.score !== null ? scoreTone(post.score) : null;

  // Banner info: the year and the length (seasons/episodes or runtime).
  // Empty when neither is filled in, so older posts look exactly as before.
  const factsLine = [post.year, post.length].filter(Boolean).join(" · ");

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
        url: postUrl,
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

      {/* Banner: text on the left, the cover image on the right at its
          natural 4:3 shape (no zooming). On phones the text comes first
          and the image sits below it. Without a cover, it's text only. */}
      <section className="bg-linear-to-b from-accent/10 to-transparent">
        <div
          className={`max-w-300 mx-auto px-5 py-6 md:py-10 ${
            hasCover
              ? "grid grid-cols-1 items-center gap-6 md:grid-cols-[1.3fr_1fr] md:gap-10"
              : "max-w-225"
          }`}
        >
          <div>
            {/* The category as a quiet accent-colored line, no filled badge. */}
            <p className="mb-3.5 font-mono text-xs font-bold uppercase leading-normal tracking-wide text-accent md:text-[13px]">
              {post.category}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight text-main mb-3">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-base md:text-lg leading-relaxed text-main/70 mb-4">
                {post.excerpt}
              </p>
            )}
            {factsLine && (
              <p className="mb-1 text-sm font-medium text-main">{factsLine}</p>
            )}
            <p className="font-mono text-sm text-muted">
              {formattedDate} · {readingMinutes} min read
            </p>
          </div>

          {hasCover && (
            <div className="relative aspect-4/3 overflow-hidden bg-line">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1200px) 500px, (min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
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

        {/* Rating card, only for posts that have a score.
            The number gets a tier text color and the bar gets a
            tier fill color. The wrapper carries no color. */}
        {post.score !== null && tone && (
          <div className="max-w-225 mx-auto px-5 pb-8 md:pb-10">
            <aside className="border-l-4 border-accent bg-card p-5">
              <div className="flex items-center gap-4">
                <span
                  className={`shrink-0 bg-ink px-3 py-2 font-serif text-2xl font-semibold rounded sm:px-4 sm:py-3 sm:text-3xl ${tone.text}`}
                >
                  {post.score}/10
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs font-medium uppercase tracking-wide text-accent">
                    Rating
                  </p>
                  <div className="mt-2 h-1.5 bg-main/10">
                    <div
                      className={`h-full ${tone.bar}`}
                      style={{
                        width: `${Math.min(100, Math.max(0, post.score * 10))}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              {post.verdict && (
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-main/70 md:text-base">
                  {post.verdict}
                </p>
              )}
            </aside>
          </div>
        )}

        {/* Share row, shown on every post */}
        <div className="max-w-225 mx-auto px-5 pb-10 md:pb-14">
          <div className="border-t border-line pt-6">
            <ShareButtons
              url={postUrl}
              title={post.title}
              image={post.coverImage ? `${SITE_URL}${post.coverImage}` : undefined}
            />
          </div>
        </div>
      </section>

      <RelatedPosts candidates={relatedCandidates} />
    </main>
  );
}