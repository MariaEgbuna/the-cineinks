# Rebuilding The CineInks: From a Broken Blogger Site to a Self-Built Next.js Blog

## The problem

The blog used to live on Blogger under the name "The Watchlist Chronicles". Two things pushed me to rebuild it from scratch:

* Blogger had real structural SEO limitations: subdomain trust issues, duplicate label and archive pages, limited control over the sitemap, and weaker page speed. Pages simply weren't getting crawled or indexed properly. 
* I wanted a genuine, live example of my front-end skills, not something built from a template.

---

## Choosing the stack

I built the site with **Next.js**, **TypeScript**, and **Tailwind CSS**, and each choice had a specific reason behind it.

**Next.js** pre-builds pages into static HTML, which directly solved the indexing problem I was trying to fix. It's also a strong, specific skill to show on a resume, since React and Next.js are widely used in the industry. 

**TypeScript** was chosen for a practical reason too: it catches data inconsistencies early, which mattered a lot during the content migration since I was moving over 70 posts from Blogger's export format into clean Markdown.

**Tailwind CSS** for design. I used the [Blocksy "Daily News" starter template](https://startersites.io/blocksy/daily-news/) as a style reference. I adapted its card-based layout pattern and its serif-plus-sans-serif typography pairing, but built my own design system from scratch: a deep teal accent color, a soft off-white light theme and a true black dark theme instead of harsh pure white, PT Serif for headings, and Poppins for body text.

---

## Making the CMS decision

Content management was deliberately left undecided until after the core site was built. Once I got there, I chose **Decap CMS** instead of a hosted headless CMS like Sanity or Contentful, because Decap edits the exact same Markdown files the site already reads. That meant no changes were needed to how posts get built or migrated, which kept the system simple.

Since Decap assumes Netlify's built-in authentication by default and my site is hosted on Vercel, I had to build GitHub OAuth login myself. This meant registering a GitHub OAuth App, setting up environment variables correctly (keeping the client secret write-only since it's the only truly sensitive value), and writing two small API routes to handle the login redirect and the token exchange. 

Getting this working end to end, confirmed by publishing a real post through the CMS and watching it trigger an automatic GitHub commit and Vercel rebuild, was one of the more satisfying milestones in the build.

---

## Adding light and dark mode

I deferred this until the core build was stable, since it touches the header, the footer, the hero, every card, and the article text at once. When I did build it, my first attempt was to change both brand colors to black. The text disappeared, because my colors were named by what they looked like (`ink` and `cream`), so a change to one broke every place that used it.

The fix was to name colors by the job they do instead: page background, bar background (header, footer, banners), main text, muted text, card, line, and accent. Each job gets two values, one for light and one for dark, and text and background always swap, so they can never end up the same color. Components use the job names, not the raw colors.

A few details made it work properly:

* **The toggle** adds or removes a `dark` class on the root element and saves the choice in the browser. If a visitor has never chosen, the site follows their device setting.
* **No flash on load.** A tiny script in the page head applies the saved choice before the page paints, so a dark-mode visitor never sees a white flash.
* **The article text.** The Tailwind typography plugin sets its own text colors, and they stayed dark on a dark background. I pointed the plugin's color variables at my job colors instead of using its inverted style, and removed the `prose-neutral` class that was overriding them.
* **Things that stay fixed on purpose.** Badges and titles that sit on top of cover images keep fixed colors, since the image decides what is readable there, not the theme.

The look took a few rounds. Pure white felt harsh next to a black dark mode, so the light theme became a soft off-white. My first dark colors had a faint blue-purple tint, so I switched to neutral blacks and grays. I also made the header, footer, and page the same color in each mode, so there are no visible bands, and let thin line colors and slightly lighter cards provide the separation.

I also went through several body fonts. Raleway looked too light, and Source Sans 3 looked too condensed. Inter looked almost the same as both, which taught me that clean neutral sans fonts are built to disappear, so swapping between them changes very little. Poppins, a rounder and sturdier geometric font, was the first one that felt clearly different, so it stayed. I also set a heavier weight on the nav links so they no longer read like body text.

---

## Real problems, real fixes

A few bugs from the build are worth telling as short stories, since they show how I actually think through a problem.

**The CMS dropdown that showed blank.** A post correctly tagged as "Series" was showing an empty category field in the CMS, even though the underlying file was correct. I traced the rendering path from the article card component back through the post data all the way to the frontmatter, and found the dropdown was restricted to five hardcoded options left over from earlier in the build. The fix was straightforward once I found it, but it taught me to separate the field used for badge display from the field used for page filtering, since they were doing two different jobs that looked like one.

**The indexing problem that wasn't about my code.** After the site had been live for a while, Search Console showed 47 pages weren't indexed. Most were simply not yet crawled, which is normal for a new site. But four pages had actually been crawled and rejected. I found the pattern: several multi-season recap posts for the same shows all used a near-identical title template, differing only by a number, which likely read to Google as repetitive, thin content. I rewrote 17 post titles and slugs to bake in an actual opinion for each one, and added permanent redirects only for the three URLs Google had already crawled under their old names, since there was nothing to preserve for the rest.

**The mobile hero that broke twice.** The featured post's cover image looked fine on desktop but overflowed on mobile. My first fix, changing the aspect ratio to give the text more room, actually made it worse, because I had the width and height relationship backwards in Tailwind's aspect-ratio syntax. Once I corrected the ratio, a second issue appeared: the taller box now needed more horizontal cropping, which cut off text baked into some cover images. I ended up removing the excerpt from the hero entirely, which solved the crowding problem more cleanly than continuing to adjust the ratio.

**The build that failed because of a server-only import.** A new related posts component briefly imported a date formatting function from a file that also handled reading posts from the file system. Since the component ran on the client, this broke the production build, because client-side code can't use Node's file system module. The fix was a small local copy of the formatting function inside the component itself, keeping server-only code out of the client bundle.

**The archive pages that stayed light.** After the dark mode switch, page 1 of the archive was dark but page 2 and up still had a light strip behind the cards. The numbered pages came from a separate route file that was a near-copy of the first, and it still used the old color class. Searching the whole project for the old color classes, not just the files I remembered, is now part of how I finish any change that touches shared styles.

---

## What I chose not to build yet

Not every idea made it into the current version, and I think that's worth including in a case study, since it shows judgment rather than just a feature checklist.

* A "Featured" badge was added to the homepage hero and then removed shortly after, since it felt redundant next to the existing category badge. 
* A recent posts column was built for the footer and then removed, since it duplicated a link that already existed on the homepage.

---

## Where it stands now

The site is fully live and deployed on Vercel, rebuilding automatically on every GitHub push. All 70 posts have been migrated, SEO fundamentals are in place (sitemap, robots.txt, Open Graph tags, and structured data verified with Google's Rich Results Test), and the CMS workflow is confirmed working end to end. Search, an RSS feed, related posts, a light and dark mode toggle, and numbered archive pagination with first, previous, next, and last controls are all live. Privacy-friendly analytics are running through Vercel Web Analytics, since it requires no cookie consent banner.

---

**Live site:** [cineinks.vercel.app](https://cineinks.vercel.app)
**Stack:** Next.js, TypeScript, Tailwind CSS, Decap CMS, Vercel