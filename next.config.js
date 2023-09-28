/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["api.royalmabati.com"],
    minimumCacheTTL: 3600,
  },
};

module.exports = nextConfig;
