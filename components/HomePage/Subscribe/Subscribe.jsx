import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/shared/Button/Button';
import styles from './Subscribe.module.scss';

export default function Subscribe() {
  return (
    <section className={styles.section}>
      <div className={styles.imageWrapper}>
        <Image
          src='/wine.png'
          alt='A glass of rosé wine'
          fill
          sizes='(max-width: 850px) 100vw, 580px'
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <Image
          src='/brandmark.png'
          alt=''
          width={103}
          height={87}
          className={styles.brandmark}
        />
        <h2 className={styles.title}>
          Subscribe to <br />
          the Wine Club
        </h2>
        <p className={styles.description}>
          A monthly wine subscription filled with staff picks, limited drops,
          and member perks
        </p>
        <Link href='/wine-club' className={styles.learnMore}>
          Learn More
        </Link>
        <Button href='/wine-club'>Become a member</Button>
      </div>
    </section>
  );
}
