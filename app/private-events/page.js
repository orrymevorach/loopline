import PrivateEvents from '@/components/PrivateEvents/PrivateEvents';
import {
  getEntryByField,
  getPageReferenceEntries,
} from '@/lib/contentful-server-utils';
import { formatCarouselSlides } from '@/lib/contentful-format-utils';
import { CONTENTFUL_PAGE_IDS } from '@/utils/constants';

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.PRIVATE_EVENTS,
  });
  const [carouselSlides] = await getPageReferenceEntries({ page });

  return <PrivateEvents carouselSlides={formatCarouselSlides(carouselSlides)} />;
}
