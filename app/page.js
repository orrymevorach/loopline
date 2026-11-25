import HomePage from '@/components/HomePage/HomePage';
import {
  getEntryByField,
  getPageSections,
} from '@/lib/contentful-server-utils';
import {
  formatCarouselSlides,
  formatHours,
  formatFunFacts,
  formatEvent,
} from '@/lib/contentful-format-utils';
import { getStaffPicks } from '@/lib/staff-pick-server-utils';
import { CONTENTFUL_PAGE_IDS, ROUTES } from '@/utils/constants';
import { buildMetadata } from '@/utils/seo';

export const metadata = buildMetadata({
  absoluteTitle: 'Loopline | Bottle Shop & Wine Bar in Toronto',
  description:
    'Loopline is a neighbourhood bottle shop and wine bar at 643 Dupont Street in Toronto, pouring iconic and under-the-radar wines from small producers, with small plates, tastings and events.',
  path: ROUTES.HOME,
});

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.HOME,
  });

  const {
    carouselSlides,
    hoursOfOperations,
    events = [],
    funFacts: [funFacts] = [],
  } = await getPageSections({ page });

  const aboutPage = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.ABOUT,
  });
  const aboutSections = await getPageSections({ page: aboutPage });
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
