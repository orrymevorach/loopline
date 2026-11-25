import * as Sentry from '@sentry/nextjs';

const environment = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT;

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment,

  // Sample every trace off production (local, staging) and 10% in production.
  tracesSampleRate: environment === 'production' ? 0.1 : 1.0,

  // Session Replay: 10% of sessions, plus every session that hits an error.
  // The integration is loaded after startup (below) to keep it off the
  // critical path for first paint.
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Fetch Replay from Sentry's CDN after the page loads instead of bundling it.
Sentry.lazyLoadIntegration('replayIntegration')
  .then(replayIntegration => Sentry.addIntegration(replayIntegration()))
  .catch(() => {
    // Blocked by an ad blocker or offline: errors still report without Replay.
  });

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
