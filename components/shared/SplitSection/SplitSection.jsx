import clsx from 'clsx';
import styles from './SplitSection.module.scss';
import Image from 'next/image';

export default function SplitSection({
  classNames,
  children,
  imageWidth,
  image,
  priority,
  justifyContent = 'space-between',
  alignItems = 'flex-start',
}) {
  return (
    <section
      className={clsx(styles.section, classNames)}
      style={{ justifyContent, alignItems }}
    >
      {children}
      <div
        style={{ '--image-width': `${imageWidth}px` }}
        className={clsx(styles.frame)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={styles.image}
          priority={priority}
        />
      </div>
    </section>
  );
}
