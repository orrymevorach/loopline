import Link from 'next/link';
import Hero from '@/components/shared/Hero/Hero';
import styles from './BottleShopHero.module.scss';

export default function BottleShopHero() {
  return (
    <Hero
      src='/wine/bottle-shop-hero.jpg'
      width={2683}
      height={4096}
      imageHeight='301.34%'
      imageTop='-139.22%'
      aspectRatio='1024 / 519'
      priority
    >
      <Link href='/wine' className={styles.link}>
        Bottle Shop
      </Link>
      <h1 className={styles.title}>
        This is not a wall of labels.
        <br />
        This is a collection of stories.
      </h1>
    </Hero>
  );
}
