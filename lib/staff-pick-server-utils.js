import { formatStaffMembers } from '@/lib/contentful-format-utils';
import { getProducts } from '@/lib/toast-server-utils';
import { formatStaffPicks } from '@/lib/staff-pick-utils';

export async function getStaffPicks(pageSections) {
  const staffEntries = pageSections.find(
    section =>
      Array.isArray(section) &&
      section.some(entry => entry?.sys?.contentType?.sys?.id === 'staffMember'),
  );
  const staffMembers = formatStaffMembers(staffEntries);
  const hasStaffPicks = staffMembers.some(member => member.staffPick);
  const products = hasStaffPicks ? await getProducts() : [];
  const staffPicks = formatStaffPicks(staffMembers, products);

  return { staffMembers, staffPicks };
}
