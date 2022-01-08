const withPWA = require('next-pwa');

module.exports = withPWA({
  future: { webpack5: true },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSEGING_SENDER_ID: process.env.FIREBASE_MESSEGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    MICRO_CMS_HOST: process.env.MICRO_CMS_HOST,
    MICRO_CMS_API_KEY: process.env.MICRO_CMS_API_KEY,
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
  },
});
