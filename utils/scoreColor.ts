export function scoreColor(score: number) {
  if (score >= 8.0) return "bg-emerald-600 border-emerald-600 text-white";
  if (score >= 7.0) return "bg-sky-600 border-sky-600 text-white";
  if (score >= 5.0) return "bg-amber-500 border-amber-500 text-white";
  return "bg-rose-600 border-rose-600 text-white";
}