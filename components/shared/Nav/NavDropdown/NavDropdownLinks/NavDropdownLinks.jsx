import clsx from 'clsx';
import Link from 'next/link';
import styles from './NavDropdownLinks.module.scss';

export default function NavDropdownLinks({
  links,
  isMobile = false,
  onNavigate,
}) {
  return links.map(link => (
    <li key={link.path}>
      <Link
        href={link.path}
        className={clsx(styles.link, isMobile && styles.mobileLink)}
        onClick={onNavigate}
      >
        {link.label}
      </Link>
    </li>
  ));
}
