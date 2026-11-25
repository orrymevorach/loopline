/* eslint-disable no-console */
// Adds optional Start Date / End Date fields to the Event content type so the
// site can publish schema.org Event data (Google event results). The existing
// free-text `date` field stays as the display label.
//
// Usage: node scripts/contentful/add-event-dates.js
const { request } = require('./setup');

const NEW_FIELDS = [
  {
    id: 'startDate',
    name: 'Start Date',
    type: 'Date',
    required: false,
    localized: false,
    validations: [],
    disabled: false,
    omitted: false,
  },
  {
    id: 'endDate',
    name: 'End Date',
    type: 'Date',
    required: false,
    localized: false,
    validations: [],
    disabled: false,
    omitted: false,
  },
];

const HELP_TEXT = {
  startDate:
    'When the event starts. Used by Google to list the event in search. The Date field above is what visitors see.',
  endDate: 'Optional. Only needed for multi-day events.',
};

async function main() {
  const contentType = await request('/content_types/event');
  const missing = NEW_FIELDS.filter(
    field => !contentType.fields.some(existing => existing.id === field.id),
  );

  if (!missing.length) {
    console.log('Event already has startDate and endDate.');
    return;
  }

  const fields = [...contentType.fields];
  const dateIndex = fields.findIndex(field => field.id === 'date');
  fields.splice(dateIndex + 1, 0, ...missing);

  const updated = await request('/content_types/event', {
    method: 'PUT',
    headers: { 'X-Contentful-Version': contentType.sys.version },
    body: JSON.stringify({
      name: contentType.name,
      description: contentType.description,
      displayField: contentType.displayField,
      fields,
    }),
  });

  await request('/content_types/event/published', {
    method: 'PUT',
    headers: { 'X-Contentful-Version': updated.sys.version },
  });
  console.log(`Added ${missing.map(field => field.id).join(', ')} to Event.`);

  const editorInterface = await request(
    '/content_types/event/editor_interface',
  );
  const controls = editorInterface.controls.map(control =>
    HELP_TEXT[control.fieldId]
      ? {
          ...control,
          widgetId: 'datePicker',
          widgetNamespace: 'builtin',
          settings: {
            ...control.settings,
            helpText: HELP_TEXT[control.fieldId],
            format: 'timeZ',
            ampm: '12',
          },
        }
      : control,
  );
  await request('/content_types/event/editor_interface', {
    method: 'PUT',
    headers: { 'X-Contentful-Version': editorInterface.sys.version },
    body: JSON.stringify({ controls }),
  });
  console.log('Updated date picker help text.');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
