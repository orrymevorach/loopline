import { getPhoneHref } from '@/components/HomePage/HoursOfOperations/utils';
import { BUSINESS } from '@/utils/constants';
import styles from './VisitUs.module.scss';

const MAP_QUERY = encodeURIComponent(
  `Loopline, ${BUSINESS.address.streetAddress}, ${BUSINESS.address.addressLocality}, ${BUSINESS.address.addressRegion}`,
);
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`;

export default function VisitUs({ hoursOfOperations = [] }) {
  return (
    <section className={styles.section} aria-labelledby='visit-us-title'>
      <h2 className={styles.title} id='visit-us-title'>
        Visit Us
      </h2>
      <div className={styles.grid}>
        <div className={styles.details}>
          {hoursOfOperations.map(operation => (
            <div className={styles.operation} key={operation.id}>
              <h3 className={styles.operationTitle}>{operation.title}</h3>
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
        <iframe
          className={styles.map}
          src={MAP_EMBED_URL}
          title='Map showing Loopline at 643 Dupont Street, Toronto'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        />
      </div>
    </section>
  );
}
