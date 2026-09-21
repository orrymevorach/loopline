import Hero from '@/components/shared/Hero/Hero';
import styles from './ShopForTheCurious.module.scss';
import image from 'public//wine/shop-for-the-curious.jpg';

export default function ShopForTheCurious() {
  return (
    <Hero image={image}>
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
