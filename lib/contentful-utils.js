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

export function getMedia(media) {
  const size = media.fields?.file?.details?.image;
  const src = `https:${media.fields.file.url}`;
  const alt = media.fields.title;
  return {
    src,
    alt,
    width: size?.width || null,
    height: size?.height || null,
  };
}
