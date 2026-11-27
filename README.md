# The CineInks

A blog about movies, series, anime and K-dramas, with honest takes on what I've watched.

**Live site:** [cineinks.vercel.app](https://cineinks.vercel.app)

## Why I rebuilt it

The blog used to live on Blogger as "The Watchlist Chronicles", where I had trouble getting pages indexed on Google. I also wanted a real project that shows my front-end skills, so I rebuilt it myself and migrated all 68 posts.

## Highlights

- **Markdown publishing:** write posts as files, or use Decap CMS, which saves to the same files
- **Light and dark mode:** follows your device setting until you choose, then remembers your choice
- **Search and browsing:** quick results in the header, a full search page, categories and a paginated archive
- **Reading extras:** reading time, a progress bar, share buttons and related posts
- **By the Numbers:** a [stats page](https://cineinks.vercel.app/stats) showing how I watch and score
- **SEO and feeds:** canonical URLs, social sharing metadata, structured data for scored posts, a sitemap and an RSS feed

## Built with

- Next.js and React
- TypeScript
- Tailwind CSS v4
- Decap CMS
- Vercel hosting and Web Analytics

## Run it locally

I use Node.js v24.22.1. No environment variables are needed to browse the site locally.

```bash
git clone https://github.com/MariaEgbuna/the-cineinks.git
cd the-cineinks
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000).

The contact form is connected to the real service, so a test message sent locally will still be delivered.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run lint` | Checks the code with ESLint |
| `npm run build` | Creates a production build |
| `npm run start` | Serves the production build |

## Environment variables

| Name | Purpose | Where to set it |
|---|---|---|
| `DEV_ORIGIN` | Optional. Allows testing the dev server from another device, such as a phone | `.env.local` |
| `GITHUB_OAUTH_CLIENT_ID` | GitHub login for the CMS | Hosting environment |
| `GITHUB_OAUTH_CLIENT_SECRET` | GitHub login for the CMS. Keep it private | Hosting environment |

For `DEV_ORIGIN`, use your computer's local network address without `http://` or a port number, then restart the dev server.

The CMS settings and login redirect point to the live site. If you're running your own copy, update the repository and site address in the CMS config, and `SITE_URL` in `utils/site.ts`.

## Documentation

- [Features](docs/features.md)
- [Writing posts](docs/writing-posts.md)
- [Case study](docs/case-study.md)
- [Fixes and lessons](docs/fixes.md)