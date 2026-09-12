import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import { XMLParser } from "fast-xml-parser";
import slugify from "slugify";
import TurndownService from "turndown";

const xml = readFileSync("migration/feed.atom", "utf-8");
const parser = new XMLParser({ ignoreAttributes: false });
const data = parser.parse(xml);

const rawEntries = data.feed.entry;
const entries = Array.isArray(rawEntries) ? rawEntries : [rawEntries];

const posts = entries.filter(
  (entry: any) =>
    entry["blogger:type"] === "POST" && entry["blogger:status"] === "LIVE"
);

console.log(`Found ${entries.length} total entries, ${posts.length} are published posts.\n`);

const POST_TYPE_LABELS = ["Review", "Recap", "List", "Spotlight", "Extra"];

function pickCategory(labels: string[]): string {
  const postType = labels.find((label) => POST_TYPE_LABELS.includes(label));
  return postType ?? labels[0];
}

function extractScore(content: string): number | null {
  const plainText = content.replace(/<[^>]+>/g, " ");

  const myRatingMatch = plainText.match(/My Rating:\s*([\d.]+)/i);
  if (myRatingMatch) return parseFloat(myRatingMatch[1]);

  const outOfTenMatch = plainText.match(/([\d.]+)\s*out of 10/i);
  if (outOfTenMatch) return parseFloat(outOfTenMatch[1]);

  return null;
}

function extractExcerpt(content: string): string {
  const [beforeMore] = content.split("<!--more-->");
  return beforeMore.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function stripBacklink(content: string): string {
  return content.replace(
    /<p[^>]*>More reviews and takes at <a[^>]*>The Watchlist Chronicles<\/a>\.<\/p>/i,
    ""
  );
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  const response = await fetch(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(destPath, buffer);
}

const turndown = new TurndownService();

async function migratePost(entry: any, index: number, total: number) {
  const title = entry.title;
  const published = entry.published;

  const rawCategories = entry.category;
  const categories = Array.isArray(rawCategories) ? rawCategories : [rawCategories];
  const labels = categories.map((c: any) => c["@_term"]);

  let content = entry.content["#text"];
  const category = pickCategory(labels);
  const score = labels.includes("List") ? null : extractScore(content);
  const excerpt = extractExcerpt(content);
  const slug = slugify(title, { lower: true, strict: true });

  content = content.split("<!--more-->").join("");
  content = stripBacklink(content);

  const imageDir = path.join("public", "images", "posts", slug);
  mkdirSync(imageDir, { recursive: true });

  const imageUrls = [...content.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
  let coverImage = "";

  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const ext = path.extname(new URL(url).pathname) || ".jpg";
    const filename = `image-${i + 1}${ext}`;
    const localPath = `/images/posts/${slug}/${filename}`;

    const fullLocalPath = path.join(imageDir, filename);
    try {
      if (!existsSync(fullLocalPath)) {
        await downloadImage(url, fullLocalPath);
      }
      content = content.split(url).join(localPath);
      if (i === 0) coverImage = localPath;
    } catch {
      console.warn(`  Failed to download an image for "${title}": ${url}`);
    }
  }
  content = content.replace(/<img /g, `<img alt="${title.replace(/"/g, '\\"')}" `);

  const markdownBody = turndown.turndown(content);

  const frontmatter = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `slug: "${slug}"`,
    `date: "${published}"`,
    `category: "${category}"`,
    `labels: [${labels.map((l: string) => `"${l}"`).join(", ")}]`,
    score !== null ? `score: ${score}` : "score: null",
    `excerpt: "${excerpt.replace(/"/g, '\\"')}"`,
    `coverImage: "${coverImage}"`,
    "---",
  ].join("\n");

  mkdirSync("content/posts", { recursive: true });
  writeFileSync(path.join("content/posts", `${slug}.md`), `${frontmatter}\n\n${markdownBody}\n`);

  console.log(`[${index + 1}/${total}] Migrated: ${title}`);
}

async function run() {
  // TEST MODE: only processing the first 3 posts for now.
  // Once we've checked the output, remove ".slice(0, 3)" to run
  // against all of them.
  const testBatch = posts;

  for (let i = 0; i < testBatch.length; i++) {
    await migratePost(testBatch[i], i, testBatch.length);
  }
  console.log("\nDone.");
}

run();