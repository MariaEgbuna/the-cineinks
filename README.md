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

More to come as I keep working on this.