import Image from 'next/image';
import clsx from 'clsx';
import styles from './FramedImage.module.scss';

// The source photos are portrait, so the image is scaled up and shifted
// (imageHeight / imageTop / imageLeft / imageWidth) to match the crop in the
// Figma frame.
export default function FramedImage({
  src,
  alt = '',
  width,
  height,
  imageHeight,
  imageTop,
  imageLeft = '0%',
  imageWidth = '100%',
  aspectRatio,
  priority = false,
  classNames,
}) {
  return (
    <div
      className={clsx(styles.frame, classNames)}
      style={{
        '--frame-aspect-ratio': aspectRatio,
        '--frame-image-height': imageHeight,
        '--frame-image-top': imageTop,
        '--frame-image-left': imageLeft,
        '--frame-image-width': imageWidth,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={styles.image}
        priority={priority}
      />
    </div>
  );
}
