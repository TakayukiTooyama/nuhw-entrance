const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextCofig = {
  rewrites: async () => [{ source: '/', destination: '/entry' }],
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
};

module.exports = withPWA(nextCofig);
