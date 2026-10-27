import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Input.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { getPlaceholder } from '@/components/shared/Form/get-placeholder';

export default function Input({
  label = '',
  type,
  min,
  id,
  value,
  error,
  classNames,
  handleChange,
  labelClassNames = '',
  placeholder = '',
  required = false,
}) {
  const isDateInput = type === 'date';
  const shouldShowDatePlaceholder = isDateInput && !value;
  const handleAnimationStart = event => {
    if (event.animationName === 'autofill') {
      setShowCheckMark(true);
    }
    if (event.animationName === 'autofill-cancel') {
      setShowCheckMark(false);
    }
  };

  const [showCheckMark, setShowCheckMark] = useState(false);
  const handleBlur = () => {
    if (value) {
      setShowCheckMark(true);
    } else {
      setShowCheckMark(false);
    }
  };
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(styles.label, labelClassNames)}
        >
          {label}
        </label>
      )}
      {error && <p className={styles.error}>{error}</p>}
      <input
        type={type}
        min={min}
        id={id}
        name={id}
        onChange={handleChange}
        value={value}
        className={clsx(
          styles.input,
          shouldShowDatePlaceholder && styles.emptyDate,
          classNames,
        )}
        placeholder={getPlaceholder({ placeholder, label, required })}
        required={required}
        onBlur={handleBlur}
        onAnimationStart={handleAnimationStart}
      />
      {shouldShowDatePlaceholder && (
        <span className={styles.datePlaceholder} aria-hidden='true'>
          {getPlaceholder({ placeholder, label, required })}
        </span>
      )}
      {showCheckMark && !isDateInput && (
        <FontAwesomeIcon icon={faCheckCircle} className={styles.check} />
      )}
    </div>
  );
}
