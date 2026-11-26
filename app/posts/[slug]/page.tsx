import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  toRelatedPost,
} from "../../../utils/posts";
import { scoreTone } from "../../../utils/scoreColor";
import { splitEndLinks } from "../../../utils/postLinks";
import { Metadata } from "next";
import { SITE_URL } from "../../../utils/site";
import { pageAlternates } from "../../../utils/seo";
import MarkdownImage from "../../../components/MarkdownImage";
import MarkdownParagraph from "../../../components/MarkdownParagraph";
import PostNav from "../../../components/PostNav";
import RelatedPosts from "../../../components/RelatedPosts";
import ReadingProgress from "../../../components/ReadingProgress";
import ShareButtons from "../../../components/ShareButtons";

type MarkdownImageComponent = React.ComponentType<React.ImgHTMLAttributes<HTMLImageElement>>;

// Turns whatever the date is (text or a Date object) into an ISO string like
// 2026-11-14T00:00:00.000Z, or undefined if it isn't a real date.
function toIsoDate(date: unknown): string | undefined {
  const parsed = new Date(date as string);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

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
    alternates: pageAlternates(`/posts/${post.slug}`),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/posts/${post.slug}`,
      type: "article",
      publishedTime: toIsoDate(post.date),
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
  // Trimmed to the few fields the list shows, so no article text is sent
  // to the browser along with it.
  const relatedCandidates = getRelatedPosts(post, allPosts).map(toRelatedPost);

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

  // The article text, and the closing post links if there are any
  const { body, endLinks } = splitEndLinks(post.content);

  // Text color for the score (null when the post has no score)
  const tone = post.score !== null ? scoreTone(post.score) : null;

  // Banner info: year, length and genres on one line, like
  // "2026 · 1h 35m · Horror, Comedy". Any piece that's empty is skipped,
  // and the whole line disappears when all three are empty.
  const factsLine = [post.year, post.length, post.genres]
    .filter(Boolean)
    .join(" · ");

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
        datePublished: toIsoDate(post.date),
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
          and the image sits below it. Without a cover, it's text only.
          Every text size is one step smaller on phones.
          Changed: less space under the banner on phones (pb-4, not py-6). */}
      <section className="bg-linear-to-b from-accent/10 to-transparent">
        <div
          className={`max-w-300 mx-auto px-5 pt-6 pb-4 md:py-10 ${
            hasCover
              ? "grid grid-cols-1 items-center gap-6 md:grid-cols-[1.3fr_1fr] md:gap-10"
              : "max-w-225"
          }`}
        >
          <div>
            {/* The category as a quiet accent-colored line, no filled badge. */}
            <p className="mb-3 font-mono text-[11px] font-bold uppercase leading-normal tracking-wide text-accent md:mb-3.5 md:text-[13px]">
              {post.category}
            </p>
            <h1 className="font-serif text-2xl md:text-4xl leading-tight text-main mb-3">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-sm md:text-lg leading-relaxed text-main/70 mb-4">
                {post.excerpt}
              </p>
            )}
            {factsLine && (
              <p className="mb-1 text-[0.8125rem] font-medium leading-normal text-main md:text-sm">
                {factsLine}
              </p>
            )}
            <p className="font-mono text-xs text-muted md:text-sm">
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
        {/* Changed: less space above the post text (pt-4 on phones,
            md:pt-6 on desktop), so the gap under the banner is smaller. */}
        <div
          id="post-body"
          className="max-w-225 mx-auto px-5 pt-4 pb-5 md:pt-6 md:pb-10 prose"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: MarkdownImage as unknown as MarkdownImageComponent,
              // Post links on their own line get the fade design
              p: MarkdownParagraph,
            }}
          >
            {body}
          </ReactMarkdown>
        </div>

        {/* Compact Rating card, only for posts that have a score */}
        {post.score !== null && tone && (
          <div className="max-w-225 mx-auto px-5 pb-5 md:pb-6">
            <aside className="flex items-center gap-3 border-l-[3px] border-accent bg-card px-3 py-2.5">
              <span
                className={`shrink-0 rounded bg-ink px-2.5 py-1.5 font-serif text-base font-semibold md:text-lg ${tone.text}`}
              >
                {post.score}/10
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[11px] font-medium uppercase tracking-wide text-accent">
                  Rating
                </p>
                {post.verdict && (
                  <p className="text-sm leading-snug text-main/70">
                    {post.verdict}
                  </p>
                )}
              </div>
            </aside>
          </div>
        )}

        {/* The closing post links, after the verdict */}
        {endLinks && (
          <div className="max-w-225 mx-auto px-5 pb-6 md:pb-8">
            <PostNav links={endLinks} className="" />
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