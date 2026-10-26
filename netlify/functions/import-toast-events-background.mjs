import { timingSafeEqual } from 'node:crypto';

export default async function importToastEvents(request) {
  const token = process.env.TOAST_SYNC_SECRET;
  if (!token) {
    console.error('Cannot import Toast events: TOAST_SYNC_SECRET is missing.');
    throw new Error('Missing TOAST_SYNC_SECRET.');
  }

  const authorization = Buffer.from(request.headers.get('authorization') || '');
  const expectedAuthorization = Buffer.from(`Bearer ${token}`);
  const isAuthorized =
    authorization.length === expectedAuthorization.length &&
    timingSafeEqual(authorization, expectedAuthorization);

  if (!isAuthorized) {
    console.warn('Rejected an unauthorized Toast import invocation.');
    return;
  }

  const bodyText = await request.text();
  let options = {};
  if (bodyText.trim()) {
    try {
      options = JSON.parse(bodyText);
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
      console.warn('Rejected Toast import: request body must contain valid JSON.');
      return;
    }
  }
  if (
    !options ||
    typeof options !== 'object' ||
    Array.isArray(options) ||
    Object.keys(options).some(
      key => !['isDryRun', 'isDiagnosticOnly'].includes(key),
    ) ||
    (options.isDryRun !== undefined && typeof options.isDryRun !== 'boolean') ||
    (options.isDiagnosticOnly !== undefined &&
      typeof options.isDiagnosticOnly !== 'boolean')
  ) {
    console.warn('Rejected Toast import: expected optional boolean isDryRun and isDiagnosticOnly options.');
    return;
  }

  try {
    // Diagnose Toast access without loading Chromium or any Contentful helpers.
    if (options.isDiagnosticOnly === true) {
      const { diagnoseToastFetch } = await import('../../scripts/contentful/toast-fetch-diagnostics.mjs');
      await diagnoseToastFetch();
      return;
    }

    const { syncToastEvents } = await import('../../scripts/contentful/sync-toast-events.js');
    await syncToastEvents({
      isServerless: true,
      isDryRun: options.isDryRun === true,
    });
  } catch (error) {
    console.error('Failed to import Toast events in Netlify:', error.message);
    throw error;
  }
}

export const config = {
  background: true,
  method: 'POST',
};
