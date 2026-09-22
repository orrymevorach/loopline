/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local' });

const {
  assetLink,
  getDefaultLocale,
  upsertEntry,
  ensureAsset,
} = require('./entry-utils');

const ABOUT_ENTRY_ID = 'about-page-content';
const ABOUT_TITLE = 'About Page Content';
const ABOUT_IMAGE = '/about-hero.png';

// Mirrors the hardcoded copy in components/About/AboutHero/AboutHero.jsx
const paragraphs = [
  'Loop Line Wine & Food is a haven for fine wine lovers. A store by day and engaging wine bar at night, we are a fun and immersive place to taste, savour and purchase a collection of wines from some of the most revered and undiscovered vineyards around the globe. With a debut list of over 150 selections & focusing on sustainable, estate-grown, and classic but trending styles, we intend to become a community hub for wine enthusiasts and wine colleagues.',
  'Like many wines, our namesake was born out of a salute to community, place and time. Cornered on Loop Line Lane, the history of the Church St. streetcar which ran east via Dupont, Avenue Road and Bloor to Church, then south to loop via Front, Yonge and Wellington, is commemorated. The Christie Loop continued until 1963 when the University subway opened.',
  'Its contemporary but cozy feel is created by the inherent warmth of floor to ceiling wine bottles housed in Bene Boxes. The space is rounded out with a show-stopping bar and pieces from the collections of artists Alex McLeod & Graham Girard.',
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

async function run() {
  const locale = await getDefaultLocale();
  console.log(`Using default locale "${locale}".\n`);

  const assetId = await ensureAsset(ABOUT_IMAGE, locale);

  await upsertEntry(ABOUT_ENTRY_ID, 'about', {
    title: { [locale]: ABOUT_TITLE },
    description: { [locale]: richTextDocument(paragraphs) },
    image: { [locale]: assetLink(assetId) },
  });

  console.log(`\nAbout entry "${ABOUT_ENTRY_ID}" published.`);
}

run().catch(error => {
  console.error('Failed to create about entry:', error.message || error);
  process.exit(1);
});
