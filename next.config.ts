import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;