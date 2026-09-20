import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';
import Wrapper from '../Wrapper/Wrapper';
import { ROUTES } from '@/utils/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Wrapper>
        <div className={styles.footerGrid}>
          <Image
            src='/brandmark.png'
            alt='Loopline'
            className={styles.mark}
            width={1501}
            height={1274}
          />

          <div className={styles.linkGroup}>
            <h3>Visit Us</h3>
            <Link href='/contact'>Store &amp; Location</Link>
            <Link href='/contact'>Reservations</Link>
            <Link href='/contact'>Private Events</Link>
            <Link href='/contact'>Delivery &amp; Pick Up</Link>
          </div>

          <div className={styles.linkGroup}>
            <h3>About</h3>
            <Link href={ROUTES.ABOUT}>Our Story</Link>
            <Link href='/careers'>Careers</Link>
            <Link href='/community'>Community</Link>
          </div>

          <div className={styles.linkGroup}>
            <h3>Dine &amp; Shop</h3>
            <Link href='/wine-bar'>Wine Bar</Link>
            <Link href={ROUTES.OFFERINGS}>Bottle Shop</Link>
            <Link href='/gift-cards'>Gift Cards</Link>
          </div>

          <div className={styles.linkGroup}>
            <h3>Support</h3>
            <Link href='/account'>Account</Link>
            <Link href='/contact'>Help &amp; FAQ</Link>
            <Link href='/shipping'>Shipping &amp; Returns</Link>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}
