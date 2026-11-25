import * as Sentry from '@sentry/nextjs';

const environment = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT;

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment,

  // Sample every trace off production (local, staging) and 10% in production.
  tracesSampleRate: environment === 'production' ? 0.1 : 1.0,

  // Server code reports Contentful, Toast and email failures with
  // console.warn/error, so send those to Sentry Logs.
  integrations: [Sentry.consoleLoggingIntegration({ levels: ['warn', 'error'] })],
});
