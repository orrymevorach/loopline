import clsx from 'clsx';
import Link from 'next/link';
import styles from './NavDropdownLinks.module.scss';

export default function NavDropdownLinks({
  links,
  isMobile = false,
  onNavigate,
}) {
  return links.map(link => (
    <li key={link.label}>
      <Link
        href={link.path}
        className={clsx(styles.link, isMobile && styles.mobileLink)}
        target={link.isExternal ? '_blank' : undefined}
        onClick={onNavigate}
      >
        {link.label}
      </Link>
    </li>
  ));
}
