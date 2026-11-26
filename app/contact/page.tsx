import Link from "next/link";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import { socials } from "../../components/socials";
import { pageAlternates } from "../../utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | The CineInks",
  description:
    "Get in touch with The CineInks: send a recommendation, a hot take or an enquiry, or find me on Instagram and X.",
  alternates: pageAlternates("/contact"),
};

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
                {socials.map(({ name, handle, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 border border-line bg-card p-4 transition-colors hover:border-accent"
                  >
                    <span className="text-accent">
                      <Icon size={20} />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-main">
                        {name}
                      </span>
                      <span className="block text-xs text-muted">{handle}</span>
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