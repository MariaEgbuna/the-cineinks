# The CineInks

A blog about movies, series, anime, and K-dramas, honest takes on what I've watched.

This used to live on Blogger, under the name "The Watchlist Chronicles." I decided to rebuild it myself instead, the way I actually wanted it to look and work.

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
  - A hero with one big lead story and four tiles (on phones the four tiles turn into a list)
  - A Top Rated list, the five highest scores
  - A section each for Movies, Series, Anime, and KDrama, skipping any post already in the hero
- **Post pages:**
  - Cover image banner behind the title
  - Reading time and a reading progress bar
  - A Rating card at the end of scored posts, with an optional one-line verdict
  - Related posts, matched by shared label and randomized on each visit
- **Category pages and the archive:** both paginated, 9 posts per page
- **Search:** a live dropdown in the header, plus a full results page at `/search`. The results page looks through titles, excerpts, categories, labels, and the post text itself, ranks title matches first, and is paginated too
- An RSS feed at `/feed.xml`
- Sitemap (including the paginated pages), robots.txt, per-page metadata, Open Graph tags, and structured data for review scores, verified with Google's Rich Results Test
- A CMS ([Decap](https://decapcms.org)) for when I want to write and publish without touching code
- Vercel Web Analytics for basic visitor and page view tracking
- A contact form (via [Web3Forms](https://web3forms.com)) and a privacy policy page that says what's actually collected

---

## Writing a post

Posts are Markdown files in `content/posts`, starting with front matter:

- `title`, `slug`, `date`, `category`, `labels`, `excerpt`, `coverImage`, `featured`: every post
- `score`: only for rated posts. Leave it out for posts with no rating
- `verdict`: optional, one short line shown on the Rating card. Wrap it in quotes, and don't put a straight double quote inside it. Posts without one just show the score and the bar

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
- Privacy policy was wrong: it said no analytics and no forms, but the site runs Vercel Analytics and has a contact form. Rewrote it to say what's actually going on.

---

More to come as I keep working on this.