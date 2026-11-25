import Button from '../../shared/Button/Button';
import { RESERVATION_URL, ROUTES } from '@/utils/constants';
import styles from './Actions.module.scss';

export default function Actions() {
  return (
    <div className={styles.actions}>
      <Button
        isYellow
        href={RESERVATION_URL}
        classNames={styles.button}
        target='_blank'
      >
        reserve a table
      </Button>
      <Button
        isYellow
        href={ROUTES.BOOK_A_PRIVATE_EVENT}
        classNames={styles.button}
      >
        book a private event
      </Button>
    </div>
  );
}
