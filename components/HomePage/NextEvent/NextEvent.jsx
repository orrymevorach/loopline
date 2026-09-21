import Link from 'next/link';
import Button from '@/components/shared/Button/Button';
import styles from './NextEvent.module.scss';
import image from 'public/event.jpg';
import SplitSection from '@/components/shared/SplitSection/SplitSection';

export default function NextEvent() {
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
            November 8th
          </p>
          <h2 className={styles.title}>Apero Hour with Grégoire Doulain</h2>
          <div className={styles.description}>
            <p>
              Join us for a sultry evening of sliced meats and silky wines, as
              French charcuterie specialist Grégoire Doulain takes over the bar
              for a live showcase of Lyonnaise cured meats.
            </p>
            <Link href='/events' className={styles.learnMore}>
              Learn More
            </Link>
          </div>
          <div className={styles.buttons}>
            <Button href='/events'>Buy Tickets</Button>
            <Button href='/events'>See all events</Button>
          </div>
        </div>
      </SplitSection>
    </section>
  );
}
