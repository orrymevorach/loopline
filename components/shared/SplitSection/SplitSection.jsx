import clsx from 'clsx';
import styles from './SplitSection.module.scss';

export default function SplitSection({
  media,
  isTopAligned = false,
  classNames,
  children,
}) {
  return (
    <section
      className={clsx(styles.section, isTopAligned && styles.top, classNames)}
    >
      {children}
      {media}
    </section>
  );
}
