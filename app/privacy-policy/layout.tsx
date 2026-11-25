import type { Metadata } from "next";
import { pageAlternates } from "../../utils/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | The CineInks",
  description:
    "What data The CineInks collects, how the contact form and analytics work, and how your information is used.",
  alternates: pageAlternates("/privacy-policy"),
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}