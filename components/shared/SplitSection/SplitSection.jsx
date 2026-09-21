import clsx from 'clsx';
import styles from './SplitSection.module.scss';

export default function SplitSection({
  media,
  isTopAligned = false,
  gap = '144px',
  classNames,
  children,
}) {
  return (
    <section
      className={clsx(styles.section, isTopAligned && styles.top, classNames)}
      style={{ '--split-gap': gap }}
    >
      {children}
      {media}
    </section>
  );
}
