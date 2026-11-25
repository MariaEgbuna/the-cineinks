import type { Metadata } from "next";
import { pageAlternates } from "../../utils/seo";

export const metadata: Metadata = {
  title: "Contact | The CineInks",
  description:
    "Get in touch with The CineInks: send a recommendation, a hot take or an enquiry, or find me on Instagram and X.",
  alternates: pageAlternates("/contact"),
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}