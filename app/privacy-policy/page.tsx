import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-page py-8 md:py-16">
      <div className="max-w-225 mx-auto px-5 prose">
        <h1 className="font-serif">Privacy Policy</h1>
        <p>Last updated: November 2026</p>
        <p>
          Your privacy matters. This page explains what data is collected
          when you visit The CineInks and how it is used.
        </p>

        <hr />

        <h3>The Contact Form</h3>
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
          . Your submission goes to Web3Forms, which passes it on to my email.
          Services like this may also handle technical details such as your IP
          address, for example to filter out spam. I do not control how
          Web3Forms handles your data, so please read their{" "}
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

        <h3>Analytics</h3>
        <p>
          This site uses Vercel Web Analytics to see how many people visit and
          which pages they read. It records things like the page visited, the
          site you came from, your general location (such as country), and the
          type of device, browser and operating system you use.
        </p>
        <p>
          It does not use cookies. Visitors are told apart by an anonymous code
          that is reset every day, so you cannot be followed from one day to the
          next, or from one website to another. I only see combined statistics,
          never information about individual visitors. You can read more in{" "}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel&apos;s privacy documentation
          </a>
          .
        </p>

        <h3>Hosting</h3>
        <p>
          This site is hosted by Vercel. Like most web hosts, Vercel may keep
          basic technical logs, such as your IP address, when your browser
          requests a page.
        </p>

        <h3>Cookies and Stored Settings</h3>
        <p>
          This site does not set any cookies of its own. When you switch between
          light and dark mode, your choice is saved in your browser&apos;s local
          storage so it is remembered next time. It stays on your device and is
          never sent to me or to anyone else. You can clear it at any time in
          your browser settings.
        </p>

        <h3>Advertising</h3>
        <p>
          This site currently runs no advertising. If that changes in the
          future, this page will be updated to reflect it.
        </p>

        <h3>External Links</h3>
        <p>
          Posts and pages on this site may contain links to external websites,
          including my social media accounts. Once you leave this site, there is
          no control over how those sites handle your data. Check the privacy
          policy of any external site you visit.
        </p>

        <h3>Changes to This Policy</h3>
        <p>
          This policy may be updated occasionally. Any changes will be posted on
          this page, with the date above updated.
        </p>

        <p>
          If you have any questions, feel free to{" "}
          <Link href="/contact">reach out</Link>.
        </p>
      </div>
    </main>
  );
}