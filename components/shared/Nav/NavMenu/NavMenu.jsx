import styles from './NavMenu.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/constants';
import Border from '@/components/shared/Border/Border';

const navItems = [
  // { path: ROUTES.ABOUT, label: 'About' }
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
      <Border hideLeft hideRight hideBottom classNames={styles.border} />
      <Link href={ROUTES.HOME} className={styles.logoLink}>
        <Image
          src=''
          alt='Loopline'
          className={styles.logo}
          width={310}
          height={17}
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
    </div>
  );
}
