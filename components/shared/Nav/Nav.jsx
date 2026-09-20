import styles from './Nav.module.scss';
import NavMenu from '@/components/shared/Nav/NavMenu/NavMenu';
import Wrapper from '../Wrapper/Wrapper';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Wrapper>
        <NavMenu />
      </Wrapper>
    </nav>
  );
}
