import { getPostBySlug } from "./posts";
import type { Post } from "./posts";
import { SITE_URL } from "./site";

export type RawLink = { text: string; href: string };
export type Direction = "previous" | "next" | "other";
export type NavLink = { post: Post; direction: Direction; label: string };

// Accepts /posts/my-slug or the full address of a post on this site
function getPostSlug(href: string): string | null {
  const siteUrl = SITE_URL.replace(/\/$/, "");
  const path = href.startsWith(siteUrl) ? href.slice(siteUrl.length) : href;
  return path.match(/^\/posts\/([^/?#]+)\/?$/)?.[1] ?? null;
}

// Reads "← Prev: Season 1" or "Next: Season 3 →"
function getDirection(words: string): Direction {
  const clean = words.replace(/^[^a-z]+/i, "");
  if (/^prev(ious)?\b/i.test(clean)) return "previous";
  if (/^next\b/i.test(clean)) return "next";
  return "other";
}

// Returns null when the links should stay as normal text
export function resolveNavLinks(links: RawLink[], boldLabel?: string): NavLink[] | null {
  if (links.length < 1 || links.length > 2) return null;
  if (boldLabel && links.length !== 1) return null;

  const resolved: NavLink[] = [];

  for (const link of links) {
    const slug = getPostSlug(link.href);
    const post = slug ? getPostBySlug(slug) : null;
    if (!post) return null;

    const direction = getDirection(boldLabel ?? link.text);
    const defaultLabel =
      direction === "previous" ? "Previous" : direction === "next" ? "Next" : "Read next";

    resolved.push({ post, direction, label: boldLabel || defaultLabel });
  }

  if (resolved.length === 2) {
    // A pair must be one Prev and one Next
    const previous = resolved.find((item) => item.direction === "previous");
    const next = resolved.find((item) => item.direction === "next");
    return previous && next ? [previous, next] : null;
  }

  return resolved;
}

// If the post's last paragraph is only post links, separates it from the
// text so it can be shown after the Rating card.
export function splitEndLinks(content: string) {
  const unchanged = { body: content, endLinks: null };
  const text = content.trimEnd();

  const breaks = [...text.matchAll(/\r?\n[ \t]*\r?\n/g)];
  const lastBreak = breaks[breaks.length - 1];
  if (!lastBreak) return unchanged;

  let block = text.slice(lastBreak.index + lastBreak[0].length).trim();

  const bold = block.match(/^\*\*([^*\n]+)\*\*[ \t:]*/);
  if (bold) block = block.slice(bold[0].length);

  const linkPattern = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;
  // Anything besides links means it's an ordinary paragraph
  if (block.replace(linkPattern, "").trim() !== "") return unchanged;

  const links = [...block.matchAll(linkPattern)].map((match) => ({
    text: match[1],
    href: match[2],
  }));

  const endLinks = resolveNavLinks(links, bold?.[1].trim().replace(/:$/, ""));
  if (!endLinks) return unchanged;

  // Also drop a divider line left hanging at the end of the text
  const body = text
    .slice(0, lastBreak.index)
    .replace(/\r?\n[ \t]*\r?\n[ \t]*(?:---|\*\*\*)\s*$/, "");

  return { body, endLinks };
}