export function scoreColor(score: number) {
  if (score >= 8.0) return "bg-emerald-700 border-emerald-700 text-white";
  if (score >= 7.0) return "bg-sky-700 border-sky-700 text-white";
  // Amber is too light for white text, so this band uses dark text instead
  if (score >= 5.0) return "bg-amber-500 border-amber-500 text-ink";
  return "bg-rose-600 border-rose-600 text-white";
}

export function scoreTone(score: number) {
  if (score >= 8.0) return { text: "text-emerald-400", bar: "bg-emerald-600" };
  if (score >= 7.0) return { text: "text-sky-400", bar: "bg-sky-600" };
  if (score >= 5.0) return { text: "text-amber-400", bar: "bg-amber-500" };
  return { text: "text-rose-400", bar: "bg-rose-600" };
}