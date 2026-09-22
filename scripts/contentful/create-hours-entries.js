/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local' });

const {
  slugify,
  entryLink,
  getDefaultLocale,
  upsertEntry,
} = require('./entry-utils');

const HOURS_OF_OPERATION_ID = 'home-hours-of-operation';
const HOURS_OF_OPERATION_TITLE = 'Home Hours of Operation';

// Mirrors the hardcoded `operations` array in
// components/HomePage/HoursOfOperations/HoursOfOperations.jsx
const operations = [
  {
    title: '643 Dupont Street',
    details: ['Toronto'],
  },
  {
    title: 'Bottle Shop Hours',
    details: ['Tuesday - Saturday', '11am - 10pm'],
  },
  {
    title: 'Wine Bar Hours',
    details: ['Tuesday - Saturday', '4pm - 10pm'],
  },
];

async function run() {
  const locale = await getDefaultLocale();
  console.log(`Using default locale "${locale}".\n`);

  const hoursIds = [];

  for (const operation of operations) {
    const hoursId = `hours-${slugify(operation.title)}`;

    await upsertEntry(hoursId, 'hours', {
      title: { [locale]: operation.title },
      details: { [locale]: operation.details },
    });

    console.log(`Hours "${hoursId}" published.`);
    hoursIds.push(hoursId);
  }

  await upsertEntry(HOURS_OF_OPERATION_ID, 'hoursOfOperation', {
    title: { [locale]: HOURS_OF_OPERATION_TITLE },
    data: { [locale]: hoursIds.map(entryLink) },
  });

  console.log(
    `\nHours Of Operation "${HOURS_OF_OPERATION_ID}" published with ${hoursIds.length} entries.`,
  );
}

run().catch(error => {
  console.error('Failed to create hours entries:', error.message || error);
  process.exit(1);
});
