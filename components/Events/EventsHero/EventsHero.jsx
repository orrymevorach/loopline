import Image from 'next/image';
import Button from '@/components/shared/Button/Button';
import FramedImage from '@/components/shared/FramedImage/FramedImage';
import SplitSection from '@/components/shared/SplitSection/SplitSection';
import styles from './EventsHero.module.scss';

export default function EventsHero() {
  return (
    <SplitSection
      media={
        <FramedImage
          src='/events-hero.jpg'
          width={2731}
          height={4096}
          imageHeight='212.2%'
          imageTop='-63.31%'
          aspectRatio='746 / 527'
          classNames={styles.image}
          priority
        />
      }
    >
      <div className={styles.content}>
        <h1 className={styles.title}>Events</h1>
        <p className={styles.text}>
          At Loopline, our events are an extension of the table. From
          educational tastings and winemaker takeovers to themed dinners,
          thoughtful collaborations, and community nights, each gathering is
          designed to bring people together over something worth sharing.
        </p>
        <Button
          href='https://toast.app/r/loopline-bottle-shop-wine-bar-643-dupont-street/experiences'
          target='_blank'
          isYellow
          classNames={styles.button}
        >
          See current events
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
