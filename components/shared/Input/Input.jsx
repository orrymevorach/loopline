import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Input.module.scss';
import { TextField } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function Input({
  label = '',
  type,
  id,
  value,
  error,
  classNames,
  handleChange,
  labelClassNames = '',
  placeholder = '',
  required = false,
}) {
  const handleAnimationStart = event => {
    if (
      event.animationName === 'autofill' ||
      event.animationName === 'mui-auto-fill'
    ) {
      setShowCheckMark(true);
    }
    if (
      event.animationName === 'autofill-cancel' ||
      event.animationName === 'mui-auto-fill-cancel'
    ) {
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
      <label
        htmlFor={id}
        className={clsx(styles.label, labelClassNames, !label && styles.empty)}
      >
        {label || ''}
      </label>
      {error && <p className={styles.error}>{error}</p>}
      <TextField
        type={type}
        id={id}
        name={id}
        onChange={handleChange}
        value={value}
        className={clsx(styles.input, classNames)}
        size='small'
        placeholder={placeholder}
        required={required}
        onBlur={handleBlur}
        onAnimationStart={handleAnimationStart}
        sx={{
          '& .MuiOutlinedInput-root': {
            padding: 0,
            '& fieldset': {
              border: 'none',
            },
          },
        }}
      />
      {showCheckMark && (
        <FontAwesomeIcon icon={faCheckCircle} className={styles.check} />
      )}
    </div>
  );
}
