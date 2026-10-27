import Events from '@/components/Events/Events';
import {
  getEntryByField,
  getPageReferenceEntries,
} from '@/lib/contentful-server-utils';
import {
  formatCalendarImage,
  formatEvent,
} from '@/lib/contentful-format-utils';
import { CONTENTFUL_PAGE_IDS } from '@/utils/constants';

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.EVENTS,
  });
  const [calendarImage, events] = await getPageReferenceEntries({
    page,
  });
  const formattedEvents = (events || []).map(formatEvent).filter(Boolean);

  return (
    <Events
      calendarImage={formatCalendarImage(calendarImage)}
      events={formattedEvents}
    />
  );
}
