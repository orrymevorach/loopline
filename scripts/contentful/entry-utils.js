/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const { request, SPACE_ID, MANAGEMENT_TOKEN } = require('./setup');

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

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

async function uploadFile(absolutePath) {
  const response = await fetch(
    `https://upload.contentful.com/spaces/${SPACE_ID}/uploads`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
        'Content-Type': 'application/octet-stream',
      },
      body: fs.readFileSync(absolutePath),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Upload failed ${response.status}: ${await response.text()}`,
    );
  }

  const upload = await response.json();
  return upload.sys.id;
}

async function ensureAsset(publicPath, locale) {
  const fileName = path.basename(publicPath);
  const assetId = slugify(fileName.replace(path.extname(fileName), ''));
  const assetPath = `/assets/${assetId}`;

  const existing = await getExisting(assetPath);
  if (existing) {
    console.log(`  Asset "${assetId}" already exists, reusing.`);
    return assetId;
  }

  const absolutePath = path.join(process.cwd(), 'public', publicPath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Image not found on disk: ${absolutePath}`);
  }

  console.log(`  Uploading ${fileName}...`);
  const uploadId = await uploadFile(absolutePath);
  const contentType =
    MIME_TYPES[path.extname(fileName).toLowerCase()] ||
    'application/octet-stream';

  const created = await request(assetPath, {
    method: 'PUT',
    body: JSON.stringify({
      fields: {
        title: { [locale]: fileName },
        file: {
          [locale]: {
            contentType,
            fileName,
            uploadFrom: {
              sys: { type: 'Link', linkType: 'Upload', id: uploadId },
            },
          },
        },
      },
    }),
  });

  return processAndPublishAsset(created, locale);
}

async function processAndPublishAsset(asset, locale) {
  const assetId = asset.sys.id;
  const assetPath = `/assets/${assetId}`;

  await request(`${assetPath}/files/${locale}/process`, {
    method: 'PUT',
    headers: { 'X-Contentful-Version': String(asset.sys.version) },
  });

  let processed = null;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    await sleep(1000);
    processed = await request(assetPath);
    if (processed.fields.file[locale].url) break;
    processed = null;
  }

  if (!processed) {
    throw new Error(`Asset "${assetId}" did not finish processing in time.`);
  }

  await publish(assetPath, processed.sys.version);
  console.log(`  Asset "${assetId}" created and published.`);
  return assetId;
}

async function ensureRemoteAsset({ assetId, title, imageUrl, locale }) {
  const assetPath = `/assets/${assetId}`;
  const existing = await getExisting(assetPath);

  if (existing) {
    if (existing.fields.file?.[locale]?.url) {
      if (existing.sys.publishedVersion !== existing.sys.version - 1) {
        await publish(assetPath, existing.sys.version);
      }
      return assetId;
    }
    return processAndPublishAsset(existing, locale);
  }

  const imageResponse = await fetch(imageUrl, {
    method: 'HEAD',
    signal: AbortSignal.timeout(30000),
  });
  if (!imageResponse.ok) {
    throw new Error(`Image request failed ${imageResponse.status}: ${imageUrl}`);
  }

  const contentType = imageResponse.headers.get('content-type')?.split(';')[0];
  if (!contentType?.startsWith('image/')) {
    throw new Error(`Expected an image at ${imageUrl}, received "${contentType}".`);
  }

  const fileName = path.basename(new URL(imageUrl).pathname);
  const created = await request(assetPath, {
    method: 'PUT',
    body: JSON.stringify({
      fields: {
        title: { [locale]: title },
        file: {
          [locale]: { contentType, fileName, upload: imageUrl },
        },
      },
    }),
  });

  return processAndPublishAsset(created, locale);
}

const assetLink = id => ({ sys: { type: 'Link', linkType: 'Asset', id } });

module.exports = {
  slugify,
  entryLink,
  assetLink,
  sleep,
  getDefaultLocale,
  getExisting,
  publish,
  upsertEntry,
  ensureAsset,
  ensureRemoteAsset,
};
