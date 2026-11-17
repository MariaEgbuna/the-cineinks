import type { NextConfig } from "next";

const devOrigin = process.env.DEV_ORIGIN;

const nextConfig: NextConfig = {
  ...(devOrigin ? { allowedDevOrigins: [devOrigin] } : {}),
  async redirects() {
    return [
      {
        source: "/posts/recap-elite-season-1",
        destination: "/posts/recap-elite-season-1-still-the-best",
        permanent: true,
      },
      {
        source: "/posts/review-from-season-1",
        destination: "/posts/review-from-season-1-intrigued",
        permanent: true,
      },
      {
        source: "/posts/review-from-season-2",
        destination: "/posts/review-from-season-2-still-good",
        permanent: true,
      },
      {
        source: "/posts/review-dorohedoro-season-1",
        destination: "/posts/review-dorohedoro-season-1-underrated",
        permanent: true,
      },
      {
        source: "/posts/recap-elite-season-2",
        destination: "/posts/recap-elite-season-2-solid-followup",
        permanent: true,
      }
    ];
  },
};

export default nextConfig;