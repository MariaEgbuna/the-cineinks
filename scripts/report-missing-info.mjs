// Read-only: lists review posts and which banner info they are missing.
// Run from the project root: node scripts/report-missing-info.mjs
import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content", "posts");
const rows = [];

for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
  const { data } = matter(readFileSync(path.join(dir, file), "utf-8"));

  // Only posts that have a score are reviews
  if (typeof data.score !== "number") continue;

  const hasYear = data.year !== undefined && String(data.year).trim() !== "";
  const hasLength = typeof data.length === "string" && data.length.trim() !== "";
  const titleYear = String(data.title ?? "").match(/\((\d{4})\)/)?.[1] ?? "";

  rows.push({
    file: file.replace(/\.md$/, ""),
    labels: Array.isArray(data.labels) ? data.labels.join("/") : "",
    year: hasYear ? "ok" : "MISSING",
    length: hasLength ? "ok" : "MISSING",
    titleYear,
  });
}

for (const r of rows) {
  console.log(
    `${r.file} | ${r.labels} | year: ${r.year}${r.titleYear ? ` (title says ${r.titleYear})` : ""} | length: ${r.length}`
  );
}

const missing = rows.filter((r) => r.year === "MISSING" || r.length === "MISSING");
console.log(`\n${rows.length} reviews, ${missing.length} missing year or length.`);