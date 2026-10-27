import styles from './NavMenu.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
import Wrapper from '@/components/shared/Wrapper/Wrapper';
import Button from '@/components/shared/Button/Button';
import HamburgerMenu from '@/components/shared/Nav/HamburgerMenu/HamburgerMenu';
import NavItem from '@/components/shared/Nav/NavItem/NavItem';
import useStopScroll from '@/hooks/useStopScroll';

const MOBILE_MENU_ID = 'mobile-nav-menu';

const eventLinks = [
  { path: '/private-events', label: 'Private Events' },
  { path: '/events', label: 'Upcoming Events' },
];

const shopLinks = labels =>
  labels.map(label => ({
    label,
    path: `${ROUTES.OFFERINGS}?category=${encodeURIComponent(label)}`,
  }));

const shopColumns = [
  {
    title: 'By Style',
    links: shopLinks(['Red', 'White', 'Rose', 'Orange', 'Sparkling']),
  },
  {
    title: 'By Country',
    links: shopLinks([
      'Argentina',
      'Austria',
      'Canada',
      'France',
      'Germany',
      'Hungary',
      'Italy',
    ]),
  },
  {
    title: 'By Grape',
    links: shopLinks([
      'Albarino / Alvarinho',
      'Barbera',
      'Cabernet Franc',
      'Carmenere',
      'Chardonnay',
      'Chenin Blanc',
      'Gamay',
    ]),
  },
  {
    title: 'Sips & Spirits',
    links: shopLinks(['Cocktails & Spirits', 'Beer, Ciders & Seltzers']),
  },
  {
    title: 'Extras',
    links: shopLinks(['Food', 'Gift Cards', 'Books']),
  },
];

const navItems = [
  {
    path: ROUTES.OFFERINGS,
    label: 'Bottle Shop',
    dropdown: { columns: shopColumns },
  },
  { path: '/wine-bar', label: 'Wine Bar' },
  { label: 'Events', dropdown: { links: eventLinks } },
  // { path: '/wine-club', label: 'Wine Club' },
  { path: ROUTES.ABOUT, label: 'About' },
  { path: ROUTES.CONTACT, label: 'Contact' },
];

export default function NavMenu() {
  const currentPath = usePathname();
  const closeActiveDropdownRef = useRef(null);
  const [isScrolledPastHalf, setIsScrolledPastHalf] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useStopScroll({ isOpen: isMobileMenuOpen });

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeDesktopDropdown = () => {
    closeActiveDropdownRef.current?.();
    closeActiveDropdownRef.current = null;
  };

  const handleDesktopItemActivate = closeDropdown => {
    closeDesktopDropdown();
    closeActiveDropdownRef.current = closeDropdown;
  };

  // Close dropdowns after navigation so the new page is not covered by the menu.
  useEffect(() => {
    closeMobileMenu();
    closeActiveDropdownRef.current?.();
    closeActiveDropdownRef.current = null;
  }, [currentPath]);

  // Shrink the navigation after the user scrolls past one third of the viewport.
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
      onMouseLeave={closeDesktopDropdown}
      onKeyDown={e => {
        if (e.key !== 'Escape') return;
        closeDesktopDropdown();
        closeMobileMenu();
      }}
    >
      <Wrapper classNames={styles.wrapper}>
        <Link href={ROUTES.HOME} className={styles.logoLink}>
          <Image
            src='/nav/wordmark.png'
            alt='Loopline'
            className={styles.logo}
            width={269}
            height={88}
            loading='eager'
          />
        </Link>
        <ul className={styles.listItems}>
          {navItems.map(item => (
            <NavItem
              key={item.label}
              item={item}
              currentPath={currentPath}
              onActivate={handleDesktopItemActivate}
            />
          ))}
          <li>
            <Button
              isNavy
              href='https://toast.app/r/loopline-bottle-shop-wine-bar-643-dupont-street'
              classNames={styles.reserve}
              target='_blank'
            >
              Reserve
            </Button>
          </li>
        </ul>
        <div className={styles.actions}>
          <Link
            href='/account'
            className={styles.iconLink}
            aria-label='Account'
          >
            <Image src='/nav/account.svg' alt='' width={22} height={24} />
          </Link>
          <Link
            href='/cart'
            className={styles.iconLink}
            aria-label='Shopping bag'
          >
            <Image src='/nav/cart.svg' alt='' width={29} height={28} />
          </Link>
          <div className={styles.hamburger}>
            <HamburgerMenu
              isOpen={isMobileMenuOpen}
              controls={MOBILE_MENU_ID}
              onClick={() =>
                isMobileMenuOpen ? closeMobileMenu() : setIsMobileMenuOpen(true)
              }
            />
          </div>
        </div>
      </Wrapper>
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu} id={MOBILE_MENU_ID}>
          <ul className={styles.mobileList}>
            {navItems.map(item => (
              <NavItem
                key={item.label}
                item={item}
                currentPath={currentPath}
                isMobile
                onNavigate={closeMobileMenu}
              />
            ))}
          </ul>
          <Button
            isNavy
            href={ROUTES.CONTACT}
            classNames={styles.mobileReserve}
          >
            Reserve
          </Button>
        </div>
      )}
    </div>
  );
}
