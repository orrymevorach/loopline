import Image from 'next/image';
import styles from './CalendarImage.module.scss';

export default function CalendarImage({ image }) {
  if (!image?.src) return null;

  return (
    <section className={styles.section}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width || 1774}
        height={image.height || 887}
        sizes='100vw'
        className={styles.image}
      />
    </section>
  );
}
