import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';
import Wrapper from '../Wrapper/Wrapper';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Wrapper></Wrapper>
    </footer>
  );
}
