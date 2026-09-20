import clsx from 'clsx';
import styles from './Border.module.scss';

export default function Border({
  children,
  classNames = '',
  hideBottom = false,
  hideLeft = false,
  hideRight = false,
  isSmall = false,
}) {
  return (
    <div className={clsx(styles.frame, isSmall && styles.small, classNames)}>
      <span className={styles.borderTop} aria-hidden />
      {!hideBottom && <span className={styles.borderBottom} aria-hidden />}
      {!hideLeft && <span className={styles.borderLeft} aria-hidden />}
      {!hideRight && <span className={styles.borderRight} aria-hidden />}
      <div className={clsx(styles.content)}>{children}</div>
    </div>
  );
}
