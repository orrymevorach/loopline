'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

// Last-resort error boundary for the whole app: reports the error to Sentry
// and shows Next.js's default error page.
export default function GlobalError({ error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang='en'>
      <body>
        {/* The App Router doesn't expose status codes, so 0 renders a generic message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
