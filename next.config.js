/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['platform-lookaside.fbsbx.com'],
  },
  experimental: {
    images: {
      unoptimized: true
    }
  }
}

module.exports = nextConfig
