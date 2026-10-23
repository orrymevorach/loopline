import styles from './HoursOfOperations.module.scss';
import { getPhoneHref } from './utils';

export default function HoursOfOperations({ hoursOfOperations = [] }) {
  if (!hoursOfOperations.length) return null;

  return (
    <section className={styles.section} aria-label='Hours and location'>
      <div className={styles.panel}>
        {hoursOfOperations.map(operation => (
          <div className={styles.operation} key={operation.id}>
            <h2 className={styles.title}>{operation.title}</h2>
            {operation.details.map(detail => {
              const phoneHref = getPhoneHref(detail);

              return (
                <p className={styles.detail} key={detail}>
                  {phoneHref ? (
                    <a className={styles.phoneLink} href={phoneHref}>
                      {detail}
                    </a>
                  ) : (
                    detail
                  )}
                </p>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
