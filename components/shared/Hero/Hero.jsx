import Image from 'next/image';
import clsx from 'clsx';
import styles from './Hero.module.scss';

// The source photos are portrait, so the image is scaled up and shifted
// (imageHeight / imageTop) to match the crop in the Figma frame. If the
// photo is already cropped to the frame, these can be omitted.
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
