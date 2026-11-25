import Events from '@/components/Events/Events';
import JsonLd from '@/components/shared/JsonLd/JsonLd';
import {
  getEntryByField,
  getPageSections,
} from '@/lib/contentful-server-utils';
import {
  formatCalendarImage,
  formatEvent,
  formatPageIntro,
} from '@/lib/contentful-format-utils';
import { CONTENTFUL_PAGE_IDS, ROUTES } from '@/utils/constants';
import { buildMetadata, getEventsJsonLd } from '@/utils/seo';

export const metadata = buildMetadata({
  title: 'Wine Tastings & Events in Toronto',
  description:
    'Wine tastings, winemaker takeovers, themed dinners and community nights at Loopline, a bottle shop and wine bar on Dupont Street in Toronto.',
  path: ROUTES.EVENTS,
});

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.EVENTS,
  });
  const {
    calendarImage: [calendarImage] = [],
    events = [],
    pageIntro: [intro] = [],
  } = await getPageSections({ page });
  const formattedEvents = events.map(formatEvent).filter(Boolean);

  return (
    <>
      <JsonLd data={getEventsJsonLd(formattedEvents)} />
      <Events
        intro={formatPageIntro(intro)}
        calendarImage={formatCalendarImage(calendarImage)}
        events={formattedEvents}
      />
    </>
  );
}
