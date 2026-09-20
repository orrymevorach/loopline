import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.pageNotFoundContainer}>
      <h2 className={styles.title}>Oh no! Something went wrong.</h2>
      <p className={styles.text}>
        Please <a href='/contact'>contact us</a> for support.
      </p>
    </div>
  );
}
