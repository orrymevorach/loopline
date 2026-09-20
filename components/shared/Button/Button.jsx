import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './Button.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import Underline from '../Underline/Underline';
// import arrow from 'public/arrow.png';
import Image from 'next/image';

const ButtonContents = ({ isLoading, children }) => {
  if (isLoading)
    return <FontAwesomeIcon icon={faSpinner} className={styles.spinnerIcon} />;
  return <span className={styles.text}>{children}</span>;
};

export default function Button({
  children,
  isLoading = false,
  isDisabled = false,
  href = null,
  handleClick = null,
  classNames = {},
  isAnchor = false,
  style = {},
  target = null,
  isNavy = false,
  isPurple = false,
  isCream = false,
}) {
  const classnames = clsx(
    styles.button,
    classNames,
    isNavy && styles.navy,
    isPurple && styles.purple,
    isCream && styles.cream,
  );
  const buttonProps = {
    isNavy,
    isLoading,
  };

  if (isAnchor) {
    return (
      <a href={href} className={classnames} style={style} target={target}>
        <ButtonContents {...buttonProps}>{children}</ButtonContents>
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classnames} style={style} target={target}>
        <ButtonContents {...buttonProps}>{children}</ButtonContents>
      </Link>
    );
  }
  if (handleClick) {
    return (
      <button
        className={classnames}
        disabled={isDisabled}
        onClick={handleClick}
        style={style}
      >
        <ButtonContents {...buttonProps}>{children}</ButtonContents>
      </button>
    );
  }
  return (
    <button
      className={classnames}
      type='submit'
      disabled={isDisabled}
      style={style}
    >
      <ButtonContents {...buttonProps}>{children}</ButtonContents>
    </button>
  );
}
