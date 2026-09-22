/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local' });

const {
  slugify,
  entryLink,
  assetLink,
  getDefaultLocale,
  upsertEntry,
  ensureAsset,
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
        [locale]: assetLink(assetId),
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
