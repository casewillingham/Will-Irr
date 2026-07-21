import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about-4", destination: "/about", permanent: true },
      { source: "/about-4-1", destination: "/design", permanent: true },
      { source: "/services-8", destination: "/commercial", permanent: true },
      {
        source: "/services-4",
        destination: "/landscape-lighting",
        permanent: true,
      },
      { source: "/contact-9", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
