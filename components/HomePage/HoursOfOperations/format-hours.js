export default function formatHours(hours) {
  if (!hours?.length) return [];

  return hours
    .filter(entry => entry?.fields)
    .map(({ sys, fields }) => ({
      id: sys.id,
      title: fields.title || '',
      details: fields.details || [],
    }));
}
