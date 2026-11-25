import { formatStaffMembers } from '@/lib/contentful-format-utils';
import { getProducts } from '@/lib/toast-server-utils';
import { formatStaffPicks } from '@/lib/staff-pick-utils';
import { isContentfulPreview } from '@/lib/contentful-client';

// Staging renders per request, so a Toast hiccup there should hide staff picks
// rather than error the page. Production still fails the build, which keeps
// the last good deploy live.
async function getProductsOrEmpty() {
  try {
    return await getProducts();
  } catch (error) {
    if (!isContentfulPreview) throw error;
    console.error('Could not load Toast products for staff picks:', error.message);
    return [];
  }
}

export async function getStaffPicks({ staffEntries = [] }) {
  const staffMembers = formatStaffMembers(staffEntries);
  const hasStaffPicks = staffMembers.some(member => member.staffPick);
  const products = hasStaffPicks ? await getProductsOrEmpty() : [];
  const staffPicks = formatStaffPicks(staffMembers, products);

  return { staffMembers, staffPicks };
}
