import Image from 'next/image';
import clsx from 'clsx';
import styles from './FramedImage.module.scss';

export default function FramedImage({ image, priority = false, classNames }) {
  return (
    <div className={clsx(styles.frame, classNames)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={styles.image}
        priority={priority}
      />
    </div>
  );
}
