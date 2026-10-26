/* eslint-disable no-console */
const { createHash } = require('node:crypto');
const { chromium } = require('playwright');
const { request } = require('./setup');
const {
  assetLink,
  entryLink,
  ensureRemoteAsset,
  getDefaultLocale,
  publish,
} = require('./entry-utils');

const EXPERIENCES_URL =
  'https://toast.app/r/loopline-bottle-shop-wine-bar-643-dupont-street/experiences';
const GALLERY_ID = '2O3rN8dERX7lJLyMJ6bulZ';
const EVENT_TYPE_ID = 'event';

function eventKey(name, date) {
  return JSON.stringify(
    [name, date].map(value =>
      value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase(),
    ),
  );
}

function eventId(url) {
  const hash = createHash('sha256').update(url).digest('hex').slice(0, 40);
  return `toast-event-${hash}`;
}

function richTextDocument(description) {
  return {
    nodeType: 'document',
    data: {},
    content: description.split(/\n\s*\n/).map(paragraph => ({
      nodeType: 'paragraph',
      data: {},
      content: [
        { nodeType: 'text', value: paragraph.trim(), marks: [], data: {} },
      ],
    })),
  };
}

async function scrapeEvents({ isHeadless, isServerless }) {
  const launchOptions = { headless: isHeadless };
  if (isServerless) {
    const { default: serverlessChromium } = await import('@sparticuz/chromium');
    launchOptions.headless = true;
    launchOptions.args = serverlessChromium.args;
    launchOptions.executablePath = await serverlessChromium.executablePath();
  }
  const browser = await chromium.launch(launchOptions);

  try {
    const browserVersion = browser.version();
    const page = await browser.newPage({
      // Toast rejects Chromium's default HeadlessChrome user-agent with HTTP 403.
      userAgent: `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${browserVersion} Safari/537.36`,
      locale: 'en-CA',
      timezoneId: 'America/Toronto',
    });
    const response = await page.goto(EXPERIENCES_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    if (!response?.ok()) {
      const responseHeaders = response ? await response.allHeaders() : {};
      console.error('Toast navigation rejected:', {
        status: response?.status(),
        isServerless,
        browserVersion,
        pageTitle: await page.title(),
        server: responseHeaders.server,
        requestId: responseHeaders['cf-ray'] || responseHeaders['x-request-id'],
        challenge: responseHeaders['cf-mitigated'],
      });
      throw new Error(
        `Toast page request failed: HTTP ${response?.status()}.${response?.status() === 403 ? ' Toast denied this request; inspect the navigation diagnostics. No Contentful writes were performed.' : ''}`,
      );
    }

    // Toast initially renders placeholder cards; wait for complete event content.
    await page.waitForFunction(() => {
      const cards = Array.from(
        document.querySelectorAll('main [data-event-card-version]'),
      );
      return (
        cards.length > 0 &&
        cards.every(card =>
          card.querySelector('a[href*="/experiences/"]')?.textContent.trim() &&
          card.querySelector('[data-testid="event-card-date"]')?.textContent.trim() &&
          card.querySelector('[data-testid="event-card-image"]'),
        )
      );
    }, null, { timeout: 30000 });

    const events = await page.locator('main [data-event-card-version]').evaluateAll(
      cards =>
        cards.map(card => {
          const link = card.querySelector('a[href*="/experiences/"]');
          const date = card.querySelector('[data-testid="event-card-date"]');
          const description = Array.from(card.querySelectorAll('p')).find(
            paragraph => paragraph !== date,
          );
          const image = card.querySelector('[data-testid="event-card-image"]');
          const backgroundImage = image?.style.getPropertyValue(
            '--event-card-background-image',
          );
          const imageUrl = backgroundImage?.match(
            /^url\(["']?(.*?)["']?\)$/,
          )?.[1];

          return {
            name: link?.textContent.trim(),
            url: link?.href,
            date: date?.textContent.trim(),
            description: description?.textContent.trim(),
            imageUrl,
          };
        }),
    );

    const uniqueEvents = new Map();
    for (const event of events) {
      for (const field of ['name', 'url', 'date', 'description', 'imageUrl']) {
        if (!event[field]) {
          throw new Error(
            `Toast event "${event.name || 'unknown'}" is missing ${field}; import stopped.`,
          );
        }
      }

      const url = new URL(event.url);
      url.search = '';
      url.hash = '';
      if (url.origin !== new URL(EXPERIENCES_URL).origin) {
        throw new Error(`Unexpected Toast event URL: ${url.href}`);
      }
      const imageUrl = new URL(event.imageUrl);
      if (imageUrl.protocol !== 'https:' || imageUrl.hostname !== 'cdn.toasttab.com') {
        throw new Error(`Unexpected Toast image URL: ${imageUrl.href}`);
      }
      event.url = url.href;
      uniqueEvents.set(event.url, event);
    }

    return [...uniqueEvents.values()];
  } finally {
    await browser.close();
  }
}

async function getExistingEvents() {
  const entries = [];
  let skip = 0;
  let total;

  do {
    const result = await request(
      `/entries?content_type=${EVENT_TYPE_ID}&limit=100&skip=${skip}&order=sys.createdAt`,
    );
    entries.push(...result.items);
    skip += result.items.length;
    total = result.total;
    if (result.items.length === 0 && skip < total) {
      throw new Error('Contentful returned an incomplete page of Event entries.');
    }
  } while (skip < total);

  return entries;
}

function canPublishGallery(gallery) {
  return Boolean(
    gallery.sys.publishedVersion &&
      gallery.sys.version === gallery.sys.publishedVersion + 1,
  );
}

function validateGallery(gallery) {
  if (gallery.sys.contentType.sys.id !== 'galleryEvents') {
    throw new Error(`Entry "${GALLERY_ID}" is not a Gallery: Events entry.`);
  }
  if (!canPublishGallery(gallery)) {
    throw new Error(
      `Gallery "${GALLERY_ID}" is unpublished or has pending edits. Publish or discard those edits before importing events.`,
    );
  }
}

async function addToGallery(eventIds, locale, { isDryRun = false } = {}) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const gallery = await request(`/entries/${GALLERY_ID}`);
    validateGallery(gallery);
    const links = gallery.fields.events?.[locale] || [];
    const linkedIds = new Set(links.map(link => link.sys.id));
    const missingIds = [...new Set(eventIds)].filter(id => !linkedIds.has(id));

    if (missingIds.length === 0) {
      console.log('Gallery already contains all imported events; no changes.');
      return;
    }
    if (isDryRun) {
      console.log(`Would append ${missingIds.length} event reference(s) to the gallery.`);
      return;
    }

    let updated;
    try {
      updated = await request(`/entries/${GALLERY_ID}`, {
        method: 'PUT',
        headers: { 'X-Contentful-Version': String(gallery.sys.version) },
        body: JSON.stringify({
          fields: {
            ...gallery.fields,
            events: {
              ...gallery.fields.events,
              [locale]: [...links, ...missingIds.map(entryLink)],
            },
          },
        }),
      });
    } catch (error) {
      if (error.status !== 409 || attempt === 4) throw error;
      console.warn(
        `Gallery changed during import; reloading before appending references (retry ${attempt + 1}/4).`,
      );
      continue;
    }

    // Only publish our exact update; a newer editor change must remain unpublished.
    try {
      await publish(`/entries/${GALLERY_ID}`, updated.sys.version);
    } catch (error) {
      throw new Error(
        `Gallery "${GALLERY_ID}" was updated but publication failed. Inspect and publish or discard its draft before retrying. ${error.message}`,
        { cause: error },
      );
    }
    console.log(`Published gallery with ${missingIds.length} additional event(s).`);
    return;
  }
}

async function syncToastEvents({
  isDryRun = false,
  isHeadless = true,
  isServerless = false,
} = {}) {
  const locale = await getDefaultLocale();
  const eventType = await request(`/content_types/${EVENT_TYPE_ID}`);
  const expectedFieldTypes = {
    eventName: 'Symbol',
    description: 'RichText',
    date: 'Symbol',
    image: 'Link',
  };
  for (const [fieldId, expectedType] of Object.entries(expectedFieldTypes)) {
    const field = eventType.fields.find(candidate => candidate.id === fieldId);
    if (
      field?.type !== expectedType ||
      field.disabled ||
      field.omitted ||
      (fieldId === 'image' && field.linkType !== 'Asset')
    ) {
      throw new Error(
        `Event field "${fieldId}" must be an enabled ${expectedType}${fieldId === 'image' ? ' to an Asset' : ''} field. Update and publish the Contentful model before importing.`,
      );
    }
  }
  const gallery = await request(`/entries/${GALLERY_ID}`);
  validateGallery(gallery);

  const events = await scrapeEvents({ isHeadless, isServerless });
  const existingEvents = await getExistingEvents();
  const entriesById = new Map(existingEvents.map(entry => [entry.sys.id, entry]));
  const entriesByKey = new Map();
  for (const entry of existingEvents) {
    const name = entry.fields.eventName?.[locale];
    const date = entry.fields.date?.[locale];
    if (typeof name === 'string' && typeof date === 'string') {
      entriesByKey.set(eventKey(name, date), entry);
    }
  }

  console.log(`Found ${events.length} Toast event(s).${isDryRun ? ' Dry run: no writes.' : ''}`);
  const galleryEventIds = [];
  let createdCount = 0;
  let skippedCount = 0;

  for (const event of events) {
    const id = eventId(event.url);
    const key = eventKey(event.name, event.date);
    const existing = entriesById.get(id) || entriesByKey.get(key);

    // Keep existing event copy and publication state; repair gallery links on retries.
    if (existing) {
      console.log(`Skipping existing event "${event.name}" (${existing.sys.id}).`);
      if (!existing.sys.publishedVersion) {
        console.warn(`Event "${existing.sys.id}" is unpublished; it will not be linked to the published gallery.`);
      } else {
        galleryEventIds.push(existing.sys.id);
      }
      skippedCount += 1;
      continue;
    }

    console.log(`${isDryRun ? 'Would create' : 'Creating'} "${event.name}" (${event.date}).`);
    if (isDryRun) {
      createdCount += 1;
      galleryEventIds.push(id);
      continue;
    }

    const assetId = await ensureRemoteAsset({
      assetId: `${id}-image`,
      title: event.name,
      imageUrl: event.imageUrl,
      locale,
    });
    const entry = await request(`/entries/${id}`, {
      method: 'PUT',
      headers: { 'X-Contentful-Content-Type': EVENT_TYPE_ID },
      body: JSON.stringify({
        fields: {
          eventName: { [locale]: event.name },
          description: { [locale]: richTextDocument(event.description) },
          date: { [locale]: event.date },
          image: { [locale]: assetLink(assetId) },
        },
      }),
    });
    await publish(`/entries/${id}`, entry.sys.version);
    entriesById.set(id, entry);
    entriesByKey.set(key, entry);
    galleryEventIds.push(id);
    createdCount += 1;
  }

  await addToGallery(galleryEventIds, locale, { isDryRun });
  console.log(
    `Done: ${createdCount} ${isDryRun ? 'would be created' : 'created'}, ${skippedCount} skipped.`,
  );
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const unknownArgs = args.filter(
    arg => !['--dry-run', '--headless', '--headed'].includes(arg),
  );
  if (unknownArgs.length || (args.includes('--headless') && args.includes('--headed'))) {
    console.error('Usage: npm run sync:events -- [--dry-run] [--headed | --headless]');
    process.exitCode = 1;
  } else {
    syncToastEvents({
      isDryRun: args.includes('--dry-run'),
      isHeadless: !args.includes('--headed'),
    }).catch(error => {
      console.error('Failed to sync Toast events:', error.message || error);
      process.exitCode = 1;
    });
  }
}

module.exports = { syncToastEvents };
