import WineBar from '@/components/WineBar/WineBar';
import {
  getEntryByField,
  getPageReferenceEntries,
} from '@/lib/contentful-server-utils';
import { formatMenus } from '@/lib/contentful-format-utils';
import { CONTENTFUL_PAGE_IDS } from '@/utils/constants';

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.WINE_BAR,
  });
  const [menus] = await getPageReferenceEntries({ page });

  return <WineBar menus={formatMenus(menus)} />;
}
