const EXPERIENCES_URL =
  'https://toast.app/r/loopline-bottle-shop-wine-bar-643-dupont-street/experiences';

export async function diagnoseToastFetch() {
  const response = await fetch(EXPERIENCES_URL, {
    headers: { Accept: 'text/html' },
    signal: AbortSignal.timeout(25000),
  });
  const html = await response.text();
  if (html.length > 5_000_000) {
    throw new Error('Toast diagnostic response exceeds the 5 MB character limit.');
  }

  const events = [];
  for (const match of html.matchAll(
    /<script\b[^>]*\btype\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    const data = JSON.parse(match[1]);
    const documents = Array.isArray(data) ? data : [data];
    for (const document of documents) {
      if (document['@type'] !== 'ItemList') continue;
      for (const listItem of document.itemListElement || []) {
        if (listItem.item?.['@type'] === 'Event') {
          events.push(listItem.item);
        }
      }
    }
  }

  const hasCompleteEventData =
    events.length > 0 &&
    events.every(event =>
      ['name', 'description', 'url', 'image'].every(
        field => typeof event[field] === 'string' && event[field].trim(),
      ),
    );
  const hasCloudflareChallenge =
    response.headers.get('cf-mitigated') === 'challenge' ||
    /<title[^>]*>\s*Just a moment/i.test(html);
  const hasUsableEventData =
    response.ok && !hasCloudflareChallenge && hasCompleteEventData;

  const result = {
    status: response.status,
    server: response.headers.get('server'),
    requestId: response.headers.get('cf-ray') || response.headers.get('x-request-id'),
    hasCloudflareChallenge,
    hasUsableEventData,
    eventCount: events.length,
    eventNames: events.map(event => event.name),
  };

  if (hasUsableEventData) {
    console.log('Toast plain-fetch diagnostic: structured events found.', result);
  } else {
    console.warn(
      'Toast plain-fetch diagnostic: no usable event page returned. No import attempted.',
      result,
    );
  }
  return result;
}
