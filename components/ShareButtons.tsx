"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";

type ShareButtonsProps = {
  url: string;
  title: string;
  image?: string;
};

const buttonClass =
  "flex h-10 w-10 items-center justify-center rounded border border-line bg-card text-main/70 transition-colors hover:border-accent hover:text-accent";

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// Share support never changes during a visit, so there is nothing to listen for
const subscribe = () => () => {};
const getShareSupport = () => typeof navigator.share === "function";
const getServerShareSupport = () => false;

type ShareLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
};

function ShareLink({ href, label, children }: ShareLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={buttonClass}
    >
      {children}
    </a>
  );
}

export default function ShareButtons({ url, title, image }: ShareButtonsProps) {
  // Only phones and some browsers support the built-in share sheet.
  // The server value is used first, so the server and browser HTML match.
  const canNativeShare = useSyncExternalStore(
    subscribe,
    getShareSupport,
    getServerShareSupport
  );
  const [copied, setCopied] = useState(false);

  // Hide the "Link copied" message after two seconds
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // The visitor closed the share sheet. Nothing to do.
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard blocked: show the link so it can be copied by hand
      window.prompt("Copy this link:", url);
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    // Changed: the label sits on its own line, with the icons in a row below
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-main">Share this post</span>

      <div className="flex flex-wrap items-center gap-2">
        {canNativeShare && (
          <button
            type="button"
            onClick={nativeShare}
            aria-label="Share"
            title="Share"
            className={buttonClass}
          >
            <svg {...iconProps}>
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        )}

        <ShareLink
          href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
          label="Share on WhatsApp"
        >
          <svg {...iconProps}>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </ShareLink>

        <ShareLink
          href={`https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`}
          label="Share on X"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.9 2H22l-7.6 8.7L23.3 22H16.6l-5.3-6.9L5.2 22H2l8.1-9.3L1 2h6.9l4.8 6.3L18.9 2zm-1.2 18h1.7L7.4 4H5.6l12.1 16z" />
          </svg>
        </ShareLink>

        <ShareLink
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          label="Share on Facebook"
        >
          <svg {...iconProps}>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </ShareLink>

        {image && (
          <ShareLink
            href={`https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(
              image
            )}&description=${encodedTitle}`}
            label="Pin on Pinterest"
          >
            <svg {...iconProps}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </ShareLink>
        )}

        <button
          type="button"
          onClick={copyLink}
          aria-label="Copy link"
          title="Copy link"
          className={buttonClass}
        >
          {copied ? (
            <svg {...iconProps}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg {...iconProps}>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
        </button>

        <span role="status" aria-live="polite" className="text-sm text-accent">
          {copied ? "Link copied" : ""}
        </span>
      </div>
    </div>
  );
}