/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local' });

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID =
  process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('Missing required environment variables.');
  console.error(
    'Required: NEXT_PUBLIC_CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN',
  );
  process.exit(1);
}

const cmaBase = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}`;

const headers = {
  Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
  'Content-Type': 'application/vnd.contentful.management.v1+json',
};

async function request(path, options = {}) {
  const method = options.method || 'GET';

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(`${cmaBase}${path}`, {
      ...options,
      signal: options.signal || AbortSignal.timeout(25000),
      headers: {
        ...headers,
        ...(options.headers || {}),
      },
    });

    // Retry throttled requests and failed reads, but never replay ambiguous writes.
    const shouldRetry =
      attempt < 4 &&
      (response.status === 429 ||
        (method === 'GET' && response.status >= 500));
    if (shouldRetry) {
      const resetSeconds = Number(
        response.headers.get('X-Contentful-RateLimit-Reset'),
      );
      const delaySeconds =
        Number.isFinite(resetSeconds) && resetSeconds > 0
          ? resetSeconds
          : 2 ** attempt;
      const delayMilliseconds = Math.min(30, delaySeconds) * 1000;
      await response.text();
      console.warn(
        `Retrying Contentful ${method} ${path.split('?')[0]} after HTTP ${response.status} in ${delayMilliseconds}ms (retry ${attempt + 1}/4).`,
      );
      await new Promise(resolve => setTimeout(resolve, delayMilliseconds));
      continue;
    }

    if (!response.ok) {
      const text = await response.text();
      const error = new Error(
        `Request failed ${response.status} ${response.statusText}: ${text}`,
      );
      error.status = response.status;
      throw error;
    }

    if (response.status === 204) return null;
    return response.json();
  }
}

module.exports = {
  request,
  headers,
  SPACE_ID,
  ENVIRONMENT_ID,
  MANAGEMENT_TOKEN,
};
