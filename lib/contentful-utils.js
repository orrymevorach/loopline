export async function getEntries({ contentTypeId }) {
  const { entries } = await fetch(
    `${process.env.NEXT_PUBLIC_ENV_URL}/api/contentful/get-entries`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contentTypeId }),
    }
  ).then(res => res.json());
  return entries;
}

// Returns null when the asset is unpublished (an unresolved link) or a draft
// with no file uploaded yet, so callers can skip it instead of crashing.
export function getMedia(media) {
  const file = media?.fields?.file;
  if (!file?.url) return null;

  const size = file.details?.image;
  const src = `https:${file.url}`;
  const alt = media.fields.title;
  return {
    src,
    alt,
    width: size?.width || null,
    height: size?.height || null,
  };
}

// Contentful's Images API resizes and re-encodes on the fly. Use this for
// images that bypass next/image (e.g. CSS backgrounds) so they aren't served
// at full upload size.
export function getResizedImageUrl(src, { width = 2000, quality = 75 } = {}) {
  if (!src?.includes('images.ctfassets.net')) return src;
  const url = new URL(src);
  url.searchParams.set('w', width);
  url.searchParams.set('fm', 'webp');
  url.searchParams.set('q', quality);
  return url.toString();
}
