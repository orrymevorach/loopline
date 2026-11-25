import WineBar from '@/components/WineBar/WineBar';
import {
  getEntryByField,
  getPageSections,
} from '@/lib/contentful-server-utils';
import { formatMenus } from '@/lib/contentful-format-utils';
import { CONTENTFUL_PAGE_IDS, ROUTES } from '@/utils/constants';
import { buildMetadata } from '@/utils/seo';

export const metadata = buildMetadata({
  title: 'Wine Bar & Small Plates on Dupont Street',
  description:
    'A Toronto wine bar on Dupont Street pouring wines by the glass and bottle alongside small plates. See our food, wine and featured menus and reserve a table.',
  path: ROUTES.WINE_BAR,
});

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.WINE_BAR,
  });
  const { menus } = await getPageSections({ page });

  return <WineBar menus={formatMenus(menus)} />;
}
