# Features

What The CineInks can do. For setup, go back to the [README](../README.md).

## Home page

- A hero with one lead story and four more posts. The lead is a featured post, or the newest one if none is featured. On phones, the four posts become a list
- A Top Rated list of five high-scoring posts, with a link to my stats
- "Browse By" links for Movies, Series, Anime and KDrama
- Sections for Reviews, Spotlight and Extras, which skip posts already in the hero
- A "View all posts" button that leads to the archive

## Post pages

- A banner with the category, title, excerpt, date and reading time. It can also show a cover image, year, length and genres
- A reading progress bar
- A rating card on scored posts, with an optional one-line verdict
- Links to my other posts can appear as buttons or Previous and Next cards when they're in their own paragraph. Closing Previous and Next links sit after the rating card
- Share links for WhatsApp, X and Facebook, plus Pinterest on posts with a cover image
- A copy link button, and a native share button in browsers that support it
- Up to three related posts, picked at random from posts with a matching label. Their article text isn't sent along with the list

## Browsing

- An archive, category pages and a reviews page, with nine posts per page
- Clean page addresses, such as `/archive/2`, `/category/series/2` and `/reviews/2`
- The current category stays underlined in the navigation, including on later pages

## Search

I limit search to titles and excerpts. Searching full articles brought up too many posts that only mentioned a word in passing.

- **Header search:** shows up to six matches as you type, newest first
- **Search page:** every search word has to match. Title matches rank higher, and results are paginated
- Search result pages are marked `noindex`

## By the Numbers

The [stats page](https://cineinks.vercel.app/stats) shows:

- Total and rated posts, my average score and my score range
- Average scores for movies, series, anime and K-dramas
- How my scores are spread out
- Posts per year
- My five highest-rated posts, plus the five lowest once there are at least ten rated posts

## Other pages

- **About:** what the blog covers and how I rate
- **Contact:** social links and a form powered by [Web3Forms](https://web3forms.com). It keeps visitors on the site, shows sending, success and error states, and includes a hidden spam trap
- **Privacy Policy:** a short summary followed by the details
- **404:** a custom page with ways back to the home page or archive

## Design

- Light and dark themes with a teal accent. The site follows your device setting until you use the toggle, then remembers your choice
- Layouts that adapt to phones and desktops
- A compact footer, with a two-column link grid on phones

## Publishing

- Posts are Markdown files
- [Decap CMS](https://decapcms.org) edits those same files, with GitHub login
- The login flow checks a `state` value and restricts the sign-in message to my site's origin

See [Writing posts](writing-posts.md) for the details.

## SEO and feeds

- Page titles and canonical URLs for the main public pages
- Social sharing metadata
- Review structured data on scored posts
- A sitemap that includes paginated pages, and a `robots.txt` file
- An RSS feed of the 15 newest posts at `/feed.xml`

## Accessibility

- A "Skip to content" link
- A visible focus style for keyboard users
- A menu button that tells screen readers whether it's open
- Empty alt text on card images where the title is already beside or over them
- Spoken labels for score badges
- Shorter animations and transitions when reduced motion is turned on

## Analytics

I use Vercel Web Analytics to see visits and page views. The [privacy policy](https://cineinks.vercel.app/privacy-policy) explains what's collected.

## Still to do

- **Ads or a tip link:** I need to look at traffic first. Ads would also mean reviewing the privacy policy and any consent requirements
- **Lighter search:** the header currently receives every post's title and excerpt on each page. As the blog grows, I want to load that data only when search opens