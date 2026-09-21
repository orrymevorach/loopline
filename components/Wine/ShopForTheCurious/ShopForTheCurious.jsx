import Hero from '@/components/shared/Hero/Hero';
import styles from './ShopForTheCurious.module.scss';

export default function ShopForTheCurious() {
  return (
    <Hero
      src='/wine/shop-for-the-curious.jpg'
      width={2730}
      height={4096}
      imageHeight='291.21%'
      imageTop='-32.92%'
      aspectRatio='1024 / 528'
    >
      <p className={styles.text}>
        This is a shop for the curious.
        <br />
        For the collectors.
        <br />
        For the weeknight drinkers.
      </p>
    </Hero>
  );
}
