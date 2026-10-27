export function getReferenceError(value) {
  if (value == null) return '';
  if (!Array.isArray(value)) return 'This field must contain a list of entry references.';
  return '';
}

export function getEntryId(reference) {
  const sys = reference?.sys;
  return sys?.type === 'Link' && sys.linkType === 'Entry' &&
    typeof sys.id === 'string' && sys.id ? sys.id : null;
}

function getDisplayText(value) {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  return '';
}

export async function resolveSection(sdk, reference, contentTypes) {
  const entryId = getEntryId(reference);
  if (!entryId) {
    return { error: 'This reference is not a valid entry link.' };
  }

  const scope = { spaceId: sdk.ids.space, environmentId: sdk.ids.environment };
  try {
    const entry = await sdk.cma.entry.get({ ...scope, entryId });
    const contentTypeId = entry.sys.contentType.sys.id;
    if (!contentTypes.has(contentTypeId)) {
      const request = sdk.cma.contentType.get({ ...scope, contentTypeId });
      contentTypes.set(contentTypeId, request);
      request.catch(() => {
        if (contentTypes.get(contentTypeId) === request) {
          contentTypes.delete(contentTypeId);
        }
      });
    }
    const contentType = await contentTypes.get(contentTypeId);
    const displayValues = entry.fields[contentType.displayField];
    const name = getDisplayText(displayValues?.[sdk.field.locale]) ||
      getDisplayText(displayValues?.[sdk.locales.default]) || entryId;

    return {
      entryId,
      name,
      contentTypeName: contentType.name,
      isUnpublished: !entry.sys.publishedVersion,
    };
  } catch (error) {
    const status = error.status || error.response?.status;
    const isUnavailable = status === 403 || status === 404 ||
      error.name === 'NotFound' || error.name === 'AccessDenied';
    if (!isUnavailable) {
      console.error('Failed to resolve editable page section:', { entryId, ...scope }, error);
    }
    return {
      entryId,
      error: isUnavailable
        ? 'This section is missing or you do not have access to it.'
        : 'Could not load this section. Please retry.',
    };
  }
}
