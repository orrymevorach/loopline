import React from 'react';
import styles from './HamburgerMenu.module.scss';
import clsx from 'clsx';

export default function HamburgerMenu({
  isOpen = false,
  setIsOpen,
  hamburgerMenuColor = '#2f2f2f',
  setSlideOut,
  slideOut,
}) {
  const backgroundColor = isOpen ? '#2f2f2f' : hamburgerMenuColor;
  const handleClick = () => {
    if (isOpen) {
      setSlideOut(true);
      setTimeout(() => {
        setIsOpen(false);
        setSlideOut(false);
      }, 200);
      return;
    }
    setIsOpen(true);
  };
  return (
    <button
      className={clsx(
        styles.hamburgerMenu,
        isOpen && !slideOut ? styles.open : ''
      )}
      onClick={handleClick}
    >
      <span style={{ backgroundColor }}></span>
      <span style={{ backgroundColor }}></span>
      <span style={{ backgroundColor }}></span>
      {/* <span style={{ backgroundColor }}></span> */}
    </button>
  );
}
