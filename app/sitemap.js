import { ROUTES, SITE_URL } from '@/utils/constants';

// Public, indexable pages. Add new routes here when they launch.
const PAGES = [
  { path: ROUTES.HOME, changeFrequency: 'weekly', priority: 1 },
  { path: ROUTES.WINE, changeFrequency: 'monthly', priority: 0.9 },
  { path: ROUTES.WINE_BAR, changeFrequency: 'weekly', priority: 0.9 },
  { path: ROUTES.EVENTS, changeFrequency: 'weekly', priority: 0.8 },
  { path: ROUTES.PRIVATE_EVENTS, changeFrequency: 'monthly', priority: 0.8 },
  { path: ROUTES.ABOUT, changeFrequency: 'monthly', priority: 0.7 },
  { path: ROUTES.CONTACT, changeFrequency: 'yearly', priority: 0.6 },
  { path: ROUTES.PRIVACY_POLICY, changeFrequency: 'yearly', priority: 0.2 },
  { path: ROUTES.TERMS_OF_USE, changeFrequency: 'yearly', priority: 0.2 },
];

export default function sitemap() {
  const lastModified = new Date();

  return PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
