import About from '@/components/About/About';
import {
  getEntryByField,
  getPageReferenceEntries,
} from '@/lib/contentful-server-utils';
import {
  formatAbout,
  formatStaffMembers,
} from '@/lib/contentful-format-utils';
import { CONTENTFUL_PAGE_IDS } from '@/utils/constants';

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.ABOUT,
  });

  const pageSections = await getPageReferenceEntries({ page });
  const about = pageSections.find(
    section =>
      section &&
      !Array.isArray(section) &&
      ('description' in section || 'image' in section),
  );
  const staffMembers = pageSections.find(Array.isArray) || [];

  return (
    <About
      about={formatAbout(about)}
      staffMembers={formatStaffMembers(staffMembers)}
    />
  );
}
