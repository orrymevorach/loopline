import Events from '@/components/Events/Events';
import {
  getEntryByField,
  getPageReferenceEntries,
} from '@/lib/contentful-server-utils';
import {
  formatCalendarImage,
  formatCarouselSlides,
  formatEvent,
} from '@/lib/contentful-format-utils';
import { CONTENTFUL_PAGE_IDS } from '@/utils/constants';

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.EVENTS,
  });
  const [carouselSlides, calendarImage, events] = await getPageReferenceEntries({
    page,
  });
  const formattedEvents = (events || []).map(formatEvent).filter(Boolean);

  return (
    <Events
      carouselSlides={formatCarouselSlides(carouselSlides)}
      calendarImage={formatCalendarImage(calendarImage)}
      events={formattedEvents}
    />
  );
}
