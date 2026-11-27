# Writing posts

Posts are Markdown files in `content/posts`. I can write them directly or use the CMS. For setup, go back to the [README](../README.md).

## Two ways to write

### VS Code

Create a `.md` file in `content/posts`, then use a snippet from `.vscode/cineinks.code-snippets`. Type a prefix and choose the snippet. If no suggestion appears, press `Ctrl+Space`.

| Prefix | Post type |
|---|---|
| `review` | Review |
| `recap` | Recap |
| `hof` | Hall of Fame |
| `spotlight` | Spotlight |
| `extra` | Thoughts, rants or hot takes |
| `list` | Best and worst, or rankings |
| `recs` | Recommendations |

### Decap CMS

The CMS is set up for the live site and uses GitHub login. It saves to the `master` branch of the repository, and Vercel rebuilds the site from the new commit.

## Front matter

Each post starts with its details:

```yaml
---
title: "Movie Title (2026) Review: My Take"
slug: "movie-title-review"
date: "2026-11-27T10:30:00+01:00"
category: "Review"
labels: ["Movies"]
score: 7.5
verdict: "Worth your time."
excerpt: "One sentence with the main take."
coverImage: "/images/posts/movie-title-review/cover.jpg"
year: "2026"
length: "1h 45m"
genres: "Drama, Thriller"
featured: false
---
```

| Field | What it does | If it's left out of a file |
|---|---|---|
| `date` | Sets the publish date and post order | **Always include it.** There's no default, and the build can fail |
| `title` | Names the post | Uses the slug |
| `slug` | Sets the address: `/posts/your-slug` | Uses the file name |
| `category` | Sets the displayed category | Left empty |
| `labels` | Controls where the post is grouped | Empty list |
| `excerpt` | Appears in the banner, some listings and search | Empty text |
| `coverImage` | Sets the main image | No cover image |
| `score` | Rating out of 10 | No rating |
| `verdict` | A short line on the rating card | No verdict |
| `year`, `length`, `genres` | Details shown in the banner | Skipped |
| `featured` | Makes the post eligible to lead the home page | Not featured |

The defaults are a safety net. For a published post, I still fill in the title, slug, category, labels and excerpt. The CMS also requires these, along with the date and body.

### Things to watch

- **Slugs:** give every post a unique one.
- **Scores:** write a number without quotes, such as `score: 7.5`. A quoted score is ignored.
- **Text with colons or quotes:** wrap values containing colons in quotes. If the text includes double quotes, escape them or use single quotes around the value. Check apostrophes if you use single quotes.
- **Dates:** include the time zone. Listing dates use UTC, so a post just after midnight at `+01:00` shows the previous day there.
- **Genres:** use comma-separated text. The site also reads lists in older posts.
- **Featured posts:** if more than one is featured, the newest one leads the home page.

## Categories and labels

They do different jobs. **Category** is mainly what readers see. **Labels** decide which category pages include a post.

| To include a post in | Use |
|---|---|
| Movies, Series, Anime or KDrama pages | The matching label |
| Recap, List, Spotlight or Extra pages | The matching label |
| The Reviews page | A category of `Review` or `Quick Take` |

- The home page's Spotlight and Extras sections use labels
- Medium labels also feed the averages on the stats page
- Related posts match on the medium label first. Without one, they use the first label
- Add `Movies` with that exact spelling to a scored movie review, so its structured data identifies it as a movie

## Images

I keep each post's images in its own folder:

```text
public/images/posts/your-slug/cover.jpg
```

Leave `public` out of the path inside a post:

```md
![A short description of the image](/images/posts/your-slug/cover.jpg)
```

A 4:3 cover fits the post banner best. The CMS is configured to upload to `public/images/posts`, so check the image path after uploading.

## Links to other posts

A normal link inside a sentence stays a normal link. A link in its own paragraph gets a special style.

**Button:**

```md
[Read my full review](/posts/your-slug)
```

**Previous and Next cards:**

```md
[← Prev: Season 1](/posts/season-one-slug) [Next: Season 3 →](/posts/season-three-slug)
```

The slugs must belong to existing posts. A pair needs one Prev link and one Next link. When Prev or Next links are the last paragraph, they appear after the rating card on scored posts.

## Before publishing

> **There's no scheduling or draft field.** A future date doesn't hide a post. Once it's included in a live deployment, it's public.

1. Run `npm run dev` and read through the post.
2. Check the images, links and phone layout.
3. Run `npm run lint` and `npm run build`.
4. Commit and push.

These steps are for posts written locally. In the CMS, check everything before you publish.

## Changing a published slug

Changing a slug changes the post's address. Add a permanent redirect from the old address in `next.config.ts`, and update any links to it in other posts.