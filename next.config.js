/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/entry',
      },
    ];
  },
};

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

module.exports = withPWA(nextConfig);
