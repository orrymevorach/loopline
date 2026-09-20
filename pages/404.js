/* eslint-disable @next/next/no-html-link-for-pages */
import styles from './404.module.scss';
import Meta from '@/components/shared/Head/Head';

export default function PageNotFound() {
  return (
    <>
      <Meta title="Page Not Found" />
      <div className={styles.pageNotFoundContainer}>
        <h2 className={styles.title}>Oh no! Something went wrong.</h2>
        <p className={styles.text}>
          Please <a href="/contact">contact us</a> for support.
        </p>
      </div>
    </>
  );
}
