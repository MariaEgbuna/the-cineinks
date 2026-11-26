type IconProps = {
  size?: number;
};

export function InstagramIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function XIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.6 8.7L23.3 22H16.6l-5.3-6.9L5.2 22H2l8.1-9.3L1 2h6.9l4.8 6.3L18.9 2zm-1.2 18h1.7L7.4 4H5.6l12.1 16z" />
    </svg>
  );
}

export const socials = [
  {
    name: "Instagram",
    handle: "@thecineinks",
    href: "https://www.instagram.com/thecineinks/",
    Icon: InstagramIcon,
  },
  {
    name: "X (Twitter)",
    handle: "@eagercricket",
    href: "https://x.com/eagercricket",
    Icon: XIcon,
  },
];