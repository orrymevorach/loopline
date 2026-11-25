import ContactPage from '@/components/ContactPage/ContactPage';
import {
  getEntryByField,
  getPageSections,
} from '@/lib/contentful-server-utils';
import { formatHours } from '@/lib/contentful-format-utils';
import { buildMetadata } from '@/utils/seo';
import { CONTENTFUL_PAGE_IDS, ROUTES } from '@/utils/constants';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Loopline at 643 Dupont Street, Toronto. Call (416) 516-8059 or send us a message about wine, reservations or events.',
  path: ROUTES.CONTACT,
});

export default async function Page() {
  // Hours and location are managed once, on the Home Page entry in Contentful.
  const homePage = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.HOME,
  });
  const { hoursOfOperations } = await getPageSections({ page: homePage });

  return <ContactPage hoursOfOperations={formatHours(hoursOfOperations)} />;
}
