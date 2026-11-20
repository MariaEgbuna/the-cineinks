import Link from "next/link";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

const socials = [
  {
    name: "Instagram",
    handle: "@thecineinks",
    href: "https://www.instagram.com/thecineinks/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    handle: "@eagercricket",
    href: "https://x.com/eagercricket",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.9 2H22l-7.6 8.7L23.3 22H16.6l-5.3-6.9L5.2 22H2l8.1-9.3L1 2h6.9l4.8 6.3L18.9 2zm-1.2 18h1.7L7.4 4H5.6l12.1 16z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        label="Get in touch"
        title="Contact"
        description="Got a recommendation? Want to discuss a show, drop a hot take, or just make an enquiry?"
      />

      <section className="bg-page pt-4 pb-6 md:pt-6 md:pb-10">
        <div className="max-w-225 mx-auto px-5">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-12">
            {/* Left: intro and social links */}
            <div className="md:col-span-2">
              <p className="mb-8 text-[0.9375rem] leading-relaxed text-main/70 md:text-base">
                Send a message using the form. I read every one and reply as
                soon as I can.
              </p>

              <p className="mb-3 font-mono text-xs font-medium uppercase tracking-wide text-accent">
                Or find me on
              </p>
              <div className="flex flex-col gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 border border-line bg-card p-4 transition-colors hover:border-accent"
                  >
                    <span className="text-accent">{social.icon}</span>
                    <span>
                      <span className="block text-sm font-medium text-main">
                        {social.name}
                      </span>
                      <span className="block text-xs text-muted">
                        {social.handle}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: the form */}
            <div className="md:col-span-3">
              <ContactForm />
              <p className="mt-4 max-w-125 text-xs leading-relaxed text-muted">
                Your name, email and message are only used to reply to you. Read
                the <Link href="/privacy-policy" className="text-accent underline">privacy policy</Link>{" "}
                for details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}