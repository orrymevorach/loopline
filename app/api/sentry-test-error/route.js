// TEMPORARY: verifies Sentry in production. Delete after confirming the error arrives.
export const dynamic = 'force-dynamic';

export function GET() {
  throw new Error(`Sentry production test error ${Date.now()}`);
}
