import styles from './Loader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Image from 'next/image';
import logoIcon from 'public/logo-icon.png';

export default function Loader({
  isDotted = false,
  isRing = false,
  size = '2xl',
  classNames = '',
  color = 'black',
  isFullPage = false,
}) {
  if (isDotted) {
    return (
      <div
        className={clsx(
          styles['lds-ring'],
          classNames,
          isFullPage && styles.isFullPage
        )}
      >
        <FontAwesomeIcon
          icon={faSpinner}
          className={styles.dottedIcon}
          size={size}
          color={color}
        />
      </div>
    );
  }
  if (isRing)
    return (
      <div
        className={clsx(
          styles['lds-ring'],
          isFullPage && styles.isFullPage,
          classNames
        )}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  return (
    <div
      className={clsx(
        styles['lds-ring'],
        isFullPage && styles.isFullPage,
        classNames,
        styles.pulse
      )}
    >
      <Image src={logoIcon} alt="Loader" className={styles.icon} />
    </div>
  );
}
