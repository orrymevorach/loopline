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

export async function getPageReferenceEntries({ page }) {
  if (!page?.content?.length) return [];

  const blocks = await resolveEntries(page.content);

  return Promise.all(
    blocks.map(({ fields }) => {
      const linkedEntries = Object.values(fields).find(Array.isArray);
      return linkedEntries ? resolveEntries(linkedEntries) : fields;
    }),
  );
}
