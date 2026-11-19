// Adds genres to review posts that already have year and length.
// Dry run (changes nothing):  node scripts/apply-genres.mjs
// Apply the changes:          node scripts/apply-genres.mjs --write
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const dir = path.join(process.cwd(), "content", "posts");
const write = process.argv.includes("--write");

// slug: genres (one or two, same spelling everywhere)
const info = {
  // Movies
  "free-fall-wrecked-me-and-i-kind-of-expected-it-to": "Drama",
  "hope-2026-review": "Thriller, Sci-Fi",
  "i-hated-buddy": "Horror, Thriller",
  "i-think-the-furious-2026-is-overhyped": "Action, Thriller",
  "resident-evil-review": "Horror, Action",
  "review-caddo-lake": "Mystery, Thriller",
  "review-carry-on-2024": "Action, Thriller",
  "review-matthias-and-maxime": "Drama",
  "review-obsession-2026": "Horror",
  "review-ready-or-not-2-2026": "Horror, Comedy",
  "review-supergirl-2026": "Superhero",
  "review-the-runner-2026": "Thriller, Action",
  "review-unhinged-2020": "Action, Thriller",

  // Series
  "elite-full-retrospective": "Drama, Thriller",
  "review-better-call-saul": "Crime, Drama",
  "review-from-season-1-intrigued": "Horror, Sci-Fi",
  "review-from-season-2-still-good": "Horror, Sci-Fi",
  "review-from-season-3-weakest-yet": "Horror, Sci-Fi",
  "review-from-season-4-better-binged": "Horror, Sci-Fi",
  "review-sneaky-pete": "Crime, Comedy",
  "review-the-watcher-2022": "Mystery, Thriller",
  "review-widows-bay-2026": "Horror, Comedy",
  "the-gentlemen-season-2-review": "Crime, Comedy",

  // Anime
  "avatar-seven-havens-review": "Fantasy, Action",
  "primal-s1-review": "Action, Adventure",
  "primal-s2-review": "Action, Adventure",
  "why-primal-s3": "Action, Adventure",
  "review-common-side-effects": "Comedy, Mystery",
  "review-dorohedoro-season-1-underrated": "Action, Fantasy",
  "review-dorohedoro-season-2-worth-the-wait": "Action, Fantasy",
  "review-frieren-season-2": "Fantasy, Adventure",
  "review-takopis-original-sin": "Drama, Sci-Fi",

  // K-dramas
  "review-call-it-love-2023": "Romance, Drama",
  "review-s-line": "Thriller, Fantasy",
  "review-the-king-of-pigs": "Thriller, Drama",
  "review-the-wonderfools": "Superhero, Comedy",
  "review-the-affair-was-just-the-beginning": "Comedy, Crime",
};

let changed = 0;

for (const [slug, genres] of Object.entries(info)) {
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
  if (/^genres:/m.test(frontMatter)) {
    console.log(`SKIP  ${slug}  (already has genres)`);
    continue;
  }

  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const line = `genres: "${genres}"`;

  // Put the new line after length, else year, else coverImage, else at the end
  const anchor = [/^length:.*$/m, /^year:.*$/m, /^coverImage:.*$/m].find((re) =>
    re.test(frontMatter)
  );
  const newFrontMatter = anchor
    ? frontMatter.replace(anchor, (found) => found + eol + line)
    : frontMatter + eol + line;

  const updated = raw.replace(frontMatter, () => newFrontMatter);

  console.log(`${write ? "WRITE" : "WOULD"} ${slug}  ->  genres: ${genres}`);
  if (write) writeFileSync(file, updated, "utf-8");
  changed++;
}

console.log(
  `\n${changed} posts ${write ? "updated" : "would be updated (dry run, nothing written)"}.`
);