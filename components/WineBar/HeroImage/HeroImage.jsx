import Image from 'next/image';
import styles from './HeroImage.module.scss';

export default function HeroImage() {
  return (
    <div className={styles.frame}>
      <Image
        src='/wine-bar-hero.jpg'
        alt='Shelves of wine bottles at the Loopline wine bar'
        width={2683}
        height={4096}
        className={styles.image}
        priority
      />
    </div>
  );
}
