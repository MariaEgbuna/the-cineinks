import { scoreColor } from "../utils/scoreColor";

type ScoreBadgeProps = {
  score: number;
  size?: "card" | "lead" | "row";
  className?: string;
};

// Full class names, so Tailwind can see them
const sizes = {
  // Phones: 32px. Desktop: 40px.
  card: "h-8 w-8 text-[11px] md:h-10 md:w-10 md:text-xs",
  // The big hero story
  lead: "h-10 w-10 text-xs md:h-12 md:w-12 md:text-sm",
  // The Top Rated list
  row: "h-10 w-10 text-xs md:h-11 md:w-11 md:text-sm",
};

export default function ScoreBadge({ score, size = "card", className = "" }: ScoreBadgeProps) {
  return (
    <span
      aria-label={`Rated ${score.toFixed(1)} out of 10`}
      // scoreColor sets the text color, and border-current turns it into the ring
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-current bg-white font-medium shadow-sm ${scoreColor(
        score
      )} ${sizes[size]} ${className}`}
    >
      {/* The number stays dark so it's readable on white. toFixed(1) keeps 9.0 as "9.0" */}
      <span className="text-ink">{score.toFixed(1)}</span>
    </span>
  );
}