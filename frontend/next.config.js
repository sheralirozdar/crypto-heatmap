/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.coingecko.com', 'coin-images.coingecko.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.coingecko.com',
      },
    ],
  },
  env: {
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL || 'http://localhost:8000',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_BASE_URL || 'http://localhost:8000'}/api/:path*`,
      },
    ];
  },
}

module.exports = nextConfig