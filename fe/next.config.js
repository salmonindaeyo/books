/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_URL_API: process.env.NEXT_PUBLIC_URL_API,
  },
};

module.exports = nextConfig;
