/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["royalapis.glitexsolutions.co.ke"],
    minimumCacheTTL: 3600,
  },
};

module.exports = nextConfig;
