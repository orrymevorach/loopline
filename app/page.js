import HomePage from '@/components/HomePage/HomePage';
import {
  getEntryByField,
  getPageReferenceEntries,
} from '@/lib/contentful-server-utils';
import {
  formatCarouselSlides,
  formatHours,
  formatFunFacts,
} from '@/lib/contentful-format-utils';
import { CONTENTFUL_PAGE_IDS } from '@/utils/constants';

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.HOME,
  });

  const [carouselSlides, hoursOfOperations, funFacts] =
    await getPageReferenceEntries({
      page,
    });

  return (
    <HomePage
      carouselSlides={formatCarouselSlides(carouselSlides)}
      hoursOfOperations={formatHours(hoursOfOperations)}
      funFacts={formatFunFacts(funFacts)}
    />
  );
}
