// Adds year and length to old review posts.
// Dry run (changes nothing):  node scripts/apply-info.mjs
// Apply the changes:          node scripts/apply-info.mjs --write
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const dir = path.join(process.cwd(), "content", "posts");
const write = process.argv.includes("--write");

// slug: [year, length]
const info = {
  // Movies
  "free-fall-wrecked-me-and-i-kind-of-expected-it-to": ["2013", "1h 40m"],
  "hope-2026-review": ["2026", "2h 40m"],
  "i-hated-buddy": ["2026", "1h 35m"],
  "i-think-the-furious-2026-is-overhyped": ["2026", "1h 53m"],
  "resident-evil-review": ["2026", "1h 35m"],
  "review-caddo-lake": ["2024", "1h 39m"],
  "review-carry-on-2024": ["2024", "1h 59m"],
  "review-matthias-and-maxime": ["2019", "1h 59m"],
  "review-obsession-2026": ["2026", "1h 49m"],
  "review-ready-or-not-2-2026": ["2026", "1h 48m"],
  "review-supergirl-2026": ["2026", "1h 48m"],
  "review-the-runner-2026": ["2026", "1h 24m"],
  "review-unhinged-2020": ["2020", "1h 33m"],

  // Series
  "review-better-call-saul": ["2015 – 2022", "6 seasons, 63 episodes"],
  "review-from-season-1-intrigued": ["2022", "10 episodes"],
  "review-from-season-2-still-good": ["2023", "10 episodes"],
  "review-from-season-3-weakest-yet": ["2024", "10 episodes"],
  "review-from-season-4-better-binged": ["2026", "10 episodes"],
  "review-sneaky-pete": ["2015 – 2019", "3 seasons, 30 episodes"],
  "review-the-watcher-2022": ["2022", "7 episodes"],
  "review-widows-bay-2026": ["2026", "10 episodes"],
  "the-gentlemen-season-2-review": ["2026", "8 episodes"],

  // Anime
  "avatar-seven-havens-review": ["2026", "13 episodes"],
  "primal-s1-review": ["2019", "10 episodes"],
  "primal-s2-review": ["2022", "10 episodes"],
  "why-primal-s3": ["2026", "10 episodes"],
  "review-common-side-effects": ["2025", "10 episodes"],
  "review-dorohedoro-season-1-underrated": ["2020", "12 episodes"],
  "review-dorohedoro-season-2-worth-the-wait": ["2026", "11 episodes"],
  "review-frieren-season-2": ["2026", "10 episodes"],
  "review-takopis-original-sin": ["2025", "6 episodes"],

  // K-dramas
  "review-call-it-love-2023": ["2023", "16 episodes"],
  "review-s-line": ["2025", "6 episodes"],
  "review-the-king-of-pigs": ["2022", "12 episodes"],
  "review-the-wonderfools": ["2026", "8 episodes"],
  "review-the-affair-was-just-the-beginning": ["2026", "8 episodes"],
};

let changed = 0;

for (const [slug, [year, length]] of Object.entries(info)) {
  const file = path.join(dir, `${slug}.md`);

  let raw;
  try {
    raw = readFileSync(file, "utf-8");
  } catch {
    console.log(`SKIP  ${slug}  (file not found)`);
    continue;
  }

  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    console.log(`SKIP  ${slug}  (no front matter)`);
    continue;
  }

  const frontMatter = match[1];
  if (/^year:/m.test(frontMatter) || /^length:/m.test(frontMatter)) {
    console.log(`SKIP  ${slug}  (already has year or length)`);
    continue;
  }

  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const lines = `year: "${year}"${eol}length: "${length}"`;

  // Put the new lines right after coverImage, or at the end of the front matter
  const newFrontMatter = /^coverImage:.*$/m.test(frontMatter)
    ? frontMatter.replace(/^coverImage:.*$/m, (line) => line + eol + lines)
    : frontMatter + eol + lines;

  const updated = raw.replace(frontMatter, () => newFrontMatter);

  console.log(`${write ? "WRITE" : "WOULD"} ${slug}  ->  year: ${year} | length: ${length}`);
  if (write) writeFileSync(file, updated, "utf-8");
  changed++;
}

console.log(
  `\n${changed} posts ${write ? "updated" : "would be updated (dry run, nothing written)"}.`
);