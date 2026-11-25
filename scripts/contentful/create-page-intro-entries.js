/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local' });

const { request } = require('./setup');
const {
  entryLink,
  assetLink,
  getDefaultLocale,
  publish,
  upsertEntry,
  ensureAsset,
} = require('./entry-utils');

// Run `node scripts/contentful/create-content-model.js pageIntro` first.
// Mirrors the built-in copy and photos in components/WineBar/WineBar.jsx,
// components/Events/EventsHero/EventsHero.jsx and
// components/PrivateEvents/PrivateEvents.jsx, so the site looks the same
// until editors change it.
const intros = [
  {
    entryId: 'wine-bar-intro',
    pageTitle: 'Wine Bar Page',
    title: 'Wine Bar Intro',
    heading: 'Wine Bar',
    paragraphs: [
      'Wine. Small plates. Good company.',
      'Explore what we’re pouring and what’s coming out of the kitchen.',
      '*All menu items are subject to change.',
    ],
    image: '/wine-bar-hero.jpg',
    imageAlt: 'Wine bottles on the shelves at the Loopline wine bar in Toronto',
  },
  {
    entryId: 'events-intro',
    pageTitle: 'Our Events Page',
    title: 'Events Intro',
    heading: 'Events',
    paragraphs: [
      'At Loopline, our events are an extension of the table. From educational tastings and winemaker takeovers to themed dinners, thoughtful collaborations, and community nights, each gathering is designed to bring people together over something worth sharing.',
    ],
    image: '/events-hero.jpg',
    imageAlt: 'Guests chatting over drinks at Loopline',
  },
  {
    entryId: 'private-events-intro',
    pageTitle: 'Private Events Page',
    title: 'Private Events Intro',
    heading: 'Private Events',
    paragraphs: [
      'Bring your people together at Loopline. Get in touch to discuss a private gathering over wine, food, and good company.',
    ],
    image: '/private-events-hero.jpg',
    imageAlt: 'Wine being poured for guests around a dining table',
  },
];

const richTextDocument = texts => ({
  nodeType: 'document',
  data: {},
  content: texts.map(text => ({
    nodeType: 'paragraph',
    data: {},
    content: [{ nodeType: 'text', value: text, marks: [], data: {} }],
  })),
});

// Puts the intro first in the page's sections. Publishes the page only when it
// had no unpublished edits, so nobody's draft changes go live by accident.
async function linkIntroToPage(intro, locale) {
  const { items } = await request(
    `/entries?content_type=page&fields.title=${encodeURIComponent(intro.pageTitle)}`,
  );
  const page = items[0];
  if (!page) {
    console.log(`  Page "${intro.pageTitle}" not found; link it by hand.`);
    return;
  }

  const content = page.fields.content?.[locale] || [];
  if (content.some(link => link.sys.id === intro.entryId)) {
    console.log(`  "${intro.pageTitle}" already links "${intro.entryId}".`);
    return;
  }

  const wasCleanlyPublished =
    page.sys.publishedVersion && page.sys.version === page.sys.publishedVersion + 1;

  const updated = await request(`/entries/${page.sys.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      fields: {
        ...page.fields,
        content: { [locale]: [entryLink(intro.entryId), ...content] },
      },
    }),
    headers: { 'X-Contentful-Version': String(page.sys.version) },
  });

  if (wasCleanlyPublished) {
    await publish(`/entries/${page.sys.id}`, updated.sys.version);
    console.log(`  Linked to "${intro.pageTitle}" and published it.`);
  } else {
    console.log(
      `  Linked to "${intro.pageTitle}", but left it unpublished because it has other unpublished edits.`,
    );
  }
}

async function run() {
  const locale = await getDefaultLocale();
  console.log(`Using default locale "${locale}".\n`);

  for (const intro of intros) {
    console.log(`${intro.title}:`);
    const assetId = await ensureAsset(intro.image, locale);

    await upsertEntry(intro.entryId, 'pageIntro', {
      title: { [locale]: intro.title },
      heading: { [locale]: intro.heading },
      description: { [locale]: richTextDocument(intro.paragraphs) },
      image: { [locale]: assetLink(assetId) },
      imageAlt: { [locale]: intro.imageAlt },
    });
    console.log(`  Entry "${intro.entryId}" published.`);

    await linkIntroToPage(intro, locale);
  }
}

run().catch(error => {
  console.error('Failed to create page intro entries:', error.message || error);
  process.exit(1);
});
