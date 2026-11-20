import Link from "next/link";
import PageHeader from "../../components/PageHeader";

const summary = [
  "No cookies, and no advertising.",
  "Your name, email and message are only collected if you use the contact form.",
  "Visitor statistics are anonymous and combined, never tied to you personally.",
  "Nothing is sold, and nothing is used for marketing.",
];

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHeader
        label="Your data"
        title="Privacy Policy"
        description="I keep data collection to a minimum. This page explains exactly what is collected when you visit The CineInks, and why."
        meta="Last updated: November 2026"
      />

      <section className="bg-page pt-4 pb-6 md:pt-6 md:pb-10">
        <div className="max-w-225 mx-auto px-5">
          {/* The short version, for people who won't read the whole page */}
          <aside className="mb-8 border-l-4 border-accent bg-card p-5 md:p-6">
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-wide text-accent">
              The short version
            </p>
            <ul className="flex flex-col gap-2">
              {summary.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.9375rem] leading-relaxed text-main/80 md:text-base"
                >
                  <span aria-hidden="true" className="text-accent">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="prose">
            <h2>The contact form</h2>
            <p>
              If you use the form on the <Link href="/contact">contact page</Link>,
              you send me your name, your email address and your message. I use
              these only to read and reply to what you wrote. I do not sell them
              or use them for marketing.
            </p>
            <p>
              The form is run by a third-party service,{" "}
              <a
                href="https://web3forms.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Web3Forms
              </a>
              . Your submission goes to Web3Forms, which passes it on to my
              email. Services like this may also handle technical details such as
              your IP address, for example to filter out spam. I do not control
              how Web3Forms handles your data, so please read their{" "}
              <a
                href="https://web3forms.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacy policy
              </a>{" "}
              if you want the details. If you would rather not use the form, you
              can reach me through the social links on the contact page.
            </p>

            <h2>Analytics</h2>
            <p>
              This site uses Vercel Web Analytics to see how many people visit
              and which pages they read. It records things like the page visited,
              the site you came from, your general location (such as country),
              and the type of device, browser and operating system you use.
            </p>
            <p>
              It does not use cookies. Visitors are told apart by an anonymous
              code that is reset every day, so you cannot be followed from one
              day to the next, or from one website to another. I only see
              combined statistics, never information about individual visitors.
              You can read more in{" "}
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel&apos;s privacy documentation
              </a>
              .
            </p>

            <h2>Hosting</h2>
            <p>
              This site is hosted by Vercel. Like most web hosts, Vercel may keep
              basic technical logs, such as your IP address, when your browser
              requests a page.
            </p>

            <h2>Cookies and stored settings</h2>
            <p>
              This site does not set any cookies of its own. When you switch
              between light and dark mode, your choice is saved in your
              browser&apos;s local storage so it is remembered next time. It
              stays on your device and is never sent to me or to anyone else. You
              can clear it at any time in your browser settings.
            </p>

            <h2>Sharing buttons</h2>
            <p>
              The share buttons under each post are ordinary links. They do not
              load anything from WhatsApp, X, Facebook or Pinterest while you
              read, so those services learn nothing about your visit. Only if you
              click one do you leave this site and go to that service, where its
              own privacy policy applies. The &ldquo;copy link&rdquo; button
              works entirely on your device.
            </p>

            <h2>Advertising</h2>
            <p>
              This site currently runs no advertising. If that changes in the
              future, this page will be updated to reflect it.
            </p>

            <h2>External links</h2>
            <p>
              Posts and pages on this site may contain links to external
              websites, including my social media accounts. Once you leave this
              site, I have no control over how those sites handle your data, so
              check the privacy policy of any site you visit.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              This policy may be updated occasionally. Any changes will be posted
              on this page, with the date above updated.
            </p>

            <h2>Questions</h2>
            <p>
              If you have any questions about this page, or want to ask about a
              message you sent through the form, please{" "}
              <Link href="/contact">reach out</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}