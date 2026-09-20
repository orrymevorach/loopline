import styles from './HoursAndOperations.module.scss';

const operations = [
  {
    title: '643 Dupont Street',
    details: ['Toronto'],
  },
  {
    title: 'Bottle Shop Hours',
    details: ['Tuesday - Saturday', '11am - 10pm'],
  },
  {
    title: 'Wine Bar Hours',
    details: ['Tuesday - Saturday', '4pm - 10pm'],
  },
];

export default function HoursAndOperations() {
  return (
    <section className={styles.section} aria-label='Hours and location'>
      <div className={styles.panel}>
        {operations.map(operation => (
          <div className={styles.operation} key={operation.title}>
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
