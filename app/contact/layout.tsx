import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | The CineInks",
  description:
    "Get in touch with The CineInks: send a recommendation, a hot take or an enquiry, or find me on Instagram and X.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}