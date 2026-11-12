import Link from "next/link";

type SectionHeadingProps = {
  title: string;
  href?: string;
  linkLabel?: string;
};

export default function SectionHeading({
  title,
  href,
  linkLabel = "View more",
}: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5 border-b border-line">
      <h2 className="relative font-serif text-xl md:text-2xl text-main pb-3">
        {title}
        <span className="absolute left-0 -bottom-px h-0.5 w-full bg-accent" />
      </h2>
      {href && (
        <Link
          href={href}
          className="pb-3 text-sm text-main/60 transition-colors hover:text-accent"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}