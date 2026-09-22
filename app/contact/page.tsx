export default function ContactPage() {
  return (
    <main className="bg-cream py-16">
      <div className="max-w-225 mx-auto px-5">
        <div className="prose prose-neutral mb-8">
          <h1 className="font-serif">Contact</h1>
          <p>
            Got a recommendation? Want to discuss a show, drop a hot take, or
            just make an enquiry? Use the form below or find me on social
            media.
          </p>
        </div>

        <div className="flex gap-5 mb-10">
          <a
            href="https://www.instagram.com/eagercricket/"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 text-sm text-ink/70"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            Instagram
          </a>

          <a
            href="https://x.com/eagercricket"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 text-sm text-ink/70"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.9 2H22l-7.6 8.7L23.3 22H16.6l-5.3-6.9L5.2 22H2l8.1-9.3L1 2h6.9l4.8 6.3L18.9 2zm-1.2 18h1.7L7.4 4H5.6l12.1 16z" />
            </svg>
            Twitter
          </a>
        </div>

        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="max-w-125"
        >
          <input
            type="hidden"
            name="access_key"
            value="e61a8c9f-262d-48d5-9c1d-706c1d637168"
          />
          <input type="hidden" name="subject" value="New message from The CineInks Contact Page" />

          <div className="mb-5">
            <label className="block text-sm mb-1.5">Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full rounded border border-black/15 px-3 py-2.5 text-sm text-ink"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded border border-black/15 px-3 py-2.5 text-sm text-ink"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1.5">Message</label>
            <textarea
              name="message"
              rows={6}
              required
              className="w-full rounded border border-black/15 px-3 py-2.5 text-sm text-ink resize-y"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-teal text-teal-light px-8 py-3 text-sm font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}