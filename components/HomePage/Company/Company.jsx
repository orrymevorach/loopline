import Image from 'next/image';
import styles from './Company.module.scss';

export default function Company() {
  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <Image
          src='/cheese.gif'
          alt=''
          width={234}
          height={131}
          className={styles.cheese}
          unoptimized
        />
        <h2 className={styles.title}>
          Where <br />
          good wine <br />
          meets great <br />
          company
        </h2>
        <Image
          src='/wine-hand.gif'
          alt=''
          width={237}
          height={252}
          className={styles.wineHand}
          unoptimized
        />
      </div>
    </section>
  );
}
