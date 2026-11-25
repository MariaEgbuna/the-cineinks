import { scoreColor } from "../utils/scoreColor";

type ScoreBadgeProps = {
  score: number;
  size?: "card" | "lead" | "row";
  className?: string;
};

const sizes = {
  card: "h-8 w-8 text-[11px] md:h-10 md:w-10 md:text-xs",
  lead: "h-10 w-10 text-xs md:h-12 md:w-12 md:text-sm",
  row: "h-10 w-10 text-xs md:h-11 md:w-11 md:text-sm",
};

export default function ScoreBadge({ score, size = "card", className = "" }: ScoreBadgeProps) {
  return (
    <span
      role="img"
      aria-label={`Rated ${score.toFixed(1)} out of 10`}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 font-medium shadow-sm ${scoreColor(
        score
      )} ${sizes[size]} ${className}`}
    >
      <span>{score.toFixed(1)}</span>
    </span>
  );
}