import Image from 'next/image';
import Button from '@/components/shared/Button/Button';
import RichText from '@/components/shared/RichText/RichText';
import { inlineLinkRichTextConfig } from '@/components/shared/RichText/rich-text-config';
import fallbackImage from 'public/event.jpg';
import styles from './EventTile.module.scss';

export default function EventTile({ event }) {
  const image = event.image || { ...fallbackImage, alt: event.name };
  // Contentful assets usually include dimensions; without them, use a square
  // frame that fits the whole poster instead of cropping it.
  const hasImageDimensions = Boolean(image.width && image.height);

  return (
    <article className={styles.tile}>
      {hasImageDimensions ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes='(max-width: 850px) 100vw, 50vw'
          className={styles.image}
        />
      ) : (
        <div className={styles.imageFrame}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes='(max-width: 850px) 100vw, 50vw'
            className={styles.containedImage}
          />
        </div>
      )}
      <div className={styles.content}>
        {event.date && <p className={styles.date}>{event.date}</p>}
        <h3 className={styles.title}>{event.name}</h3>
        {event.description && (
          <details className={styles.details}>
            <summary className={styles.learnMore}>Learn more</summary>
            <RichText
              json={event.description}
              config={inlineLinkRichTextConfig}
              classNames={styles.description}
            />
          </details>
        )}
        {event.ticketLink && (
          <Button
            href={event.ticketLink}
            isNavy
            classNames={styles.ticketButton}
            target='_blank'
          >
            Buy Tickets
          </Button>
        )}
      </div>
    </article>
  );
}
