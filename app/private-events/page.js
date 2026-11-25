import PrivateEvents from '@/components/PrivateEvents/PrivateEvents';
import {
  getEntryByField,
  getPageSections,
} from '@/lib/contentful-server-utils';
import { formatCarouselSlides } from '@/lib/contentful-format-utils';
import { CONTENTFUL_PAGE_IDS, ROUTES } from '@/utils/constants';
import { buildMetadata } from '@/utils/seo';

export const metadata = buildMetadata({
  title: 'Private Events & Group Bookings in Toronto',
  description:
    'Host a private event at Loopline in Toronto. Gather your people over wine, food and good company at our Dupont Street wine bar. Get in touch to book.',
  path: ROUTES.PRIVATE_EVENTS,
});

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.PRIVATE_EVENTS,
  });
  const { carouselSlides } = await getPageSections({ page });

  return <PrivateEvents carouselSlides={formatCarouselSlides(carouselSlides)} />;
}
