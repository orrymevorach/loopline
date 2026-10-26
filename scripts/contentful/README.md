# Contentful event import

Import the events displayed on Loopline's Toast experiences page into Contentful
and append them to gallery `2O3rN8dERX7lJLyMJ6bulZ`.

## Setup

- Use Node.js 22.17 or later and install project dependencies with `npm install`.
- Install the browser once: `npx playwright install chromium`.
- Configure `.env.local` with `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`,
  `CONTENTFUL_MANAGEMENT_TOKEN`, and optionally
  `NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT` (defaults to `master`).
- The published `event` model must have `eventName` (short text), `description`
  (rich text), `date` (short text), and `image` (asset reference). The script
  checks all four field types before writing, including the image asset link;
  it does not change content models.

## Run

```bash
npm run sync:events -- --dry-run
npm run sync:events
```

The importer runs headless Chromium with a standard Chrome user-agent because
Toast rejects the default HeadlessChrome user-agent. Use `--headed` to open a
visible browser for local troubleshooting; `--headless` remains accepted.
HTTP failures, missing event
cards, and incomplete event data stop the import with an error; an empty scrape
is never reported as a successful sync.

Each Toast event becomes one published Event entry, with the displayed date
text preserved verbatim, including multiple dates. Description paragraphs become
Contentful rich text and images are imported as published Contentful assets.

Entry IDs are derived from the canonical Toast event URL. Existing entries are
also matched by normalized event name and date to recognize manually created
events. Existing events are not edited or published. Published matches missing
from the gallery are linked, which also repairs interrupted imports. Existing
unpublished events are skipped with a warning and are not linked.

New gallery references are appended without removing existing references or
changing other fields, then the gallery is published. The importer refuses to
start if the gallery is unpublished or has pending edits. It checks again before
appending references so it cannot publish unrelated edits made during scraping.
A dry run also reports missing gallery references without saving them.

A run with no missing references leaves the gallery unchanged. Gallery update
conflicts reload the entry and recompute missing references, with up to four
retries. Publication failures stop the import and leave any draft for manual
inspection; the importer does not publish newer changes from another editor.
Run only one importer at a time.

Contentful requests have a 25-second timeout. Throttled requests (HTTP 429) and
failed reads (HTTP 5xx) retry up to four times, honoring the rate-limit reset
header with a 30-second cap or using exponential backoff. Each retry is logged.
Failed writes with HTTP 5xx and network errors are not automatically replayed:
the server may have already saved them. Authentication and validation errors
fail immediately.

If an import fails, already published events remain saved. Fix the reported
error and run again; existing events and processed assets are reused. If entry
creation succeeded but publication failed, the resulting draft is treated as an
existing event: publish it manually before rerunning to add it to the gallery.

## Daily Netlify schedule

The Netlify scheduled function `sync-toast-events` starts the Netlify background
function `import-toast-events-background`, which runs the same importer with headless
Chromium. No GitHub Actions workflow, GitHub token, desktop, or Xvfb is needed.

The background function uses the Linux Chromium binary packaged by
`@sparticuz/chromium`. Netlify bundles the browser and Playwright as external
modules, including the compressed browser files. Local CLI runs use the browser
installed by Playwright instead.

Netlify checks at 20:35 and 21:35 UTC. The function dispatches only when the
current hour in `America/Toronto` is 16, so imports run at 4:35 PM Toronto time in
both daylight-saving and standard time. Scheduler and runner queues may delay
the actual start; this is not an exact-time guarantee.

The background worker is separate because Netlify scheduled functions have a
30-second limit, while background functions have up to 15 minutes. Image
processing and cold browser startup can exceed the scheduled function limit.

### Deployment setup

1. Set Netlify production environment variables with the Functions scope:
   `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`, `CONTENTFUL_MANAGEMENT_TOKEN`, and
   `TOAST_SYNC_SECRET` (a long random secret shared by the scheduler and worker).
   Optionally set `NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT`; it defaults to `master`.
   Local `.env.local` values are not uploaded.
2. Deploy with the supplied `netlify.toml`. It selects Node.js 22 for the build
   and function runtime, as required by the serverless Chromium package. Remove
   any older `AWS_LAMBDA_JS_RUNTIME` override in Netlify. No browser install
   command is required during Netlify builds.
3. Confirm `sync-toast-events` has a Scheduled badge and `import-toast-events-background`
   is a background function. Schedules run only on published deploys.
4. Inspect the first production import in Netlify's `import-toast-events-background` logs.
   Local headless scraping has been verified, but Netlify's Linux binary and
   network still need deployment verification. Toast may block data-center IPs.
5. Remove `TOAST_SYNC_GITHUB_TOKEN` and the old import workflow's GitHub secrets
   if nothing else uses them.

The worker checks `TOAST_SYNC_SECRET` before accessing Contentful. Netlify
responds to background invocations with HTTP 202 before execution, so a successful
scheduler log means only that the job was accepted, not that it completed.
Check the worker logs for completion or errors.

### Manual production dry run

Set `TOAST_SYNC_SITE_URL` to the production HTTPS origin and `TOAST_SYNC_SECRET`
in your terminal, then invoke the background worker:

```bash
curl --fail-with-body --request POST \
  "$TOAST_SYNC_SITE_URL/.netlify/functions/import-toast-events-background" \
  --header "Authorization: Bearer $TOAST_SYNC_SECRET" \
  --header 'Content-Type: application/json' \
  --data '{"isDryRun":true}'
```

This previews events and missing gallery references without creating assets,
saving entries, or publishing the gallery. Omit the body or send
`{"isDryRun":false}` for a real import. Malformed JSON, unknown options, and
non-boolean `isDryRun` values are rejected with a warning in the worker logs.
HTTP 202 only acknowledges queuing, including for rejected requests.
Netlify's scheduled-function Run now control still applies the Toronto-hour
guard; use the background endpoint directly for previews at other times.

Netlify retries background failures after one minute and then two minutes.
Deterministic event IDs and existing-entry checks prevent duplicate imports;
do not manually start overlapping imports. Exhausted update conflicts and all
publication conflicts fail explicitly rather than overwriting concurrent changes.
If publication fails after entry
creation, publish the draft manually before retrying, as described above.
