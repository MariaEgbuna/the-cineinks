import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import SectionHeading from "../../components/SectionHeading";
import ScoreBadge from "../../components/ScoreBadge";
import { getAllPosts } from "../../utils/posts";
import { categories } from "../../utils/categories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "By the Numbers | The CineInks",
  description:
    "My watching in numbers: how many posts, my average score, which categories I rate highest, and my top and lowest rated picks.",
  alternates: {
    canonical: "/stats",
  },
};

// The same four mediums the home page sections use
const MEDIUM_SLUGS = ["movies", "series", "anime", "kdrama"];

const SCORE_BUCKETS = [
  { label: "Under 5", min: 0, max: 5 },
  { label: "5 – 5.9", min: 5, max: 6 },
  { label: "6 – 6.9", min: 6, max: 7 },
  { label: "7 – 7.9", min: 7, max: 8 },
  { label: "8 – 8.9", min: 8, max: 9 },
  { label: "9 – 10", min: 9, max: 10.01 },
];

type BarRowProps = {
  label: string;
  value: number;
  max: number;
  display: string;
};

// One labelled horizontal bar. The width is a share of the biggest value.
function BarRow({ label, value, max, display }: BarRowProps) {
  const width = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-sm text-main/80 md:w-36">{label}</span>
      <div className="h-2 flex-1 bg-main/10">
        <div className="h-full bg-accent" style={{ width: `${width}%` }} />
      </div>
      <span className="w-12 shrink-0 text-right font-mono text-sm text-muted">
        {display}
      </span>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: string;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="border border-line border-l-4 border-l-accent bg-card p-4">
      <p className="font-mono text-[11px] font-medium uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-1 font-serif text-2xl text-main md:text-3xl">{value}</p>
    </div>
  );
}

export default function StatsPage() {
  const posts = getAllPosts();
  const rated = posts.filter((post) => post.score !== null);

  const average =
    rated.length > 0
      ? rated.reduce((sum, post) => sum + (post.score ?? 0), 0) / rated.length
      : null;

  const byScoreDesc = [...rated].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  const highest = byScoreDesc[0];
  const lowest = byScoreDesc[byScoreDesc.length - 1];

  // Average score per medium, matched by label like the home page does.
  // Only rated posts count, and mediums with no rated posts are skipped.
  const mediumStats = MEDIUM_SLUGS.flatMap((slug) => {
    const category = categories.find((c) => c.slug === slug);
    if (!category) return [];

    const matching = rated.filter((post) =>
      post.labels?.some(
        (label) => label.toLowerCase() === category.label.toLowerCase()
      )
    );
    if (matching.length === 0) return [];

    const total = matching.reduce((sum, post) => sum + (post.score ?? 0), 0);
    return [
      {
        name: category.label,
        count: matching.length,
        average: total / matching.length,
      },
    ];
  }).sort((a, b) => b.average - a.average);

  // How many posts fall in each score range
  const buckets = SCORE_BUCKETS.map((bucket) => ({
    label: bucket.label,
    count: rated.filter(
      (post) => (post.score ?? 0) >= bucket.min && (post.score ?? 0) < bucket.max
    ).length,
  }));
  const maxBucket = Math.max(0, ...buckets.map((b) => b.count));

  // Posts published per year, newest year first
  const yearMap = new Map<number, number>();
  for (const post of posts) {
    const year = new Date(post.date).getFullYear();
    yearMap.set(year, (yearMap.get(year) ?? 0) + 1);
  }
  const years = [...yearMap.entries()].sort((a, b) => b[0] - a[0]);
  const maxYear = Math.max(0, ...years.map(([, count]) => count));

  const topFive = byScoreDesc.slice(0, 5);
  // Only show a lowest list once there are enough rated posts to avoid overlap
  const lowestFive =
    rated.length >= 10 ? [...byScoreDesc].reverse().slice(0, 5) : [];

  return (
    <main>
      <PageHeader
        label="The data"
        title="By the Numbers"
        description="My watching in numbers. Every score here is how much I enjoyed it, nothing more."
      />

      <section className="bg-page pt-4 pb-8 md:pt-6 md:pb-12">
        <div className="max-w-225 mx-auto px-5 flex flex-col gap-10 md:gap-12">
          {/* Headline numbers */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <StatCard label="Posts" value={String(posts.length)} />
            <StatCard label="Rated" value={String(rated.length)} />
            <StatCard
              label="Average score"
              value={average !== null ? average.toFixed(1) : "–"}
            />
            <StatCard
              label="Range"
              value={
                highest && lowest
                  ? `${(lowest.score ?? 0).toFixed(1)} – ${(highest.score ?? 0).toFixed(1)}`
                  : "–"
              }
            />
          </div>

          {/* Average score by medium */}
          {mediumStats.length > 0 && (
            <div>
              <SectionHeading title="Average score by medium" />
              <div className="flex flex-col gap-3">
                {mediumStats.map((medium) => (
                  <BarRow
                    key={medium.name}
                    label={`${medium.name} (${medium.count})`}
                    value={medium.average}
                    max={10}
                    display={medium.average.toFixed(1)}
                  />
                ))}
              </div>
              <p className="mt-3 font-mono text-xs text-muted">
                Out of 10, rated posts only. The number in brackets is how many posts.
              </p>
            </div>
          )}

          {/* Score spread */}
          {rated.length > 0 && (
            <div>
              <SectionHeading title="How I score" />
              <div className="flex flex-col gap-3">
                {buckets.map((bucket) => (
                  <BarRow
                    key={bucket.label}
                    label={bucket.label}
                    value={bucket.count}
                    max={maxBucket}
                    display={String(bucket.count)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Posts per year */}
          {years.length > 0 && (
            <div>
              <SectionHeading title="Posts per year" />
              <div className="flex flex-col gap-3">
                {years.map(([year, count]) => (
                  <BarRow
                    key={year}
                    label={String(year)}
                    value={count}
                    max={maxYear}
                    display={String(count)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Top rated */}
          {topFive.length > 0 && (
            <div>
              <SectionHeading title="Highest rated" />
              <ol className="flex flex-col gap-4">
                {topFive.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="group flex items-center gap-4 border-b border-line pb-4"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-main leading-snug transition-colors group-hover:text-accent md:text-base">
                          {post.title}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
                          {post.category}
                        </span>
                      </span>
                      <ScoreBadge score={post.score ?? 0} size="row" />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Lowest rated */}
          {lowestFive.length > 0 && (
            <div>
              <SectionHeading title="Lowest rated" />
              <ol className="flex flex-col gap-4">
                {lowestFive.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="group flex items-center gap-4 border-b border-line pb-4"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-main leading-snug transition-colors group-hover:text-accent md:text-base">
                          {post.title}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
                          {post.category}
                        </span>
                      </span>
                      <ScoreBadge score={post.score ?? 0} size="row" />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}