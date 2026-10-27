import Image from 'next/image';
import Button from '@/components/shared/Button/Button';
import SplitSection from '@/components/shared/SplitSection/SplitSection';
import { EVENTS_GALLERY_ID } from '@/components/Events/EventsGallery/EventsGallery';
import styles from './EventsHero.module.scss';
import image from 'public/events-hero.jpg';

export default function EventsHero({
  title = 'Events',
  description = 'At Loopline, our events are an extension of the table. From educational tastings and winemaker takeovers to themed dinners, thoughtful collaborations, and community nights, each gathering is designed to bring people together over something worth sharing.',
  actionHref = `#${EVENTS_GALLERY_ID}`,
  actionLabel = 'See current events',
  actionTarget = null,
}) {
  const isPageAnchor = actionHref.startsWith('#');

  return (
    <SplitSection imageWidth={745} image={image} priority>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{description}</p>
        <Button
          href={actionHref}
          target={actionTarget}
          isAnchor={isPageAnchor}
          isYellow
          classNames={styles.button}
        >
          {actionLabel}
          <Image
            src='/arrow-right.svg'
            alt=''
            width={14}
            height={9}
            className={styles.arrow}
          />
        </Button>
      </div>
    </SplitSection>
  );
}
