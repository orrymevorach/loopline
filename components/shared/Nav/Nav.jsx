import styles from './Nav.module.scss';
import NavMenu from '@/components/shared/Nav/NavMenu/NavMenu';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <NavMenu />
    </nav>
  );
}
