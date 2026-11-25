import { createClient } from 'contentful';
import { connection } from 'next/server';

// Staging sets CONTENTFUL_PREVIEW=true so editors can see draft entries before
// publishing. Production leaves it unset and only ever sees published content.
export const isContentfulPreview = process.env.CONTENTFUL_PREVIEW === 'true';

const previewAccessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

if (isContentfulPreview && !previewAccessToken) {
  throw new Error(
    'CONTENTFUL_PREVIEW is enabled but CONTENTFUL_PREVIEW_ACCESS_TOKEN is not set.',
  );
}

export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master',
  ...(isContentfulPreview
    ? { accessToken: previewAccessToken, host: 'preview.contentful.com' }
    : { accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN }),
});

// Pages are prerendered at build time. In preview, render them per request
// instead so draft edits show up on refresh without a redeploy.
export async function waitForPreviewRequest() {
  if (isContentfulPreview) await connection();
}
