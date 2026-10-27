import { getMedia } from '@/lib/contentful-utils';

// Button.jsx takes colour as boolean props: isPurple, isCream, isNavy, isYellow.
const colourProp = colour => {
  if (!colour) return {};
  return { [`is${colour.trim()}`]: true };
};

export function formatCarouselSlides(slides) {
  if (!slides?.length) return [];

  return slides
    .filter(slide => slide?.fields)
    .map(({ sys, fields }) => ({
      id: sys.id,
      heading: fields.heading || null,
      title: fields.title || '',
      image: fields.image ? getMedia(fields.image).src : null,
      actions: (fields.buttons || [])
        .filter(button => button?.fields)
        .map(button => ({
          id: button.sys.id,
          label: button.fields.text || '',
          href: button.fields.href || '',
          ...colourProp(button.fields.colour),
        })),
    }));
}

export function formatEvent(event) {
  if (!event?.fields) return null;

  const { fields } = event;
  return {
    id: event.sys.id,
    name: fields.eventName || '',
    date: fields.date || '',
    ticketLink: fields.ticketLink?.trim() || '',
    description: fields.description || null,
    shortenedDescriptionSummary: fields.shortenedDescriptionSummary || null,
    image: fields.image?.fields?.file ? getMedia(fields.image) : null,
  };
}

// The Calendar Image page block returns its fields directly, so this reads
// the poster asset from `fields.image` and returns null when none is uploaded.
export function formatCalendarImage(calendarImageFields) {
  const image = calendarImageFields?.image;
  if (!image?.fields?.file) return null;

  const media = getMedia(image);
  return {
    ...media,
    alt: media.alt || calendarImageFields.title || 'Loopline events calendar',
  };
}

export function formatHours(hours) {
  if (!hours?.length) return [];

  return hours
    .filter(entry => entry?.fields)
    .map(({ sys, fields }) => ({
      id: sys.id,
      title: fields.title || '',
      details: fields.details || [],
    }));
}

export function formatMenus(menus) {
  if (!menus?.length) return [];

  return menus
    .filter(menu => menu?.fields)
    .map(({ sys, fields }) => ({
      id: sys.id,
      label: fields.label || '',
      pdf: fields.pdf ? getMedia(fields.pdf).src : null,
      link: fields.link || '',
    }));
}

export function formatAbout(about) {
  if (!about) return null;

  return {
    description: about.description || null,
    image: about.image ? getMedia(about.image) : null,
  };
}

export function formatStaffMembers(staffMembers) {
  if (!staffMembers?.length) return [];

  const usedAnchors = new Set();

  return staffMembers
    .filter(staffMember => staffMember?.fields)
    .map(({ sys, fields }) => {
      const name = fields.name || '';
      const nameSlug = name
        .normalize('NFKD')
        .replace(/\p{M}/gu, '')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-+|-+$/g, '') || 'staff';
      let anchor = nameSlug;
      let suffix = 2;

      while (usedAnchors.has(anchor)) {
        anchor = `${nameSlug}-${suffix++}`;
      }
      usedAnchors.add(anchor);

      return {
        id: sys.id,
        anchor,
        name,
        description: fields.information || fields.description || null,
        image: fields.image ? getMedia(fields.image) : null,
        staffPick: fields.staffPicks || fields.staffPick || null,
      };
    });
}

export function formatFunFacts(funFacts) {
  if (!funFacts) return null;

  return {
    title: funFacts.title || '',
    facts: funFacts.facts || [],
  };
}
