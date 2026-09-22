import HomePage from '@/components/HomePage/HomePage';
import {
  getEntryByField,
  getPageReferenceEntries,
} from '@/lib/contentful-server-utils';
import formatCarouselSlides from '@/components/HomePage/Carousel/format-carousel-slides';
import { CONTENTFUL_PAGE_IDS } from '@/utils/constants';

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.HOME,
  });

  const [carouselSlides] = await getPageReferenceEntries({ page });

  return <HomePage carouselSlides={formatCarouselSlides(carouselSlides)} />;
}
