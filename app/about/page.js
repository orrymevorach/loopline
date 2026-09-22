import About from '@/components/About/About';
import {
  getEntryByField,
  getPageReferenceEntries,
} from '@/lib/contentful-server-utils';
import { formatAbout } from '@/lib/contentful-format-utils';
import { CONTENTFUL_PAGE_IDS } from '@/utils/constants';

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.ABOUT,
  });

  const [about] = await getPageReferenceEntries({ page });

  return <About about={formatAbout(about)} />;
}
