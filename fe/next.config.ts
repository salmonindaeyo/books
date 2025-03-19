import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_URL_API: process.env.NEXT_PUBLIC_URL_API,
 
  },
};

export default nextConfig;
