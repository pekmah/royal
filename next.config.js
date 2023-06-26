/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		BASE_URL: process.env.BASE_URL,
	},
	experimental: {
		serverActions: true,
	},
	images: {
		remotePatterns: [
			{
				hostname: 'royalapis.glitexsolutions.co.ke',
				protocol: 'http',
			},
			{
				hostname: 'royalapis.glitexsolutions.co.ke',
				protocol: 'https',
			},
		],
	},
};

module.exports = nextConfig;
