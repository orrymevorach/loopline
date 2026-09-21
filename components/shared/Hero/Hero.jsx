import Image from 'next/image';
import clsx from 'clsx';
import styles from './Hero.module.scss';

// The source photos are portrait, so the image is scaled up and shifted
// (imageHeight / imageTop) to match the crop in the Figma frame.
export default function Hero({
  src,
  width,
  height,
  imageHeight,
  imageTop,
  aspectRatio,
  priority = false,
  classNames,
  children,
}) {
  return (
    <section
      className={clsx(styles.hero, classNames)}
      style={{
        '--hero-aspect-ratio': aspectRatio,
        '--hero-image-height': imageHeight,
        '--hero-image-top': imageTop,
      }}
    >
      <Image
        src={src}
        alt=''
        width={width}
        height={height}
        className={styles.image}
        priority={priority}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>{children}</div>
    </section>
  );
}
