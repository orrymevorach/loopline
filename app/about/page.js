import About from '@/components/About/About';
import {
  getEntryByField,
  getPageSections,
} from '@/lib/contentful-server-utils';
import { formatAbout } from '@/lib/contentful-format-utils';
import { CONTENTFUL_PAGE_IDS, ROUTES } from '@/utils/constants';
import { getStaffPicks } from '@/lib/staff-pick-server-utils';
import { buildMetadata } from '@/utils/seo';

export const metadata = buildMetadata({
  title: 'About Us & Our Team',
  description:
    'Meet the team behind Loopline, a Toronto bottle shop and wine bar named for the old Church Street streetcar loop, and see the wines they are reaching for.',
  path: ROUTES.ABOUT,
});

export default async function Page() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.ABOUT,
  });

  const pageSections = await getPageSections({ page });
  const { about: [about] = [] } = pageSections;
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
