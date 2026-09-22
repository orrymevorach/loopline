/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local' });

const { getDefaultLocale, upsertEntry } = require('./entry-utils');

const FUN_FACTS_ENTRY_ID = 'home-fun-facts';
const FUN_FACTS_TITLE = 'Fun Facts';

// Mirrors the hardcoded `facts` array in components/HomePage/FunFacts/FunFacts.jsx
const facts = [
  'Loopline is named after a real streetcar loop—an ode to the Church Street streetcar route that once looped through the area, running until 1963.',
  'Loopline has over 150 wines on debut—from sustainable, estate-grown bottles to trending classics from both iconic and under-the-radar vineyards.',
];

async function run() {
  const locale = await getDefaultLocale();
  console.log(`Using default locale "${locale}".\n`);

  await upsertEntry(FUN_FACTS_ENTRY_ID, 'funFacts', {
    title: { [locale]: FUN_FACTS_TITLE },
    facts: { [locale]: facts },
  });

  console.log(
    `Fun Facts "${FUN_FACTS_ENTRY_ID}" published with ${facts.length} facts.`,
  );
}

run().catch(error => {
  console.error('Failed to create fun facts entry:', error.message || error);
  process.exit(1);
});
