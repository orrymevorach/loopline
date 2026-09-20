import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CloseButton.module.scss';
import clsx from 'clsx';
import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function CloseButton({ handleClick, classNames = '' }) {
  return (
    <button
      onClick={handleClick}
      className={clsx(styles.closeButton, classNames)}
    >
      <FontAwesomeIcon icon={faTimesCircle} size="2xl" color="white" />
    </button>
  );
}
