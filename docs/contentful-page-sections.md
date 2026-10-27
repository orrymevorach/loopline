# Page Builder field editor

The App Router route `/contentful/page-sections` provides a Contentful App
Framework **Entry field** editor. It replaces only the editing interface for the
Page model's existing multiple-entry reference field. It does not change content
models, reference values, frontend templates, or section resolution on the website.

The directory displays references in their stored order, but that order does not
control the website layout. React templates control layout.

## Deployment

Deploy this repository through the same hosting project and production branch as
the Loopline website. No separate app bundle, function, or deployment is needed.
Use the existing `npm run build` command and existing Next.js hosting integration;
for a self-hosted Node deployment, run `npm run start` after building.

The repository does not contain an active hosting-provider deployment workflow.
Use the existing site's connected deployment dashboard to deploy the branch.
The README's Vercel instructions and the commented Netlify hook in the CMS-sync
workflow are not proof of an active production deployment.

After deployment, the frontend URL is:

```text
https://YOUR-DEPLOYED-LOOPLINE-HOST/contentful/page-sections
```

Opening it directly should show an explanation that it must be opened in
Contentful. This is expected, not a connection failure.

The route must be accessible without a hosting-provider login and must permit
embedding from Contentful. If your host adds `X-Frame-Options: DENY` or
`SAMEORIGIN`, remove that header for this route. If it sets a CSP
`frame-ancestors` restriction, allow the actual Contentful web app origin used by
your organization (for example `https://app.contentful.com` or the EU region's
web app origin). Do not loosen unrelated website routes.

No new environment variables, API keys, or management/delivery tokens are
required by this field editor. Requests use the authenticated user's SDK session.

## Contentful setup

1. In Contentful, open the target organization's **Apps / App definitions** area
   and create an app definition named **Page Builder**. You can also
   configure a dedicated existing definition, but do not reuse the staff-pick
   app definition.
2. Set its frontend URL to the deployed URL above.
3. Enable the **Entry field** location. In its supported field types, select
   **References, many / multiple entries**: field type `Array` with items
   `{ "type": "Link", "linkType": "Entry" }`. Do not choose single-entry
   references, asset references, Entry editor, or Page location.
4. Save the app definition. Install it in the Loopline space and the intended
   environment. Verify the environment explicitly; staging and production
   installations are separate.
5. In that environment, open **Content model > Page**, select the existing
   multiple-entry reference field that contains the page's editable content, and
   open **Appearance**.
6. Select **Page Builder** as the field's editor. Save the field settings
   and save the content model's editor configuration. Do not recreate the field,
   change its validations, or edit any reference values.
7. Open an existing Page entry. Confirm the directory appears and click **Edit**
   to open a referenced section in Contentful's slide-in editor.

The app definition needs no configuration page or installation parameters.
Each instance reads the field it is attached to; no field ID is hardcoded.
Users need their normal Contentful permissions to view, edit, and publish the
referenced entries. This UI cannot grant additional permissions.

## Behavior and verification

The editor uses `field.getValue()` and `field.onValueChanged()`, and never calls
`setValue()` or `removeValue()`. It uses `sdk.cma.entry.get` and
`sdk.cma.contentType.get` with the current SDK space/environment IDs, including
draft entries. Content types are cached per mounted editor, including in-flight
lookups; failed type requests can be retried.

Names use the content type's `displayField`, first in `sdk.field.locale`, then
`sdk.locales.default`, then the entry ID. Missing/inaccessible entries display
their own error and Retry action without suppressing the other rows. Retry
reloads the directory without writing the field. Closing a slide-in refreshes
the names. Field subscriptions and iframe resizing are cleaned up on unmount,
and outdated lookups cannot overwrite newer field data.

The installed SDK's navigator signature is
`openEntry(entryId, { slideIn: { waitForClose: true } })`. It opens the child
entry without modifying the parent field. Editors can save and publish the
child through Contentful's normal controls.

### Checks requiring Contentful

- Verify the Contentful-style reference cards show names, human-readable content
  type names, publication status, and Edit buttons on real Page entries. There
  is no extra heading or description above the cards.
- Verify the iframe expands to show the full directory, including errors.
- Verify Edit opens a slide-in; save/publish a child and close it. Confirm the
  updated display name appears and the parent's reference value is unchanged.
- Check a draft child, a child with no title, and a localized title. Confirm
  locale/default-locale/ID fallback.
- In a non-production environment, check an already empty reference field,
  a missing/inaccessible reference, and a failed lookup followed by Retry.
  One bad reference must not hide the others.
- Trigger an external field change while lookups are pending. Confirm only
  the newest references render, in their stored order.
- Confirm there are no add, remove, reorder, drag, or creation controls.

This repository has no configured test framework. Do not send production writes
just to verify the app. A successful Next.js build and standalone-page check do
not replace these authenticated, in-Contentful checks.

### Implementation verification

- `npm run build` passed, including type checking and static route generation.
- The standalone route was opened in the browser: the Contentful-only message
  appeared and website navigation was absent.
- Read-only in-memory SDK fixtures verified locale fallback, draft entries,
  shared content-type requests, isolated 404 failures, cache retry, correct
  space/environment scope, and unchanged input reference objects.
- `npm run lint` is blocked by the repository's existing legacy `.eslintrc.json`
  with ESLint 9. Without changing that configuration, scoped lint passed using
  the installed Next.js flat configuration:

  ```sh
  ./node_modules/.bin/eslint --no-config-lookup \
    --config node_modules/eslint-config-next/dist/core-web-vitals.js \
    components/Contentful/PageSectionsField app/contentful/page-sections \
    components/shared/Layout/Layout.jsx next-sitemap.config.js
  ```

- Authenticated Contentful checks above remain manual until the app is installed.

**Important:** hiding reference-management controls is an editor-interface
restriction, not an API-level permission restriction. Authorized users,
integrations, or other editors can still change references through Contentful's
APIs. Enforce access through Contentful roles/permissions separately.
