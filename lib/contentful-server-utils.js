const contentful = require('contentful');

// const client = contentful.createClient({
//   space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
//   accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
//   environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
// });

// export async function getEntryByField({
//   contentTypeId,
//   fieldName,
//   fieldValue,
// }) {
//   const entry = await client.getEntries({
//     content_type: contentTypeId,
//     [`fields.${fieldName}`]: fieldValue,
//   });
//   return entry.items[0].fields;
// }

// export async function getEntryById({ entryId }) {
//   let entry;
//   try {
//     entry = await client.getEntry(entryId);
//     return entry;
//   } catch (error) {
//     console.error('Error fetching entries:', error);
//     return error;
//   }
// }

// async function getEntries({ entries = [] }) {
//   return Promise.all(
//     entries.map(async ({ sys }) => {
//       const entry = await getEntryById({
//         entryId: sys.id,
//       });

//       return entry.fields;
//     }),
//   );
// }

// export async function getPageReferenceEntries({ page }) {
//   const entries = await Promise.all(
//     page.content?.map(async ({ fields }) => {
//       if (!fields) return null;
//       const linkedEntries = Object.values(fields).find(Array.isArray);
//       const linkedEntriesData = linkedEntries
//         ? await getEntries({ entries: linkedEntries })
//         : fields;

//       return linkedEntriesData;
//     }),
//   );
//   return entries;
// }
