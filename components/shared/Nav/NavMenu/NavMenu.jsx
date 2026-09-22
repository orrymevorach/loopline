import styles from './NavMenu.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
import Wrapper from '../../Wrapper/Wrapper';
import Button from '@/components/shared/Button/Button';
import HamburgerMenu from '@/components/shared/Nav/HamburgerMenu/HamburgerMenu';
import useStopScroll from '@/hooks/useStopScroll';

const MOBILE_MENU_ID = 'mobile-nav-menu';

const navItems = [
  { path: ROUTES.OFFERINGS, label: 'Bottle Shop', hasDropdown: true },
  { path: '/wine-bar', label: 'Wine Bar' },
  { path: '/events', label: 'Events' },
  // { path: '/wine-club', label: 'Wine Club' },
  { path: ROUTES.ABOUT, label: 'About' },
  { path: ROUTES.CONTACT, label: 'Contact' },
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

export default function NavMenu() {
  const currentPath = usePathname();
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isScrolledPastHalf, setIsScrolledPastHalf] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);

  useStopScroll({ isOpen: isMobileMenuOpen });

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileShopOpen(false);
  };

  useEffect(() => {
    closeMobileMenu();
  }, [currentPath]);

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
      onMouseLeave={() => setIsShopOpen(false)}
      onKeyDown={e => {
        if (e.key !== 'Escape') return;
        setIsShopOpen(false);
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
          {navItems.map(item => {
            return (
              <li
                key={item.label}
                onMouseEnter={() => setIsShopOpen(!!item.hasDropdown)}
              >
                <Link
                  href={item.path}
                  className={clsx(
                    styles.link,
                    (currentPath === item.path ||
                      (item.hasDropdown && isShopOpen)) &&
                      styles.activeLink,
                  )}
                  onFocus={() => setIsShopOpen(!!item.hasDropdown)}
                  aria-expanded={item.hasDropdown ? isShopOpen : undefined}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <Image
                      src='/nav/chevron.svg'
                      alt=''
                      className={clsx(
                        styles.chevron,
                        isShopOpen && styles.chevronOpen,
                      )}
                      width={15}
                      height={8}
                    />
                  )}
                </Link>
              </li>
            );
          })}
          <li>
            <Button isNavy href={ROUTES.CONTACT} classNames={styles.reserve}>
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
              <li key={item.label} className={styles.mobileItem}>
                <div className={styles.mobileRow}>
                  <Link
                    href={item.path}
                    className={clsx(
                      styles.mobileLink,
                      currentPath === item.path && styles.activeLink,
                    )}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <button
                      type='button'
                      className={styles.mobileToggle}
                      onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                      aria-expanded={isMobileShopOpen}
                      aria-label={`${isMobileShopOpen ? 'Hide' : 'Show'} ${item.label} categories`}
                    >
                      <Image
                        src='/nav/chevron.svg'
                        alt=''
                        className={clsx(
                          styles.chevron,
                          isMobileShopOpen && styles.chevronOpen,
                        )}
                        width={15}
                        height={8}
                      />
                    </button>
                  )}
                </div>
                {item.hasDropdown && isMobileShopOpen && (
                  <div className={styles.mobileShop}>
                    {shopColumns.map(column => (
                      <div key={column.title} className={styles.column}>
                        <p className={styles.columnTitle}>{column.title}</p>
                        <ul className={styles.columnLinks}>
                          {column.links.map(link => (
                            <li key={link.label}>
                              <Link
                                href={link.path}
                                className={styles.dropdownLink}
                                onClick={closeMobileMenu}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Button isNavy href={ROUTES.CONTACT} classNames={styles.mobileReserve}>
            Reserve
          </Button>
        </div>
      )}
      {isShopOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownInner}>
            {shopColumns.map(column => (
              <div key={column.title} className={styles.column}>
                <p className={styles.columnTitle}>{column.title}</p>
                <ul className={styles.columnLinks}>
                  {column.links.map(link => (
                    <li key={link.label}>
                      <Link
                        href={link.path}
                        className={styles.dropdownLink}
                        onClick={() => setIsShopOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
