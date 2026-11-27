# Fixes and lessons

Things that broke or bothered me, and what I changed. These are grouped by topic, so some entries describe how the site worked at the time. For setup, go back to the [README](../README.md).

## CMS and content

- **Blank CMS category:** a saved category wasn't in the dropdown. [Full story](case-study.md#the-blank-cms-category).
- **More missing categories:** while updating these docs, I found other categories missing from the dropdown and added them to the CMS config.
- **Empty "/10" badge:** unrated posts had no score field, but my code only checked for an empty value. Missing and non-number scores are now treated as no rating.
- **Missing post fields:** my docs promised defaults that the code didn't provide. I added them for the title, slug, category, labels and excerpt. Dates are still required.
- **Date printed as `[object Object]`:** an unquoted front matter date became a date object, which ended up in a meta tag. Dates are now converted to text.

## Layout and design

- **Hard-to-read hero text:** the excerpt disappeared into some cover images, so I added a gradient overlay at the time.
- **Mobile hero:** the text overflowed, and my first fix made it worse. [Full story](case-study.md#the-mobile-hero).
- **Crowded mobile tiles:** the small hero tiles left little room for titles, so I turned them into list rows on phones.
- **Empty hero space:** the hero had room for four smaller posts but received three. I passed it four.
- **Repeated home page posts:** the "Latest" list repeated the hero, so I removed it. Reviews, Spotlight and Extras also skip hero posts.
- **Thin navigation text:** with the fallback font I had at the time, the links looked too light. I made them larger, heavier and brighter.
- **Faint small text:** dates and other labels were hard to read in light mode, so I switched them to a darker muted color.
- **Archive pages that stayed light:** a duplicate route used an old color class. [Full story](case-study.md#archive-pages-that-stayed-light).
- **Heading sizes:** duplicate CSS rules overrode the larger desktop sizes, so I kept one set.
- **Tall footer:** it took up too much of the phone screen. I made it compact, with a centered two-column link grid.
- **Quiet archive link:** I turned "View all posts" into a solid teal button.
- **Footer partway up short pages:** pages with little content, like an empty search, left space below the footer. The content area now fills that space, keeping the footer at the bottom of the screen.

## Navigation and search

- **Search had no results page:** the icon and Enter key did nothing useful, so I connected them to a new `/search` page.
- **Long category pages:** I added pagination before they could grow into endless lists.
- **Missing navigation underline:** it disappeared on later category pages. It now stays on the current category.
- **Invalid archive addresses:** an address like `/archive/2abc` could be read as page 2. Page values are now checked before use.
- **Generic 404 page:** I replaced it with one that matches the site.
- **Broken retrospective link:** the Elite Season 3 recap pointed to an old address. I updated it to the current one.

## Related posts and sharing

- **The same related posts:** the group I checked had only four posts, leaving little to shuffle. This wasn't a bug.
- **Extra data sent to the browser:** Related Posts received full article text just to show a short list. It now receives only the fields it needs.
- **Server import in a browser component:** a shared import broke the build. [Full story](case-study.md#a-server-import-in-a-browser-component).
- **Dates changing by time zone:** a browser could show a different day from the post's UTC date. The short date formatter now uses UTC.

## SEO and feeds

- **Pages that weren't indexed:** I rewrote repetitive-looking titles and added redirects. [Full story](case-study.md#pages-that-werent-indexed).
- **Shared page metadata:** About, Contact and Privacy Policy used the home page's title and description, so I gave each its own.
- **Missing canonical URLs:** I added them to the main public pages through a shared helper.
- **Missing RSS discovery link:** custom metadata on the archive and stats pages replaced the layout's feed link. The shared helper now includes it.
- **Reviews pagination:** I moved from query strings to paths like `/reviews/2`, allowing those pages to be pre-built and added to the sitemap.
- **Misleading sitemap dates:** static pages got a new date on every build. Content lists now use their newest post's date, while About, Contact and Privacy have none.
- **RSS validation:** I added the missing `atom:link` entry. The feed passed the W3C Feed Validator when I checked it.

## Contact and privacy

- **Leaving the site after sending a message:** Web3Forms opened its own success page. The form now sends in the background and shows the result on my page.
- **Outdated privacy policy:** it didn't mention analytics or the contact form. I rewrote it and later added the share buttons.
- **Skipped heading level:** the privacy policy jumped from `h1` to `h3`, so I changed those headings to `h2`.

## Development and accessibility

- **Dead buttons during phone testing:** Next.js blocked development scripts when I opened the site over Wi-Fi. I allowed my computer's address through `DEV_ORIGIN`.
- **Lint errors:** two components set state directly inside effects. I changed how Related Posts shuffles and how the share buttons detect browser support.
- **Titles read twice:** screen readers announced both image alt text and visible titles. I made the repeated alt text empty.
- **Score label:** I added `role="img"` to score badges so their spoken rating labels work more reliably.