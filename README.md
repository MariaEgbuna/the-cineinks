# The CineInks

A blog about movies, series, anime, and K-dramas, honest takes on what I've watched.

This used to live on Blogger, under the name "The Watchlist Chronicles." I decided to rebuild it myself instead, the way I actually wanted it to look and work.

**Live at:** [cineinks.vercel.app](https://cineinks.vercel.app)

## Why I rebuilt it

Two reasons. The old Blogger setup had some serious indexing problems, pages just weren't getting crawled or found on Google. And I wanted something real to show for my front-end skills, not just a template.

## Built with

- Next.js
- TypeScript
- Tailwind CSS

## What's actually in here

- Custom design system built from scratch (no templates)
- All 68 posts migrated from Blogger, including a script to convert the old export into clean Markdown with self-hosted, compressed images
- Individual post pages, category pages, and paginated archive pages
- Related posts on every article, matched by shared label and randomized on each visit
- Site-wide search in the header, filtering by title and excerpt
- An RSS feed at `/feed.xml`
- Sitemap, robots.txt, per-page metadata, Open Graph tags, and structured data for review scores, verified with Google's Rich Results Test
- A CMS ([Decap](https://decapcms.org)) so I can actually write and publish posts without touching code
- Vercel Web Analytics for basic visitor and page view tracking

## Random fixes and tweaks along the way

Small stuff I ran into and sorted out, keeping track mostly for myself:

- CMS Category dropdown kept showing blank even though the post had a value saved. Dropdown only allowed a few hardcoded options and the real value wasn't one of them.
- Noticed Google wasn't indexing a chunk of pages. Turned out some of my multi-season recap/review posts (Elite, From, Primal, Dorohedoro) all had near-identical titles like "Recap: Elite Season 4," which probably read as repetitive, low-value content to Google. Rewrote all of them with actual opinions baked into the title instead, plus new slugs to match.
- Related posts kept showing the exact same three every time. Apparently I only had 4 posts in that category, so there was nothing left to shuffle. Not a bug.
- Featured post excerpt was invisible on some cover images. Was rendering fine, there was just no contrast between light images and the text sitting on top. Added a gradient overlay.
- Hero looked great on desktop, broke on mobile, text was overflowing past the image. Fixed with a taller aspect ratio just for mobile, then had to fix that fix, mixed up the width/height order in Tailwind's aspect-ratio syntax and made it worse the first time around.

More to come as I keep working on this.