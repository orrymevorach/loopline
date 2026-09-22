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
  const response = await fetch(`${cmaBase}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Request failed ${response.status} ${response.statusText}: ${text}`,
    );
  }

  if (response.status === 204) return null;
  return response.json();
}

module.exports = {
  request,
  headers,
  SPACE_ID,
  ENVIRONMENT_ID,
  MANAGEMENT_TOKEN,
};
