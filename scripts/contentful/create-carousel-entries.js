/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

const { request, SPACE_ID, MANAGEMENT_TOKEN } = require('./setup');
const {
  slugify,
  entryLink,
  sleep,
  getDefaultLocale,
  getExisting,
  publish,
  upsertEntry,
} = require('./entry-utils');

const CAROUSEL_ID = 'home-carousel';
const CAROUSEL_TITLE = 'Home Carousel';

// Mirrors the hardcoded `slides` array in components/HomePage/Carousel/Carousel.jsx
const slides = [
  {
    image: '/loopline-wine-hero.jpg',
    title: 'Toronto’s neighbourhood\nbottle shop and wine bar.',
    actions: [
      { label: 'Shop Wine', href: '/offerings', isPurple: true },
      { label: 'Reserve a Table', href: '/contact', isCream: true },
    ],
  },
  {
    image: '/carousel/wine-club.jpg',
    title: 'A global lineup of iconic\nand under-the-radar wines.',
    actions: [
      { label: 'Shop Wine', href: '/offerings', isPurple: true },
      { label: 'Join the Wine Club', href: '/wine-club', isCream: true },
    ],
  },
  {
    image: '/carousel/snacks.jpg',
    title: 'Great wine, great snacks,\ngood company.',
    actions: [
      { label: 'Reserve a Table', href: '/contact', isPurple: true },
      { label: 'Food Menu', href: '/menu', isCream: true },
    ],
  },
  {
    image: '/carousel/apero-hour.jpg',
    title: 'Apero Hour with\nGrégoire Doulain',
    actions: [
      { label: 'Buy Tickets', href: '/events', isPurple: true },
      { label: 'See All Events', href: '/events', isCream: true },
    ],
  },
];

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

const colourFor = action => {
  if (action.isPurple) return 'Purple';
  if (action.isCream) return 'Cream';
  return '';
};

// Newlines are preserved as-is; the rich text renderer converts them to <br />.
const headingDocument = text => ({
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'heading-1',
      data: {},
      content: [{ nodeType: 'text', value: text, marks: [], data: {} }],
    },
  ],
});

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

  await request(`${assetPath}/files/${locale}/process`, {
    method: 'PUT',
    headers: { 'X-Contentful-Version': String(created.sys.version) },
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

async function run() {
  const locale = await getDefaultLocale();
  console.log(`Using default locale "${locale}".\n`);

  const slideIds = [];

  for (const [index, slide] of slides.entries()) {
    const slideNumber = index + 1;
    const slideId = `carousel-slide-${slideNumber}`;
    console.log(`Slide ${slideNumber}: ${slide.title.replace(/\n/g, ' ')}`);

    const assetId = await ensureAsset(slide.image, locale);

    const buttonIds = [];
    for (const action of slide.actions) {
      const buttonId = `${slideId}-${slugify(action.label)}`;
      await upsertEntry(buttonId, 'button', {
        title: { [locale]: `Slide ${slideNumber} – ${action.label}` },
        text: { [locale]: action.label },
        href: { [locale]: action.href },
        colour: { [locale]: colourFor(action) },
      });
      console.log(`  Button "${buttonId}" published.`);
      buttonIds.push(buttonId);
    }

    await upsertEntry(slideId, 'carouselSlide', {
      title: { [locale]: slide.title },
      heading: { [locale]: headingDocument(slide.title) },
      image: {
        [locale]: { sys: { type: 'Link', linkType: 'Asset', id: assetId } },
      },
      buttons: { [locale]: buttonIds.map(entryLink) },
    });
    console.log(`  Slide "${slideId}" published.\n`);
    slideIds.push(slideId);
  }

  await upsertEntry(CAROUSEL_ID, 'carousel', {
    title: { [locale]: CAROUSEL_TITLE },
    slides: { [locale]: slideIds.map(entryLink) },
  });

  console.log(
    `Carousel "${CAROUSEL_ID}" published with ${slideIds.length} slides.`,
  );
}

run().catch(error => {
  console.error('Failed to create carousel entries:', error.message || error);
  process.exit(1);
});
