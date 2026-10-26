/* eslint-disable no-console */
const { chromium } = require('playwright');

const EXPERIENCES_URL =
  'https://toast.app/r/loopline-bottle-shop-wine-bar-643-dupont-street/experiences';

async function scrapeEvents({ isHeadless = true, isServerless = false } = {}) {
  const launchOptions = { headless: isHeadless };
  if (isServerless) {
    const { default: serverlessChromium } = await import('@sparticuz/chromium');
    launchOptions.headless = true;
    launchOptions.args = serverlessChromium.args;
    launchOptions.executablePath = await serverlessChromium.executablePath();
  }
  const browser = await chromium.launch(launchOptions);

  try {
    const browserVersion = browser.version();
    const page = await browser.newPage({
      // Toast rejects Chromium's default HeadlessChrome user-agent with HTTP 403.
      userAgent: `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${browserVersion} Safari/537.36`,
      locale: 'en-CA',
      timezoneId: 'America/Toronto',
    });
    const response = await page.goto(EXPERIENCES_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    if (!response?.ok()) {
      const responseHeaders = response ? await response.allHeaders() : {};
      console.error('Toast navigation rejected:', {
        status: response?.status(),
        isServerless,
        browserVersion,
        pageTitle: await page.title(),
        server: responseHeaders.server,
        requestId: responseHeaders['cf-ray'] || responseHeaders['x-request-id'],
        challenge: responseHeaders['cf-mitigated'],
      });
      throw new Error(
        `Toast page request failed: HTTP ${response?.status()}.${response?.status() === 403 ? ' Toast denied this request; inspect the navigation diagnostics. No Contentful writes were performed.' : ''}`,
      );
    }

    // Toast initially renders placeholder cards; wait for complete event content.
    await page.waitForFunction(() => {
      const cards = Array.from(
        document.querySelectorAll('main [data-event-card-version]'),
      );
      return (
        cards.length > 0 &&
        cards.every(card =>
          card.querySelector('a[href*="/experiences/"]')?.textContent.trim() &&
          card.querySelector('[data-testid="event-card-date"]')?.textContent.trim() &&
          card.querySelector('[data-testid="event-card-image"]'),
        )
      );
    }, null, { timeout: 30000 });

    const events = await page.locator('main [data-event-card-version]').evaluateAll(
      cards =>
        cards.map(card => {
          const link = card.querySelector('a[href*="/experiences/"]');
          const date = card.querySelector('[data-testid="event-card-date"]');
          const description = Array.from(card.querySelectorAll('p')).find(
            paragraph => paragraph !== date,
          );
          const image = card.querySelector('[data-testid="event-card-image"]');
          const backgroundImage = image?.style.getPropertyValue(
            '--event-card-background-image',
          );
          const imageUrl = backgroundImage?.match(
            /^url\(["']?(.*?)["']?\)$/,
          )?.[1];

          return {
            name: link?.textContent.trim(),
            url: link?.href,
            date: date?.textContent.trim(),
            description: description?.textContent.trim(),
            imageUrl,
          };
        }),
    );

    const uniqueEvents = new Map();
    for (const event of events) {
      for (const field of ['name', 'url', 'date', 'description', 'imageUrl']) {
        if (!event[field]) {
          throw new Error(
            `Toast event "${event.name || 'unknown'}" is missing ${field}; import stopped.`,
          );
        }
      }

      const url = new URL(event.url);
      url.search = '';
      url.hash = '';
      if (url.origin !== new URL(EXPERIENCES_URL).origin) {
        throw new Error(`Unexpected Toast event URL: ${url.href}`);
      }
      const imageUrl = new URL(event.imageUrl);
      if (imageUrl.protocol !== 'https:' || imageUrl.hostname !== 'cdn.toasttab.com') {
        throw new Error(`Unexpected Toast image URL: ${imageUrl.href}`);
      }
      event.url = url.href;
      uniqueEvents.set(event.url, event);
    }

    return [...uniqueEvents.values()];
  } finally {
    await browser.close();
  }
}

module.exports = { scrapeEvents };
