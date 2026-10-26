const TIME_ZONE = 'America/Toronto';

export default async function syncToastEvents() {
  const torontoHour = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    hourCycle: 'h23',
  }).format(new Date());

  // Toronto reaches 6 AM at 10 UTC in summer and 11 UTC in winter.
  if (torontoHour !== '06') {
    console.log('Skipping Toast sync: it is not 6 AM in Toronto.');
    return new Response(null, { status: 204 });
  }

  const token = process.env.TOAST_SYNC_SECRET;
  if (!token) {
    console.error('Cannot start Toast sync: TOAST_SYNC_SECRET is missing.');
    throw new Error('Missing TOAST_SYNC_SECRET.');
  }

  try {
    if (!process.env.URL) {
      throw new Error('Missing Netlify site URL.');
    }
    const response = await fetch(
      new URL('/.netlify/functions/import-toast-events-background', process.env.URL),
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(10000),
      },
    );

    if (response.status !== 202) {
      throw new Error(`Netlify background invocation failed: HTTP ${response.status}.`);
    }
  } catch (error) {
    console.error('Failed to start the morning Toast event sync:', error.message);
    throw error;
  }

  console.log('Netlify accepted the Toast sync. Check import-toast-events-background logs for results.');
  return new Response(null, { status: 204 });
}
