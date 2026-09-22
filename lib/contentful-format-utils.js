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

export function formatAbout(about) {
  if (!about) return null;

  return {
    description: about.description || null,
    image: about.image ? getMedia(about.image) : null,
  };
}

export function formatFunFacts(funFacts) {
  if (!funFacts) return null;

  return {
    title: funFacts.title || '',
    facts: funFacts.facts || [],
  };
}
