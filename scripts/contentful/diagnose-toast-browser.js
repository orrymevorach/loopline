/* eslint-disable no-console */
const { scrapeEvents } = require('./toast-scraper');

async function run() {
  const args = process.argv.slice(2);
  if (args.some(arg => arg !== '--headed')) {
    throw new Error('Usage: node scripts/contentful/diagnose-toast-browser.js [--headed]');
  }

  const events = await scrapeEvents({ isHeadless: !args.includes('--headed') });
  console.log('Toast browser diagnostic succeeded. No Contentful access or writes.', {
    eventCount: events.length,
    events: events.map(event => ({
      name: event.name,
      date: event.date,
      url: event.url,
      hasDescription: Boolean(event.description),
      hasImage: Boolean(event.imageUrl),
    })),
  });
}

run().catch(error => {
  console.error('Toast browser diagnostic failed:', error.message);
  process.exitCode = 1;
});
