import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';
import Wrapper from '../Wrapper/Wrapper';
import {
  BUSINESS,
  INSTAGRAM_URL,
  RESERVATION_URL,
  ROUTES,
  SHOP_URL,
  UBER_EATS_URL,
} from '@/utils/constants';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Loopline%2C+643+Dupont+Street%2C+Toronto%2C+ON';

export default function Footer() {
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
            <a href={RESERVATION_URL} target='_blank' rel='noopener'>
              Reservations
            </a>
            <Link href={ROUTES.EVENTS}>Upcoming Events</Link>
            <Link href={ROUTES.PRIVATE_EVENTS}>Private Events</Link>
            <a href={UBER_EATS_URL} target='_blank' rel='noopener'>
              Delivery
            </a>
          </div>

          <div className={styles.linkGroup}>
            <h3>About</h3>
            <Link href={ROUTES.ABOUT}>Our Story</Link>
            <Link href={`${ROUTES.ABOUT}#staff-members-title`}>Our Team</Link>
            <Link href={ROUTES.CONTACT}>Contact</Link>
          </div>

          <div className={styles.linkGroup}>
            <h3>Dine &amp; Shop</h3>
            <Link href={ROUTES.WINE_BAR}>Wine Bar</Link>
            <Link href={ROUTES.WINE}>Bottle Shop</Link>
            <a href={SHOP_URL} target='_blank' rel='noopener'>
              Shop Online
            </a>
          </div>

          <div className={styles.linkGroup}>
            <h3>Find Us</h3>
            <address className={styles.address}>
              <a
                href={MAPS_URL}
                target='_blank'
                rel='noopener'
                className={styles.addressLink}
              >
                {BUSINESS.address.streetAddress}
                <br />
                {BUSINESS.address.addressLocality},{' '}
                {BUSINESS.address.addressRegion}
              </a>
              <a href={`tel:${BUSINESS.phone}`}>(416) 516-8059</a>
            </address>
            <a href={INSTAGRAM_URL} target='_blank' rel='noopener'>
              Instagram
            </a>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}
