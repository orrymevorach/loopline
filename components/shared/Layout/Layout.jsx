'use client';

import styles from './Layout.module.scss';
import Nav from '@/components/shared/Nav/Nav';
import Footer from '../Footer/Footer';
import Wrapper from '../Wrapper/Wrapper';

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      <Wrapper>
        <div className={styles.children}>{children}</div>
      </Wrapper>
      <Footer />
    </div>
  );
}
