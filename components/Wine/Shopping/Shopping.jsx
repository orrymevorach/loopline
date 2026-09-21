import Button from '@/components/shared/Button/Button';
import styles from './Shopping.module.scss';

export default function Shopping() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2 className={styles.title}>Shopping In-Store</h2>
        <p className={styles.subtitle}>Discovery is the point.</p>
        <p className={styles.text}>
          If you’re shopping in-store, expect conversation. We’ll ask what
          you’re cooking. We’ll ask what you usually drink. We’ll probably pour
          you something unexpected. Whether you want a Tuesday night pasta wine
          or something cellar-worthy, we’ll guide you without gatekeeping.
        </p>
        <p className={styles.text}>
          Visit us in store at <br />
          643 Dupont St
        </p>
      </div>
      <div className={styles.card}>
        <h2 className={styles.title}>Shopping Online</h2>
        <p className={styles.subtitle}>Clarity &amp; Curation.</p>
        <div className={styles.body}>
          <p className={styles.text}>
            If you’re shopping online, expect clarity and curation. We keep the
            selection tight on purpose. Every bottle earns its place. You’re not
            scrolling through thousands of SKUs. You’re choosing from a shelf
            that’s already been thoughtfully edited.
          </p>
          <ul className={styles.list}>
            <li>We focus on:</li>
            <li>Small production</li>
            <li>Sustainable and thoughtful farming</li>
            <li>Honest winemaking</li>
            <li>Balance over excess</li>
            <li>Wines meant for the table</li>
          </ul>
        </div>
        <Button href='#' isYellow classNames={styles.button}>
          Shop now
        </Button>
      </div>
    </section>
  );
}
