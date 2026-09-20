import styles from './NavMenu.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import Wrapper from '../../Wrapper/Wrapper';

const navItems = [
  { path: ROUTES.OFFERINGS, label: 'Bottle Shop' },
  { path: '/wine-bar', label: 'Wine Bar' },
  { path: '/events', label: 'Events' },
  { path: '/wine-club', label: 'Wine Club' },
  { path: ROUTES.ABOUT, label: 'About' },
  { path: ROUTES.CONTACT, label: 'Contact' },
];

export default function NavMenu() {
  const router = useRouter();
  const currentPath = router.asPath.split('?')[0];
  const [isScrolledPastHalf, setIsScrolledPastHalf] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const halfViewport = window.innerHeight / 3;

      setIsScrolledPastHalf(scrollTop >= halfViewport);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={clsx(styles.navMenu, isScrolledPastHalf && styles.scrolled)}
    >
      <Wrapper classNames={styles.wrapper}>
        <Link href={ROUTES.HOME} className={styles.logoLink}>
          <Image
            src='/logo.png'
            alt='Loopline'
            className={styles.logo}
            width={310}
            height={103}
            unoptimized
          />
        </Link>
        <ul className={styles.listItems}>
          {navItems.map(item => {
            return (
              <li key={item.label}>
                <Link
                  href={item.path}
                  className={clsx(
                    styles.link,
                    currentPath === item.path && styles.activeLink,
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.actions}>
          <Link href={ROUTES.CONTACT} className={styles.reserve}>
            Reserve
          </Link>
          <Link
            href='/account'
            className={styles.iconLink}
            aria-label='Account'
          >
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Link
            href='/cart'
            className={styles.iconLink}
            aria-label='Shopping bag'
          >
            <FontAwesomeIcon icon={faBagShopping} />
            <span className={styles.cartCount}>2</span>
          </Link>
        </div>
      </Wrapper>
    </div>
  );
}
