import { NextResponse } from 'next/server';
import { getMenuItems } from 'lib/toast-server-utils';

// menuGroups can nest arbitrarily, so collect menuItems recursively.
function getItemsFromGroup(group) {
  const nestedItems = group.menuGroups?.flatMap(getItemsFromGroup) ?? [];
  return [...(group.menuItems ?? []), ...nestedItems];
}

export async function GET() {
  try {
    const { menus } = await getMenuItems();

    const items = menus.flatMap(menu =>
      menu.menuGroups.flatMap(getItemsFromGroup),
    );

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching Toast menu items:', error);
    return NextResponse.json({ items: null }, { status: 500 });
  }
}
