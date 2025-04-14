import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  imege: {
    remotePattterns: [
      {
        protocol: "https",
        hostname: "images.dog.ceo",
      },
    ],
  },
};

export default nextConfig;
