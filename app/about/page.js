import About from '@/components/About/About';
import {
  getEntryByField,
  getPageReferenceEntries,
} from '@/lib/contentful-server-utils';
import { formatAbout } from '@/lib/contentful-format-utils';
import { CONTENTFUL_PAGE_IDS } from '@/utils/constants';
import { getStaffPicks } from '@/lib/staff-pick-server-utils';

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
  const { staffMembers, staffPicks } = await getStaffPicks(pageSections);
  const picksByMemberId = new Map(staffPicks.map(pick => [pick.id, pick]));
  const staffMembersWithPicks = staffMembers.map(member => ({
    ...member,
    wine: picksByMemberId.get(member.id) || null,
  }));

  return (
    <About
      about={formatAbout(about)}
      staffMembers={staffMembersWithPicks}
    />
  );
}
