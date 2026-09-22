import { getMedia } from '@/lib/contentful-utils';

// Button.jsx takes colour as boolean props: isPurple, isCream, isNavy, isYellow.
const colourProp = colour => {
  if (!colour) return {};
  return { [`is${colour.trim()}`]: true };
};

export default function formatCarouselSlides(slides) {
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
