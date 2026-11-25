export const ROUTES = {
  HOME: '/',
  PAGE_NOT_FOUND: '/404',
  CONTACT: '/contact',
  BOOK_A_PRIVATE_EVENT: '/private-events#book-a-private-event',
  ABOUT: '/about',
  WINE_BAR: '/wine-bar',
  EVENTS: '/events',
  PRIVATE_EVENTS: '/private-events',
  WINE: '/wine',
  OFFERINGS: '/offerings',
  PROVIDERS: '/providers',
  LIBRARY: '/library',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_USE: '/terms-of-use',
  TESTIMONIALS: '/testimonials',
};

// Production origin used for canonical URLs, the sitemap and social previews.
// Override with SITE_URL (e.g. for a staging domain).
export const SITE_URL = (
  process.env.SITE_URL || 'https://looplinewine.com'
).replace(/\/$/, '');

export const RESERVATION_URL =
  'https://tables.toasttab.com/restaurants/2ac9f5bf-df0b-40df-92ad-dcfcb05f5ece/reserve?partySize=2';

export const INSTAGRAM_URL = 'https://www.instagram.com/looplinewine';

export const UBER_EATS_URL =
  'https://www.ubereats.com/ca/store/loopline-%7C-bottle-shop-%26-wine-bar/NPAuFxhLVQCRu2rYT3kNng?diningMode=DELIVERY';

// Business details for search engines (structured data). Keep the hours in
// sync with the Hours of Operation entries in Contentful.
export const BUSINESS = {
  name: 'Loopline',
  legalName: 'Loopline Bottle Shop & Wine Bar',
  phone: '+1-416-516-8059',
  address: {
    streetAddress: '643 Dupont Street',
    addressLocality: 'Toronto',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
  bottleShopHours: {
    days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '11:00',
    closes: '22:00',
  },
  wineBarHours: {
    days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '16:00',
    closes: '22:00',
  },
};

// External storefront — all shop links on the site direct here.
export const SHOP_URL = 'https://shop.looplinewine.com';

export const CONTENTFUL_PAGE_IDS = {
  HOME: 'Home Page',
  ABOUT: 'About Page',
  WINE_BAR: 'Wine Bar Page',
  OFFERINGS: 'Offerings Page',
  CONTACT: 'Contact Page',
  EVENTS: 'Our Events Page',
  PRIVATE_EVENTS: 'Private Events Page',
};
