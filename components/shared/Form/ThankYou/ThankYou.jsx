import clsx from 'clsx';
import styles from './ThankYou.module.scss';

export default function ThankYou({ containerClassNames = {}, heading = '' }) {
  return (
    <div className={clsx(styles.container, containerClassNames)}>
      <h2 className={styles.thankYou}>
        {heading || 'Thank you for your submission!'}
      </h2>
      <p className={styles.paragrah}>
        Someone on our team will be in touch shortly.
      </p>
    </div>
  );
}
