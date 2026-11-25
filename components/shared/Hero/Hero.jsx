import Image from 'next/image';
import clsx from 'clsx';
import styles from './Hero.module.scss';

// The image always covers the hero, cropped to fill whatever size the frame is.
export default function Hero({ image, priority, children }) {
  return (
    <section className={clsx(styles.hero)}>
      <Image
        src={image.src}
        alt=''
        width={image.width}
        height={image.height}
        className={styles.image}
        priority={priority}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>{children}</div>
    </section>
  );
}
