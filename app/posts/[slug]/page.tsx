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
            <div className="flex items-center gap-3 mb-4">
              {/* Changed: font-mono, uppercase, small */}
              <span className="bg-teal text-teal-light font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded">
                {post.category}
              </span>
              {/* bg-ink keeps the light score colors readable on any background */}
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
            <h1 className="font-serif text-3xl md:text-4xl leading-tight text-main mb-3">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-base md:text-lg leading-relaxed text-main/70 mb-4">
                {post.excerpt}
              </p>
            )}
            {/* Changed: font-mono */}
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

        {/* Rating card, only for posts that have a score. The optional
            verdict line shows under the label, and the bar fills to the
            score out of 10 in the score's own color. */}
        {post.score !== null && (
          <div className="max-w-225 mx-auto px-5 pb-8 md:pb-10">
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