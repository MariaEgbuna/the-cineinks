# The CineInks - Rebuild Project Plan

## Project Summary

Rebuilding the blog (formerly "The Watchlist Chronicles," now renamed "The CineInks," currently on Blogspot) as a self-built site, styled after the Blocksy "Daily News" template. Two goals driving this project:

1. **Fix indexing issues.** Blogspot has structural SEO limitations (subdomain trust, duplicate label/archive pages, limited sitemap control, weaker page speed) that are likely preventing pages from being crawled and indexed properly.
2. **Build a resume piece.** The finished site should be usable as a live, working example of front-end skills, not just a working blog.

Current blog: https://thewatchlistchronicles.blogspot.com/

## Design Reference

Style inspiration: Blocksy "Daily News" starter template (https://startersites.io/blocksy/daily-news/)

Key style elements to adapt (not copy in full):
- Alternating dark and light sections (black header/hero, light body, black footer)
- Serif logo paired with sans-serif body text and navigation
- Repeating card pattern: image, small category badge, bold headline, optional excerpt/date
- Color used sparingly, reserved for tags and call-to-action elements
- Varied section layouts (hero with sidebar, grid with sidebar, parallel columns) using consistent card styling throughout

Content mapping: news categories become the blog's existing labels (Movies, Series, Anime, Recap, Spotlight, KDrama, List, Extra, Hall of Fame). "Breaking News" concept becomes something like "Latest Reviews."

## Decisions Made

- **Framework:** Next.js. Chosen because it pre-builds pages into static HTML, which directly addresses the indexing problem, and because React/Next.js is a strong, specific skill to show on a resume.
- **Migration scope:** All existing posts will be migrated, not a select few.
- **Content management:** Decision deferred until after the site is built.
- **Language:** TypeScript. Chosen to catch data inconsistencies early during content migration, and as an added resume signal alongside React/Next.js.
- **Color direction:** Alternating dark/light rhythm, same as Daily News. Accent color: deep teal (chosen over red and gold for a calmer, cross-genre feel that fits movies, series, and anime alike). Light section background: warm off-white (softer than pure white, pairs well with teal's cool tone).
- **Typography:** Fraunces (serif, logo/headlines) paired with Work Sans (sans-serif, body/navigation). Chosen for a warm, personal, conversational tone over a more formal or dramatic alternative.
- **Dark/light toggle:** Deferred until after the main build is complete, to avoid designing every component twice this early. Site launches with the fixed alternating dark/light section rhythm only.
- **Header:** Two rows. Top row: logo (Fraunces) with tagline centered, search icon on the right. Second row: full navigation using existing labels (Movies, Series, Anime, Recap, List, Spotlight, Extra, KDrama, Hall of Fame), collapsing to a menu icon on smaller screens. No sign-in or subscribe button.
- **Article card:** Image with category badge (teal, bottom-left) and numeric score badge (near-black background, top-right). Headline in Fraunces, excerpt and date in Work Sans. Score badge text color shifts by tier: green for 7-10, yellow for 5-6.9, red for below 5. Badge background stays near-black in all tiers for legibility against any image.
- **Hero section:** Featured post shown large at the top of the homepage, using the same near-black background style. Content is either manually marked as featured, or falls back automatically to the latest post if nothing is marked, so the homepage never goes stale but can still be curated. Sidebar list beside the hero is titled "Recently Watched." Layout: two columns (hero left, sidebar right), stacking vertically on narrower screens. Hero carries the full card treatment (category badge, score badge, Fraunces headline, excerpt). Sidebar entries are compact (thumbnail, title, date only, no score) to keep the list fast to scan.
- **Blog name:** Renamed from "The Watchlist Chronicles" to "The CineInks."
- **Page width:** Widened from `max-w-6xl` to `max-w-7xl` across header, hero, and content grid.
- **Header layout:** Logo, tagline, and navigation left-aligned rather than centered. Logo has a placeholder space reserved for an upcoming logo image, to sit to the left of the blog name.
- **Footer (not yet built):** Will include Contact and Privacy Policy links, kept out of the main navigation to avoid cluttering it with utility pages.
- **Content templates reviewed:** Seven post types found (essays, hall-of-fame, movie-review, recaps, recommendations, series-review, spotlight). Only movie-review, recaps, and series-review include a numeric rating (written as "My Rating: X.X" or "X.X out of 10"); the other four have no score. All seven consistently use `<!--more-->` as the excerpt cutoff, and all end with the same homepage backlink paragraph, to be stripped out automatically during migration since it points to the old Blogspot domain.
- **Score badge behavior:** ArticleCard and Hero to be updated so the score badge is hidden entirely on posts with no rating, rather than showing a placeholder or fake value.
- **Image hosting:** Self-hosted. All post images will be downloaded during migration and served from the new site directly, rather than continuing to link to Google's `googleusercontent.com` copies, for reliability and better SEO, consistent with the reason for this rebuild in the first place.
- **Multi-label priority:** When a post has more than one label, the card badge shows the post-type label (Review, Recap, List, Spotlight, Extra) over the content-type label (Movies, Series, Anime, KDrama).

## Order of Operations

- [x] **1. Project setup.** Set up the Next.js project structure with TypeScript. Done: Next.js with TypeScript, ESLint, Tailwind CSS, `src/` directory, and App Router. Running locally via `npm run dev`.
- [x] **2. Visual design.** Build the header, article card, colors, and fonts directly as components, adapting the Daily News layout to the blog's categories. Done: color tokens and fonts defined in `globals.css` and `layout.tsx`, header, hero, and article card components built and rendering correctly at `localhost:3000`. Score-tier coloring logic shared between Hero and ArticleCard via `utils/scoreColor.ts`, to keep the rules in one place. All three components currently use placeholder post data, to be replaced during content migration (step 3).
- [x] **3. Content migration.** Export all posts from Blogger (Settings > Back up content) and migrate them into the new site. Done: Blogger changed its export process to route through Google Takeout as of July 1, 2026, the old direct XML download was removed. Full export downloaded (215.9 MB, mostly images), `feed.atom` extracted as the actual post data needed. Migration script built at `scripts/migrate.ts`, converts each post to a Markdown file in `content/posts` with frontmatter (title, slug, date, category, labels, score, excerpt, coverImage), downloads and self-hosts all post images to `public/images/posts`, strips the old homepage backlink paragraph, and adds fallback alt text (the post title) since the original templates never set any. All 68 published posts migrated successfully. Bug found and fixed: score extraction missed ratings on posts using the series-review template, since its markup places an HTML tag between the number and "out of 10," breaking the original pattern match. Fixed by stripping tags before searching. One image (on "RECAP: Primal Season 1") still failed to download and needs manual follow-up.
- **Pagination:** Homepage and post listings use traditional numbered pagination (real, separate URLs per page) rather than a "Load More" button, so all content stays visible to search engines without requiring a click to load.
- **Homepage wired to real content:** `getAllPosts`, `getFeaturedPost`, and `getPostBySlug` built in `utils/posts.ts` (using `gray-matter` to read frontmatter). Homepage now reads real posts instead of placeholder data: featured post falls back to the newest post since none are yet marked `featured: true`, 4 posts fill "Recently watched," 6 fill the grid.
- **Individual post pages built** at `app/posts/[slug]/page.tsx`, rendering each post's Markdown body via `react-markdown` with the Tailwind typography plugin for styling. Hero, "Recently watched" entries, and article cards all link through to their post page. Fixed a Next.js 16 change where dynamic route params (`params`) now arrive as a Promise and must be awaited, rather than being immediately available.
- **Pagination:** Done. Separate `/archive` page built (chosen over paginating the homepage itself, since the homepage's hero is meant to stay a fixed, curated highlight rather than changing per page). Page 1 at `app/archive/page.tsx`, pages 2+ at `app/archive/[page]/page.tsx`, 9 posts per page, shared `Pagination` component and `formatDate` utility (consolidated out of three separate copies of the same date-formatting logic). "View all posts" link added under the homepage grid, the only way to reach the archive currently, no nav link yet.
- **Footer built** at `components/Footer.tsx`: logo and tagline repeated, Categories column matching the main nav, Information column with Contact and Privacy Policy, and an auto-updating copyright year. No social links for now. Basic placeholder pages built at `app/contact/page.tsx` and `app/privacy-policy/page.tsx` so the footer links go somewhere real rather than 404ing.
- **Refactor: Header and Footer moved into the root layout** (`app/layout.tsx`), rendered once globally instead of being manually imported and repeated in every page file (homepage, archive pages, post page). Keeps both consistent across the site without needing to touch multiple files for future header/footer changes.
- [ ] **4. SEO fundamentals.** Set up sitemap, meta tags, and clean URL structure. This is the core fix for the indexing problem.
- [ ] **5. Hosting and launch.** Choose a hosting provider and get the site live.
- [ ] **6. Content management.** Decide how new posts will be written and published going forward (files vs CMS vs other).

## Open Questions (to revisit later)

- Hosting provider preference
- Domain (staying on a subdomain-style setup vs a custom domain)
- Content management approach for future posts