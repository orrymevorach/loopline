import styles from './Textarea.module.scss';
import clsx from 'clsx';
import { getPlaceholder } from '@/components/shared/Form/get-placeholder';

export default function Textarea({
  label = '',
  id,
  value,
  handleChange,
  classNames = '',
  containerClassNames = '',
  labelClassNames = '',
  placeholder = '',
  required = false,
}) {
  return (
    <div className={clsx(styles.container, containerClassNames)}>
      {label && (
        <label htmlFor={id} className={clsx(styles.label, labelClassNames)}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={handleChange}
        placeholder={getPlaceholder({ placeholder, label, required })}
        required={required}
        className={clsx(styles.textarea, classNames)}
      />
    </div>
  );
}
