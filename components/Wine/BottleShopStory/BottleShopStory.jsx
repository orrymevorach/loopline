import Image from 'next/image';
import styles from './BottleShopStory.module.scss';

export default function BottleShopStory() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Image
          src='/wine/bottle-left.png'
          alt=''
          width={381}
          height={481}
          className={styles.leftImage}
        />
        <div className={styles.content}>
          <p>
            Our bottle shop is built around small producers, farmers, and
            winemakers who actually touch their vineyards. We look for wines
            with intention. Wines with a point of view. Wines that taste like
            where they come from.
          </p>
          <p>We don’t buy by brand recognition. We buy by conviction.</p>
          <p>
            You’ll find bottles made from old vines on limestone slopes, high
            elevation parcels tucked into alpine valleys, coastal vineyards
            shaped by wind and salt. You’ll find classics, but also bottles
            you’ve never heard of and will never forget.
          </p>
        </div>
        <Image
          src='/wine/bottle-right.png'
          alt=''
          width={333}
          height={536}
          className={styles.rightImage}
        />
      </div>
    </section>
  );
}
