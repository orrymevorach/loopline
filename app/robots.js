import { SITE_URL } from '@/utils/constants';
import { isContentfulPreview } from '@/lib/contentful-client';

export default function robots() {
  // Staging shows draft content, so keep it out of search results entirely.
  if (isContentfulPreview) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/contentful/', '/contentful-extensions/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
