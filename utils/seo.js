import { BUSINESS, INSTAGRAM_URL, SITE_URL } from '@/utils/constants';

// Per-page metadata: title, description, canonical URL and social previews.
const SHARE_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Wine bottles on the shelves at Loopline, a bottle shop and wine bar in Toronto',
};

export const DEFAULT_SOCIAL = {
  openGraph: {
    siteName: 'Loopline',
    locale: 'en_CA',
    type: 'website',
    images: [SHARE_IMAGE],
  },
  twitter: { card: 'summary_large_image', images: [SHARE_IMAGE.url] },
};

// Page metadata is merged shallowly, so each page re-declares the share image.
export function buildMetadata({ title, description, path, absoluteTitle }) {
  const pageTitle = absoluteTitle ? { absolute: absoluteTitle } : title;
  const socialTitle = absoluteTitle || `${title} | Loopline`;

  return {
    title: pageTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...DEFAULT_SOCIAL.openGraph,
      title: socialTitle,
      description,
      url: path,
    },
    twitter: {
      ...DEFAULT_SOCIAL.twitter,
      title: socialTitle,
      description,
    },
  };
}

const toOpeningHours = ({ days, opens, closes }) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: days,
  opens,
  closes,
});

const address = { '@type': 'PostalAddress', ...BUSINESS.address };

// Structured data describing the physical business, used by Google for the
// business panel, Maps and local search results.
export function getBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LiquorStore', 'BarOrPub'],
        '@id': `${SITE_URL}/#business`,
        name: BUSINESS.name,
        alternateName: BUSINESS.legalName,
        url: SITE_URL,
        image: `${SITE_URL}/og-image.jpg`,
        logo: `${SITE_URL}/logo.png`,
        telephone: BUSINESS.phone,
        address,
        servesCuisine: ['Wine', 'Small plates'],
        priceRange: '$$',
        acceptsReservations: true,
        sameAs: [INSTAGRAM_URL],
        // The doors open with the bottle shop; the bar's hours are below.
        openingHoursSpecification: [toOpeningHours(BUSINESS.bottleShopHours)],
        department: [
          {
            '@type': 'LiquorStore',
            name: `${BUSINESS.name} Bottle Shop`,
            telephone: BUSINESS.phone,
            address,
            openingHoursSpecification: [
              toOpeningHours(BUSINESS.bottleShopHours),
            ],
          },
          {
            '@type': 'BarOrPub',
            name: `${BUSINESS.name} Wine Bar`,
            telephone: BUSINESS.phone,
            address,
            openingHoursSpecification: [toOpeningHours(BUSINESS.wineBarHours)],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: BUSINESS.name,
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#business` },
      },
    ],
  };
}

// Escapes `<` so CMS content can't break out of the JSON-LD script tag.
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
