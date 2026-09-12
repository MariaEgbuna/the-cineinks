export function scoreColor(score: number) {
  if (score >= 7) return "text-score-green";
  if (score >= 5) return "text-score-yellow";
  return "text-score-red";
}