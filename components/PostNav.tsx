import Image from "next/image";
import Link from "next/link";
import type { NavLink } from "../utils/postLinks";

type PostNavProps = {
  links: NavLink[];
  className?: string;
};

type FadeLinkProps = {
  item: NavLink;
  isPair: boolean;
};

function FadeLink({ item, isPair }: FadeLinkProps) {
  const { post, direction, label } = item;
  // Previous has its image on the left, everything else on the right
  const isPrevious = direction === "previous";

  const imageSide = isPrevious
    ? "left-0 [mask-image:linear-gradient(to_left,transparent,black_80%),linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
    : "right-0 [mask-image:linear-gradient(to_right,transparent,black_80%),linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]";

  // Phones get a narrow image. From md up, the sizes are as before.
  const imageWidth = isPair ? "w-[45%] md:w-[70%]" : "w-[45%] md:w-1/2";

  // On phones the text sits on the opposite side from the image
  const textPosition = isPair
    ? isPrevious
      ? "ml-auto max-w-[68%] text-right md:ml-[30%] md:max-w-none md:text-left"
      : "max-w-[68%] md:mr-[30%] md:max-w-none md:text-right"
    : isPrevious
      ? "ml-auto max-w-[68%] text-right md:max-w-[65%]"
      : "max-w-[68%] md:max-w-[65%]";

  return (
    <Link
      href={`/posts/${post.slug}`}
      className={`group relative flex min-h-20 items-center overflow-hidden ${
        isPair ? "md:min-h-36" : "md:min-h-52"
      }`}
    >
      {post.coverImage && (
        <span className={`absolute inset-y-0 block [mask-composite:intersect] ${imageSide} ${imageWidth}`}>
          {/* alt="" because the title is written next to the image */}
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(min-width: 768px) 450px, 45vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </span>
      )}

      {/* The soft glow in the page color keeps text readable over the image */}
      <span
        className={`relative block min-w-0 flex-1 [text-shadow:0_0_6px_var(--page-bg),0_0_12px_var(--page-bg)] ${textPosition}`}
      >
        <span className="mb-0.5 block font-mono text-[11px] font-medium uppercase tracking-wide text-accent md:mb-1.5">
          {isPrevious && <span aria-hidden="true">← </span>}
          {label}
          {!isPrevious && <span aria-hidden="true"> →</span>}
        </span>
        <span
          className={`line-clamp-3 font-serif text-[13px] font-semibold leading-snug text-main transition-colors group-hover:text-accent ${
            isPair ? "md:text-base" : "md:text-xl"
          }`}
        >
          {post.title}
        </span>
      </span>
    </Link>
  );
}

// Only spans are used inside, so the .prose paragraph and heading
// styles in globals.css don't affect these links.
export default function PostNav({ links, className = "my-6" }: PostNavProps) {
  const isPair = links.length === 2;

  return (
    <div
      className={`not-prose grid grid-cols-1 gap-2 ${
        isPair ? "md:grid-cols-2 md:gap-6" : ""
      } ${className}`}
    >
      {links.map((item) => (
        <FadeLink key={item.direction} item={item} isPair={isPair} />
      ))}
    </div>
  );
}