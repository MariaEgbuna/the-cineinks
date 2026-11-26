# The CineInks

A blog about movies, series, anime, and K-dramas, honest takes on what I've watched. This used to live on Blogger, under the name "The Watchlist Chronicles." I decided to rebuild it myself instead, the way I actually wanted it to look and work.

**Live at:** [cineinks.vercel.app](https://cineinks.vercel.app)

---

## Why I rebuilt it

Two reasons. 
* The old Blogger setup had some serious indexing problems, pages just weren't getting crawled or found on Google. 
* And I wanted something real to show for my front-end skills, not just a template.

---

## Built with

- Next.js
- TypeScript
- Tailwind CSS (v4)
- Hosted on Vercel

---

## What's actually in here

- Custom design system built from scratch (no templates): square corners everywhere except the score and category badges, a teal accent, and a system font stack
- Light and dark mode, with a toggle in the header that remembers your choice
- All 68 posts migrated from Blogger, including a script to convert the old export into clean Markdown with self-hosted, compressed images
- **Home page:**
  - A hero with one big lead story and four tiles (on phones the tiles turn into a list)
  - A Top Rated list, the five highest scores, with a link through to the stats page
  - "Browse by" pills for Movies, Series, Anime, and KDrama
  - Sections for Reviews, Spotlight, and Extras, each skipping any post already in the hero
  - A link to the full archive at the bottom
- **Post pages:**
  - Cover image banner behind the title, with an optional line of year, length, and genres
  - Reading time and a reading progress bar
  - A Rating card at the end of scored posts, with an optional one-line verdict
  - Share buttons under every post: WhatsApp, X, Facebook, Pinterest (when the post has a cover image) and copy link. Phones that support it also get a native share button. They are plain links, so nothing loads from those services until someone clicks
  - Related posts, matched by shared label and randomized on each visit. Only the few fields the list shows are sent to the browser, never the article text
- **Category pages, the archive and the reviews page:** all paginated, 9 posts per page, with clean paths like `/category/series/2`, `/archive/2` and `/reviews/2`. The active category stays underlined in the nav on paginated pages too
- **Search:** a live dropdown in the header, plus a full results page at `/search`. It looks through titles and excerpts, ranks title matches first, and is paginated too. I kept it to titles and excerpts on purpose, because searching the full text made a word like "elite" match every post that mentioned it in passing
- **By the Numbers (`/stats`):** my watching in numbers. Posts and rated count, average score, average score by medium, how my scores are spread out, posts per year, and my highest and lowest rated picks
- **About, Contact and Privacy Policy pages:** redesigned to match the rest of the site, each with its own title and description for Google
  - About: logo, a highlighted "How I rate" box, and a card for each section of the blog
  - Contact: intro and social cards on one side, the form on the other (stacked on phones)
  - Privacy Policy: a short summary box at the top, then the full details
- **Contact form:** sent in the background through [Web3Forms](https://web3forms.com), so visitors stay on my site and see a "Message sent" card instead of Web3Forms' default page. It has a sending state, an error message, and a hidden spam-trap field
- A branded 404 page with the site header and footer
- An RSS feed at `/feed.xml`, linked from the footer and passing the W3C Feed Validator with no warnings
- **SEO:**
  - Sitemap including every paginated page, with dates taken from the newest post in each list (and no date at all on About, Contact and Privacy, rather than a wrong one)
  - A canonical URL on every page, so links with tracking bits on the end (like `?fbclid=`) count as the same page
  - robots.txt, per-page metadata, Open Graph tags, and structured data for review scores, verified with Google's Rich Results Test
- **Accessibility:** a "Skip to content" link, a visible teal focus ring for keyboard users, a menu button that reports whether it's open, small gray text darkened to a readable contrast in both themes, empty alt text on cover images that sit next to their own title (so screen readers don't read it twice), and a proper label on the score badges
- A CMS ([Decap](https://decapcms.org)) for when I want to write and publish without touching code. The GitHub login checks a one-time `state` code, reports failed logins properly, and only talks to my own site
- Vercel Web Analytics for basic visitor and page view tracking
- A privacy policy page that says what's actually collected

---

## Writing a post

Posts are Markdown files in `content/posts`, starting with front matter:

- `title`, `slug`, `date`, `category`, `labels`, `excerpt`, `coverImage`, `featured`: every post
- `score`: only for rated posts. Leave it out for posts with no rating
- `verdict`: optional, one short line shown on the Rating card. Wrap it in quotes, and don't put a straight double quote inside it. Posts without one just show the score and the bar
- `year`, `length`, `genres`: optional, shown as one line in the post banner, like `2026 · 1h 35m · Horror, Comedy`. Any that are left out are skipped

Optional fields can be left out completely. The site fills in safe defaults when a field is missing, so a blank one can't crash a page: no labels becomes an empty list, no excerpt becomes empty text, no slug falls back to the file name, and no title falls back to the slug.

---

## Random fixes and tweaks along the way

Small stuff I ran into and sorted out, keeping track mostly for myself:

- CMS Category dropdown kept showing blank even though the post had a value saved. Dropdown only allowed a few hardcoded options and the real value wasn't one of them.
- Noticed Google wasn't indexing a chunk of pages. Turned out some of my multi-season recap/review posts (Elite, From, Primal, Dorohedoro) all had near-identical titles like "Recap: Elite Season 4," which probably read as repetitive, low-value content to Google. Rewrote all of them with actual opinions baked into the title instead, plus new slugs to match.
- Related posts kept showing the exact same three every time. Apparently I only had 4 posts in that category, so there was nothing left to shuffle. Not a bug.
- Featured post excerpt was invisible on some cover images. Was rendering fine, there was just no contrast between light images and the text sitting on top. Added a gradient overlay.
- Hero looked great on desktop, broke on mobile, text was overflowing past the image. Tried fixing it with a taller aspect ratio just for mobile and made it worse the first time around, then had to fix that fix. I had mixed up the width/height order in Tailwind's aspect-ratio syntax.
- Extra posts (no rating needed) were showing a bare "/10" badge with no number. Turned out Decap just skips writing the score field entirely when it's left blank instead of saving it as empty. My code was only checking for an explicit empty value, so a missing field slipped right past that check. Fixed it where posts get read in, so a missing score always gets treated as empty from that point on.
- The search icon did nothing when I clicked it, and pressing Enter went nowhere. The dropdown was the only search there was. Added a real results page at `/search` and made the icon and Enter both go there. Marked it `noindex` so Google doesn't treat search result URLs as pages worth indexing.
- Category pages would have turned into one endless list as the blog grows. Added pagination (`/category/series/2`, same style as the archive) and added those pages to the sitemap.
- On my phone, the theme toggle, search, and menu buttons did nothing, even though the page looked fine. I was testing the dev server over Wi-Fi, and Next.js blocks its scripts from other devices unless you allow them. Fixed with `allowedDevOrigins` in `next.config.ts`, using my computer's address. Only needed when testing on a phone through the dev server. The live site never had the problem.
- The new hero was too crowded on phones: the four small tiles were about 160px wide, so the title took up half the image. Kept the mosaic on desktop and turned the four tiles into list rows (thumbnail on the left, text on the right) on phones.
- The nav links looked too thin because the font stack falls back to Roboto on my screen. Bumped the size and weight, and made the inactive links brighter.
- The home page had a "Latest" list that just repeated the hero. Removed it, and the category sections now skip anything already in the hero.
- Privacy policy was wrong: it said no analytics and no forms, but the site runs Vercel Analytics and has a contact form. Rewrote it to say what's actually going on. Updated it again later to cover the share buttons.
- Sending the contact form threw visitors onto Web3Forms' generic "Form submitted successfully" page, which felt off-brand. Moved the form into its own component that sends in the background and shows a success message on my own page.
- About, Contact and Privacy Policy had no titles or descriptions of their own, so they all used the homepage's. Gave each its own, which should help with the indexing problems from before.
- Missing pages showed Next's plain default 404. Added a branded one.
- Dates, the copyright line and other small labels were too faint on the light background (`text-main/40`, about 2.6:1 contrast). Switched them to the `text-muted` color I'd already defined but never used.
- The category underline in the nav disappeared on paginated pages like `/category/series/2` because it only matched the exact path. It now matches the category and everything under it.
- The privacy policy jumped from an `h1` straight to `h3` headings. Changed them to `h2`.
- The page source showed `article:published_time` as `[object Object]`. When a date in the front matter isn't wrapped in quotes, gray-matter turns it into a real date object instead of text, and that object got printed straight into the meta tag. Now the date is converted to text where posts get read in, and the post page also converts it again right where the tag is made, so it can't happen again.
- Related posts was quietly sending the full text of every post in the same category to the browser, just to show three titles and thumbnails. Trimmed it down to the six fields the list actually shows, so pages stay small as the blog grows.
- Related post dates were formatted in the visitor's timezone, so someone in the US could see the day before. Dates are stored as midnight UTC, and I'm in Nigeria (UTC+1), which is why I never saw it. Pinned that list to UTC.
- Only a few pages had a canonical URL. Added one to every page through a small shared helper, which also keeps the RSS link in the page head (a page that sets its own `alternates` otherwise drops the one from the layout).
- A post with a blank `labels`, `excerpt`, `title` or `category` could crash a page, and the search bar in the header runs on every page. Those fields now get safe defaults where posts get read in.
- The hero only had three tiles filled when it has room for four. Changed the home page to pass four.
- The post heading styles in `globals.css` were written twice, and the second copy quietly overrode the first, so the bigger desktop sizes never applied. Kept one copy.
- Moved the reviews list from `?page=2` to `/reviews/2`, the same as the archive and categories. The old way rendered on every request and left pages 2 and up out of the sitemap.
- The sitemap used a new date on static pages on every build, which Google learns to ignore. Now each list uses the date of its newest post.
- The RSS feed was missing the `atom:link` line that feed validators look for. Added it, and the validator now passes with no warnings.
- Screen readers were reading each post title twice, once from the cover image's alt text and once from the title next to it. Those images now use empty alt text. Also gave the score badge `role="img"` so its "Rated 6.8 out of 10" label actually gets announced.

---

## Still to do

- Ads, someday. When they arrive, the privacy policy's "no cookies" and "no advertising" lines need rewriting, and a cookie consent banner will probably be needed for visitors in the UK and EU. Traffic is the question to answer first, and a tip link might be a better fit until then
- Search: the header search sends the title and excerpt of every post in every page's HTML. Fine at this size, but once there are a few hundred posts it should load a small JSON file only when search opens

---

More to come as I keep working on this.