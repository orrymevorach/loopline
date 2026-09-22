import styles from './HamburgerMenu.module.scss';
import clsx from 'clsx';

export default function HamburgerMenu({
  isOpen = false,
  onClick,
  color = '#2f2f2f',
  controls,
}) {
  return (
    <button
      type='button'
      className={clsx(styles.hamburgerMenu, isOpen && styles.open)}
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls={controls}
    >
      <span className={styles.barTop} style={{ backgroundColor: color }} />
      <span className={styles.barMiddle} style={{ backgroundColor: color }} />
      <span className={styles.barBottom} style={{ backgroundColor: color }} />
    </button>
  );
}
