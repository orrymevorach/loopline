import clsx from 'clsx';
import styles from './Slide.module.scss';
import Button from '@/components/shared/Button/Button';

const variantClassNames = {
  outgoing: 'slideOutgoing',
  incoming: 'slideIncoming',
};

export default function Slide({
  slideData,
  variant,
  showControls,
  slides,
  activeSlide,
  transitionPhase,
  changeSlide,
}) {
  return (
    <div
      className={clsx(styles.slide, styles[variantClassNames[variant]])}
      style={{
        backgroundImage: `url(${slideData.image})`,
        backgroundSize: slideData.size,
        backgroundPosition: slideData.position,
      }}
    >
      <div className={styles.scrim} />
      <div className={styles.content}>
        <h1>{slideData.title}</h1>
        <div className={styles.actions}>
          {slideData.actions.map(({ label, ...buttonProps }) => (
            <Button key={label} {...buttonProps}>
              {label}
            </Button>
          ))}
        </div>
      </div>

      {showControls && (
        <div className={styles.dots} aria-label='Choose a slide'>
          {slides.map((item, index) => (
            <button
              className={index === activeSlide ? styles.activeDot : styles.dot}
              key={item.image}
              type='button'
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === activeSlide ? 'true' : undefined}
              disabled={transitionPhase !== 'idle'}
              onClick={() => changeSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
