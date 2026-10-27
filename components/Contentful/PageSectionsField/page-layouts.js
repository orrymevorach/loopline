// Keep this directory aligned with the fixed React templates, not reference order.
// Shared navigation/footer and components disabled in the templates are omitted.
export const pageLayouts = {
  'Home Page': [
    { contentTypeId: 'carousel' },
    { contentTypeId: 'hoursOfOperation' },
    { name: 'Company introduction' },
    { contentTypeId: 'galleryEvents' },
    { name: 'Staff picks', description: 'Content comes from staff members on the About Page.' },
    { contentTypeId: 'funFacts' },
    { name: 'Instagram' },
  ],
  'About Page': [
    { contentTypeId: 'about' },
    { contentTypeId: 'galleryStaffMembers' },
    { name: 'Contact form' },
    { name: 'About banner image' },
  ],
  'Wine Bar Page': [
    { name: 'Wine Bar introduction and image' },
    { contentTypeId: 'galleryMenus' },
    { name: 'Reservation, private-event booking, and events links' },
  ],
  'Our Events Page': [
    { name: 'Events introduction and image' },
    { contentTypeId: 'calendarImage' },
    { contentTypeId: 'galleryEvents' },
  ],
  'Private Events Page': [
    { name: 'Private Events introduction and image' },
    { contentTypeId: 'carousel' },
    { name: 'Private-event booking form' },
  ],
  'Contact Page': [
    { name: 'Contact form' },
  ],
};

export function getDirectoryRows(rows, pageTitle) {
  const layout = pageLayouts[pageTitle];
  if (!layout) return rows;

  const remainingRows = new Set(rows);
  const directoryRows = layout.flatMap((section, index) => {
    if (!section.contentTypeId) {
      return [{
        ...section,
        isWebsiteManaged: true,
        placeholderId: `${pageTitle}-${index}`,
      }];
    }
    const matches = rows.filter(row =>
      remainingRows.has(row) && row.contentTypeId === section.contentTypeId,
    );
    matches.forEach(row => remainingRows.delete(row));
    return matches;
  });

  // Keep failed lookups and newly linked content visible even without a template slot.
  return [...directoryRows, ...remainingRows];
}
