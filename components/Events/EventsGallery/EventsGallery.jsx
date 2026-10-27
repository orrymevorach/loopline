import EventTile from '@/components/Events/EventTile/EventTile';
import Wrapper from '@/components/shared/Wrapper/Wrapper';
import styles from './EventsGallery.module.scss';

export const EVENTS_GALLERY_ID = 'events-gallery';

export default function EventsGallery({ events = [] }) {
  if (!events.length) return null;

  return (
    <section
      id={EVENTS_GALLERY_ID}
      className={styles.section}
      aria-labelledby='events-gallery-heading'
    >
      <Wrapper>
        <h2 id='events-gallery-heading' className={styles.heading}>
          Upcoming Events
        </h2>
        <ul className={styles.grid}>
          {events.map(event => (
            <li key={event.id} className={styles.item}>
              <EventTile event={event} />
            </li>
          ))}
        </ul>
      </Wrapper>
    </section>
  );
}
