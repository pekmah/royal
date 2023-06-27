/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		BASE_URL: process.env.BASE_URL,
	},
	experimental: {
		serverActions: true,
	},
	images: {
		domains: ['royalapis.glitexsolutions.co.ke'],
	},
};

module.exports = nextConfig;
