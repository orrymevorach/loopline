const { withSentryConfig } = require('@sentry/nextjs/config');

// Netlify sets CONTEXT ("production", "branch-deploy", ...) and BRANCH at
// build time. Tag Sentry events by where they came from, so staging errors
// don't mix with production ones.
const sentryEnvironment =
  process.env.CONTEXT === 'production'
    ? 'production'
    : process.env.BRANCH || 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SENTRY_ENVIRONMENT: sentryEnvironment,
  },
  images: {
    formats: ['image/webp'],
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
    ],
  },
};

module.exports = withSentryConfig(nextConfig, {
  org: 'orry-mevorach',
  project: 'loopline',

  // Uploads source maps for readable stack traces when the token is set
  // (on Netlify). Without it, the build skips the upload.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,

  // Only print source map upload logs in CI.
  silent: !process.env.CI,
});
