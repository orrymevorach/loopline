import HomePage from '@/components/HomePage/HomePage';
import {
  getEntryByField,
  getPageReferenceEntries,
} from '@/lib/contentful-server-utils';
import {
  formatCarouselSlides,
  formatHours,
  formatFunFacts,
  formatEvent,
} from '@/lib/contentful-format-utils';
import { getStaffPicks } from '@/lib/staff-pick-server-utils';
import { CONTENTFUL_PAGE_IDS } from '@/utils/constants';

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.HOME,
  });

  const [carouselSlides, hoursOfOperations, events, funFacts] =
    await getPageReferenceEntries({
      page,
    });

  const aboutPage = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.ABOUT,
  });
  const aboutSections = await getPageReferenceEntries({ page: aboutPage });
  const { staffPicks } = await getStaffPicks(aboutSections);

  return (
    <HomePage
      carouselSlides={formatCarouselSlides(carouselSlides)}
      hoursOfOperations={formatHours(hoursOfOperations)}
      funFacts={formatFunFacts(funFacts)}
      staffPicks={staffPicks}
      nextEvent={formatEvent(events?.[0])}
    />
  );
}
