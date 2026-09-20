import styles from './Underline.module.scss';
import clsx from 'clsx';

export default function Underline({ classNames = {}, isDark = false }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='157'
      height='3.001'
      viewBox='0 0 157 3'
      fill='none'
      className={clsx(styles.underline, classNames)}
    >
      <path
        className={clsx(styles.underlinePath, isDark && styles.dark)}
        d='M157 1.30867L156.859 2.06442C156.541 2.22231 155.978 2.19472 155.491 2.21465C147.066 2.56263 133.461 2.115 124.599 2.02456C102.887 1.80075 81.865 1.46656 60.1162 1.7425C42.3435 1.96784 24.1982 2.80024 6.58919 2.98113C4.24435 3.00565 1.02701 3.12216 0 2.28363C0.0363542 2.10121 5.57128 1.58613 6.68917 1.48649C15.5141 0.695485 26.4158 0.57898 35.6134 0.401157C62.7382 -0.123115 91.0626 -0.077126 118.246 0.217202C131.179 0.356701 144.258 0.427217 156.995 1.3102L157 1.30867Z'
      />
    </svg>
  );
}
