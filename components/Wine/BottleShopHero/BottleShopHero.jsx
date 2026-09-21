import Image from 'next/image';
import Link from 'next/link';
import styles from './BottleShopHero.module.scss';

export default function BottleShopHero() {
  return (
    <section className={styles.hero}>
      <Image
        src='/wine/bottle-shop-hero.jpg'
        alt=''
        width={2683}
        height={4096}
        className={styles.image}
        priority
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <Link href='/wine' className={styles.link}>
          Bottle Shop
        </Link>
        <h1 className={styles.title}>
          This is not a wall of labels.
          <br />
          This is a collection of stories.
        </h1>
      </div>
    </section>
  );
}
