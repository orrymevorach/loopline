import Image from 'next/image';
import clsx from 'clsx';
import styles from './SplitHero.module.scss';
import texture from '@/public/texture-overlay.png';
import Button from '@/components/shared/Button/Button';
import RichText from '../RichText/RichText';
import Reveal from '../Reveal/Reveal';

export default function SplitHero({
  isImageLeft = false,
  position = 'center',
  imageSrc,
  imageAlt = '',
  heading,
  headingTag = 'h2',
  paragraph,
  buttonText,
  buttonHref,
  overlayText,
  json = null,
  shouldReveal = false,
}) {
  const HeadingTag = headingTag;

  const overlayLines = Array.isArray(overlayText)
    ? overlayText
    : overlayText
      ? [overlayText]
      : [];

  const ParentDiv = shouldReveal ? Reveal : 'div';

  return (
    <ParentDiv>
      <div className={styles.container}>
        <div
          className={clsx(
            styles.imagePanel,
            isImageLeft ? styles.left : styles.right,
          )}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            // sizes='(max-width: 768px) 100vw, 50vw'
            className={clsx(
              styles.image,
              position === 'top' && styles.imageTop,
              position === 'right' && styles.imageRight,
            )}
            priority
            quality={100}
          />
          {overlayLines.length > 0 && <div className={styles.gradient} />}
          {overlayLines.length > 0 && (
            <div className={styles.caption}>
              {overlayLines.map(line => (
                <p key={line}>{line}</p>
              ))}
            </div>
          )}
        </div>

        <div
          className={clsx(
            styles.textPanel,
            isImageLeft ? styles.right : styles.left,
          )}
        >
          <Image
            src={texture}
            alt=''
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            loading='eager'
            className={styles.texture}
          />
          <div className={styles.textContainer}>
            {json ? (
              <RichText json={json} />
            ) : (
              <>
                <HeadingTag className={styles.heading}>{heading}</HeadingTag>
                <p className={styles.paragraph}>{paragraph}</p>
                {buttonText && buttonHref && (
                  <Button href={buttonHref}>{buttonText}</Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ParentDiv>
  );
}
