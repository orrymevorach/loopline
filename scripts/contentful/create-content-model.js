/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local' });

const json = require('./content-model.json');
const { request } = require('./setup');

const CONTENT_MODEL_KEY = 'funFacts';
const ENVIRONMENT_ID =
  process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master';

const contentModel = json[CONTENT_MODEL_KEY];

if (!contentModel) {
  console.error(`Unknown content model key: "${CONTENT_MODEL_KEY}"`);
  console.error(`Available keys: ${Object.keys(json).join(', ')}`);
  process.exit(1);
}

if (!contentModel.id || typeof contentModel.id !== 'string') {
  console.error(
    `Missing required "id" field for model key "${CONTENT_MODEL_KEY}" in content-model.json`,
  );
  process.exit(1);
}

const CONTENT_TYPE_ID = contentModel.id;

// `controls` is editor-interface config, not part of the content type payload.
const { id: _id, controls, ...contentTypePayload } = contentModel;

async function getExistingContentType() {
  try {
    return await request(`/content_types/${CONTENT_TYPE_ID}`);
  } catch (error) {
    const message = String(error && error.message ? error.message : error);
    if (message.includes('404')) return null;
    throw error;
  }
}

async function createContentType() {
  return request(`/content_types/${CONTENT_TYPE_ID}`, {
    method: 'PUT',
    body: JSON.stringify(contentTypePayload),
    headers: {
      'X-Contentful-Content-Type': CONTENT_TYPE_ID,
    },
  });
}

async function updateContentType(existingContentType) {
  return request(`/content_types/${CONTENT_TYPE_ID}`, {
    method: 'PUT',
    body: JSON.stringify(contentTypePayload),
    headers: {
      'X-Contentful-Version': String(existingContentType.sys.version),
      'X-Contentful-Content-Type': CONTENT_TYPE_ID,
    },
  });
}

async function updateEditorInterface() {
  const editorInterfacePath = `/content_types/${CONTENT_TYPE_ID}/editor_interface`;
  const existing = await request(editorInterfacePath);

  return request(editorInterfacePath, {
    method: 'PUT',
    body: JSON.stringify({ controls }),
    headers: {
      'X-Contentful-Version': String(existing.sys.version),
    },
  });
}

async function publishContentType(contentType) {
  return request(`/content_types/${CONTENT_TYPE_ID}/published`, {
    method: 'PUT',
    headers: {
      'X-Contentful-Version': String(contentType.sys.version),
    },
  });
}

async function run() {
  console.log(
    `Checking content type "${CONTENT_TYPE_ID}" (model key "${CONTENT_MODEL_KEY}") in environment "${ENVIRONMENT_ID}"...`,
  );

  const existing = await getExistingContentType();

  let updatedOrCreated;

  if (existing) {
    console.log('Content type exists. Updating...');
    updatedOrCreated = await updateContentType(existing);
  } else {
    console.log('Creating content type...');
    updatedOrCreated = await createContentType();
  }

  console.log('Publishing content type...');
  await publishContentType(updatedOrCreated);

  if (controls?.length) {
    console.log('Applying editor interface controls...');
    await updateEditorInterface();
  }

  console.log(
    `Success: content model "${contentModel.name || CONTENT_MODEL_KEY}" created and published.`,
  );
}

run().catch(error => {
  console.error('Failed to create content type:', error.message || error);
  process.exit(1);
});
