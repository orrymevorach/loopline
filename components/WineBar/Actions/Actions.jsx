import Button from '../../shared/Button/Button';
import { ROUTES } from '@/utils/constants';
import styles from './Actions.module.scss';

export default function Actions() {
  return (
    <div className={styles.actions}>
      <Button
        isYellow
        href='https://tables.toasttab.com/restaurants/2ac9f5bf-df0b-40df-92ad-dcfcb05f5ece/reserve?partySize=2&dateTime=2026-09-20T18:00:00.000-04:00'
        classNames={styles.button}
        target='_blank'
      >
        reserve a table
      </Button>
      <Button isYellow href={ROUTES.CONTACT} classNames={styles.button}>
        book a private event
      </Button>
    </div>
  );
}
