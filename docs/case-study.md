# Case study: rebuilding The CineInks

How I moved my blog from Blogger to a site I built with Next.js. For an overview, go back to the [README](../README.md).

**Live site:** [cineinks.vercel.app](https://cineinks.vercel.app)

## The problem

The blog used to live on Blogger as "The Watchlist Chronicles". Two things pushed me to rebuild it:

- **Search visibility:** pages weren't being crawled or indexed properly. I also wanted more control over things like the sitemap, duplicate listing pages and page speed.
- **My portfolio:** I wanted a real, live example of my front-end skills.

I migrated 68 posts, converting the Blogger export into Markdown with self-hosted, compressed images.

## Choosing the stack

- **Next.js:** it can pre-build pages as static HTML, which gave me a strong base for search visibility, though it doesn't guarantee indexing. I also wanted to show React and Next.js skills.
- **TypeScript:** it helps catch mistakes in how the code handles data. Since it doesn't check Markdown front matter while the site runs, I also clean those values when posts are read.
- **Tailwind CSS:** I used it to build my own design system.

## Design

I used the [Blocksy "Daily News" starter template](https://startersites.io/blocksy/daily-news/) as a style reference, especially its card layout. From there, I developed my own look with a teal accent, a soft off-white light theme and a true black dark theme.

The typography changed along the way. I tried several fonts, including PT Serif, Raleway, Source Sans 3, Inter and Poppins. The current site uses Plus Jakarta Sans for headings, Inter for body text and IBM Plex Mono for small details.

## Choosing a CMS

I left this decision until the core site was built. I chose Decap CMS because it edits the same Markdown files the site already reads, so I didn't have to change how posts were migrated or built.

My site is hosted on Vercel, so I set up GitHub login myself. That meant registering a GitHub OAuth app, setting environment variables and writing two API routes: one starts the login, and the other exchanges GitHub's code for a token. The client secret stays on the server.

Publishing a post through the CMS and watching it create a GitHub commit and trigger a Vercel rebuild was one of the most satisfying parts of the project.

## Light and dark mode

I waited until the core layout was stable, since theming touches almost every part of the site.

My first attempt changed both brand colors to black, and the text disappeared. The colors were named for how they looked, `ink` and `cream`, while being used for different jobs.

I fixed this by naming theme colors for their roles, such as page background, main text, muted text, card, line and accent. Each role has a light and dark value.

- **Remembering the choice:** the toggle saves it in the browser. Until then, the site follows the device setting.
- **Preventing a flash:** a small script applies the theme before the page appears.
- **Article text:** the Tailwind typography plugin had its own colors. I connected them to my theme colors and removed the `prose-neutral` class that was overriding them.
- **Fixed colors:** some text and badges over images keep the same colors in both themes, because the image affects readability.

Pure white felt too harsh, and my first dark colors had a blue-purple tint. I moved to an off-white and neutral blacks and grays. Matching the header, footer and page backgrounds removed the visible color bands.

## Problems that taught me something

### The blank CMS category

A post had a category saved, but the field appeared blank in the CMS. I traced the data back to the front matter and found that the dropdown didn't include that value. It also helped me separate two ideas: the category readers see and the labels used to group posts.

### Pages that weren't indexed

Search Console showed 47 pages that weren't indexed. Most hadn't been crawled yet, but four had been crawled and left out of the index.

I noticed that several season recaps and reviews had nearly identical titles. I suspected they looked repetitive, although the report didn't confirm that. I rewrote 17 titles and slugs to reflect my opinion of each season, and used permanent redirects to send old addresses to new ones.

### The mobile hero

The featured image looked fine on desktop, but its text overflowed on phones. My first change to the aspect ratio made it worse because I had the width and height relationship backwards. Correcting it created more image cropping, which cut off text built into some covers. I also removed the excerpt from the hero to reduce crowding.

### A server import in a browser component

Related Posts imported a date formatter from the same file that read posts from disk. That pulled server-only code toward the browser and broke the build.

My first fix was a local copy of the formatter. Later, I moved it into its own file with no file-system imports. Server and browser components can now share it, with dates fixed to UTC.

### Archive pages that stayed light

After adding dark mode, the first archive page looked right, but later pages still had a light strip. They came from a separate, nearly identical file that used an old color class. I learned to search the whole project after changing shared styles.

## Cleaning up the code

That duplicated archive code was a good reason to simplify things later:

- The archive, category and review pages now share one listing component
- Search reuses its header and post grid
- Both ranked lists on the stats page use one component
- The short date formatter and social links each have one shared home
- About, Contact and Privacy keep their metadata in their page files

I also fixed lint errors in Related Posts and the share buttons. I didn't merge everything: some repeated styling was clearer left where it was.

I made the footer more compact too. On phones, I compared mockups and chose a centered two-column link grid.

## What I left out

- **A "Featured" badge:** I added it to the hero, then removed it because it felt redundant beside the category badge.
- **Recent posts in the footer:** I removed the column because it repeated a link already on the home page.

## Where it stands

The site is live on Vercel and rebuilds when I push changes to GitHub. It has search, an RSS feed, related posts, light and dark mode, pagination and a CMS. It uses Vercel Web Analytics, which doesn't use cookies.

During development, I also checked the RSS feed with the W3C Feed Validator and review structured data with Google's Rich Results Test.

For the full list, see [Features](features.md).