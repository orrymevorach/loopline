import Link from 'next/link';
import Button from '@/components/shared/Button/Button';
import styles from './NextEvent.module.scss';
import SplitSection from '@/components/shared/SplitSection/SplitSection';
import RichText from '@/components/shared/RichText/RichText';
import { inlineLinkRichTextConfig } from '@/components/shared/RichText/rich-text-config';
import fallbackImage from 'public/event.jpg';

export default function NextEvent({ event }) {
  if (!event) return null;

  const image = event.image || { ...fallbackImage, alt: event.name };

  return (
    <section className={styles.section}>
      <SplitSection
        image={image}
        imageWidth={500}
        alignItems='center'
        justifyContent='center'
      >
        <div className={styles.left}>
          <p className={styles.eyebrow}>
            Our Next Event <br />
            {event.date}
          </p>
          <h2 className={styles.title}>{event.name}</h2>
          <div className={styles.description}>
            {event.shortenedDescriptionSummary && (
              <RichText
                json={event.shortenedDescriptionSummary}
                config={inlineLinkRichTextConfig}
                classNames={styles.eventText}
              />
            )}
          </div>
          <div className={styles.buttons}>
            <Button href={event.ticketLink || '/events'}>Buy Tickets</Button>
            <Button href='/events'>See all events</Button>
          </div>
        </div>
      </SplitSection>
    </section>
  );
}
