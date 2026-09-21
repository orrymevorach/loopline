import Link from 'next/link';
import Hero from '@/components/shared/Hero/Hero';
import styles from './BottleShopHero.module.scss';
import image from 'public/wine/bottle-shop-hero.jpg';

export default function BottleShopHero() {
  return (
    <Hero image={image} priority>
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
