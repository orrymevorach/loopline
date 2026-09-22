import styles from './HoursOfOperations.module.scss';

export default function HoursOfOperations({ hoursOfOperations = [] }) {
  if (!hoursOfOperations.length) return null;

  return (
    <section className={styles.section} aria-label='Hours and location'>
      <div className={styles.panel}>
        {hoursOfOperations.map(operation => (
          <div className={styles.operation} key={operation.id}>
            <h2 className={styles.title}>{operation.title}</h2>
            {operation.details.map(detail => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
