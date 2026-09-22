/* eslint-disable no-console */
const { request } = require('./setup');

const slugify = value =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

const entryLink = id => ({ sys: { type: 'Link', linkType: 'Entry', id } });

const sleep = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

async function getDefaultLocale() {
  const { items } = await request('/locales');
  const defaultLocale = items.find(locale => locale.default);
  if (!defaultLocale) throw new Error('No default locale found in space.');
  return defaultLocale.code;
}

async function getExisting(resourcePath) {
  try {
    return await request(resourcePath);
  } catch (error) {
    if (String(error.message).includes('404')) return null;
    throw error;
  }
}

async function publish(resourcePath, version) {
  return request(`${resourcePath}/published`, {
    method: 'PUT',
    headers: { 'X-Contentful-Version': String(version) },
  });
}

async function upsertEntry(entryId, contentTypeId, fields) {
  const entryPath = `/entries/${entryId}`;
  const existing = await getExisting(entryPath);

  const entry = await request(entryPath, {
    method: 'PUT',
    body: JSON.stringify({ fields }),
    headers: {
      'X-Contentful-Content-Type': contentTypeId,
      ...(existing
        ? { 'X-Contentful-Version': String(existing.sys.version) }
        : {}),
    },
  });

  await publish(entryPath, entry.sys.version);
  return entryId;
}

module.exports = {
  slugify,
  entryLink,
  sleep,
  getDefaultLocale,
  getExisting,
  publish,
  upsertEntry,
};
