import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The CineInks",
  description:
    "What data The CineInks collects, how the contact form and analytics work, and how your information is used.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}