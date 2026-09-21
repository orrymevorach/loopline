import Link from 'next/link';
import Wrapper from '../shared/Wrapper/Wrapper';
import MenuLinks from './MenuLinks/MenuLinks';
import Actions from './Actions/Actions';
import FramedImage from '../shared/FramedImage/FramedImage';
import SplitSection from '../shared/SplitSection/SplitSection';
import styles from './WineBar.module.scss';

export default function WineBar() {
  return (
    <Wrapper>
      <SplitSection
        isTopAligned
        media={
          <FramedImage
            src='/wine-bar-hero.jpg'
            alt='Shelves of wine bottles at the Loopline wine bar'
            width={2683}
            height={4096}
            imageHeight='181.67%'
            imageTop='-74.89%'
            imageLeft='-4.2%'
            imageWidth='104.2%'
            aspectRatio='716 / 618'
            classNames={styles.image}
            priority
          />
        }
      >
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
      </SplitSection>
    </Wrapper>
  );
}
