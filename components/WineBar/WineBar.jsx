import Link from 'next/link';
import Wrapper from '../shared/Wrapper/Wrapper';
import MenuLinks from './MenuLinks/MenuLinks';
import Actions from './Actions/Actions';
import HeroImage from './HeroImage/HeroImage';
import styles from './WineBar.module.scss';

export default function WineBar() {
  return (
    <Wrapper>
      <section className={styles.section}>
        <div className={styles.content}>
          <h1 className={styles.title}>Wine Bar</h1>
          <div className={styles.textContainer}>
            <p className={styles.text}>Wine. Small plates. Good company.</p>
            <p className={styles.text}>
              Explore what we’re pouring and what’s coming out of the kitchen.
            </p>

            <p className={styles.text}>
              *All menu items are subject to change.
            </p>
          </div>

          <MenuLinks />
          <Actions />
          <Link href='/events' className={styles.eventsLink}>
            See our events <br />
            at the bar
          </Link>
        </div>
        <HeroImage />
      </section>
    </Wrapper>
  );
}
