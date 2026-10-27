import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master',
});

export async function getEntryById({ entryId, include = 10 }) {
  try {
    return await client.getEntry(entryId, { include });
  } catch (error) {
    console.error(`Error fetching entry "${entryId}":`, error.message);
    return null;
  }
}

export async function getEntryByField({
  contentTypeId,
  fieldName,
  fieldValue,
  include = 10,
}) {
  try {
    const { items } = await client.getEntries({
      content_type: contentTypeId,
      [`fields.${fieldName}`]: fieldValue,
      include,
    });
    return items[0]?.fields || null;
  } catch (error) {
    console.error(
      `Error fetching "${contentTypeId}" where ${fieldName}="${fieldValue}":`,
      error.message,
    );
    return null;
  }
}

// Links past the `include` depth come back unresolved, so fetch those individually.
async function resolveEntries(entries = []) {
  const resolved = await Promise.all(
    entries.map(entry => {
      if (entry?.fields) return entry;
      return entry?.sys?.id ? getEntryById({ entryId: entry.sys.id }) : null;
    }),
  );
  return resolved.filter(Boolean);
}

const sectionCollections = {
  carousel: { key: 'carouselSlides', field: 'slides' },
  hoursOfOperation: { key: 'hoursOfOperations', field: 'data' },
  galleryEvents: { key: 'events', field: 'events' },
  galleryStaffMembers: { key: 'staffEntries', field: 'staffMembers' },
  galleryMenus: { key: 'menus', field: 'menus' },
};

// Collections combine entries from repeated sections in Contentful reference order.
// Other content types retain an array of field objects so duplicates are not lost.
export async function getPageSections({ page }) {
  if (!page?.content?.length) return {};

  const blocks = await resolveEntries(page.content);

  const sections = await Promise.all(
    blocks.map(async ({ sys, fields }) => {
      const sectionKey = sys?.contentType?.sys?.id;
      if (!sectionKey) {
        throw new Error('Page section is missing its content type ID.');
      }

      const collection = Object.hasOwn(sectionCollections, sectionKey)
        ? sectionCollections[sectionKey]
        : null;
      const referenceField = collection?.field;
      const linkedEntries = referenceField ? fields[referenceField] : null;
      if (referenceField && linkedEntries != null && !Array.isArray(linkedEntries)) {
        throw new Error(
          `Page section "${sectionKey}" field "${referenceField}" must be an array.`,
        );
      }
      const content = referenceField
        ? await resolveEntries(linkedEntries || [])
        : fields;
      return [collection?.key || sectionKey, referenceField ? content : [content]];
    }),
  );

  const groupedSections = new Map();
  for (const [sectionKey, content] of sections) {
    if (!groupedSections.has(sectionKey)) {
      groupedSections.set(sectionKey, []);
    }
    groupedSections.get(sectionKey).push(...content);
  }
  return Object.fromEntries(groupedSections);
}
