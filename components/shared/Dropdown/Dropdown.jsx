import styles from './Dropdown.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// heading is only present for the standalone "hero" usage of this dropdown.
export default function Dropdown({
  heading,
  selectLabel,
  id,
  value,
  handleChange,
  options = [],
  wrapperClassNames = '',
  selectClassNames = '',
  labelClassNames = '',
  placeholder = '',
  required = false,
  showReset = false,
  showCheckIcon = false,
}) {
  const isHero = Boolean(heading);
  const [showCheckMark, setShowCheckMark] = useState(false);

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

  const handleBlur = () => setShowCheckMark(Boolean(value));

  const normalizedOptions = options.map(option =>
    typeof option === 'string' ? { label: option, value: option } : option,
  );

  return (
    <div className={styles.container}>
      {heading && <p className={styles.heading}>{heading}</p>}
      <div
        className={clsx(
          styles.dropdown,
          isHero && styles.heroDropdown,
          wrapperClassNames,
        )}
      >
        {selectLabel && (
          <label
            htmlFor={id}
            className={clsx(
              styles.label,
              isHero && styles.heroLabel,
              labelClassNames,
            )}
          >
            {selectLabel}
          </label>
        )}
        <select
          id={id}
          value={value}
          required={required}
          onChange={e => handleChange(e.target.value)}
          onBlur={handleBlur}
          onAnimationStart={handleAnimationStart}
          className={clsx(
            styles.select,
            isHero && styles.heroSelect,
            selectClassNames,
          )}
        >
          {placeholder && (
            <option className={styles.option} value='' disabled>
              {placeholder}
            </option>
          )}
          {normalizedOptions.map(({ label, value: optionValue }) => (
            <option
              className={styles.option}
              key={optionValue}
              value={optionValue}
            >
              {label}
            </option>
          ))}
          {showReset && (
            <option className={styles.option} value=''>
              Reset
            </option>
          )}
        </select>
        {showCheckIcon && showCheckMark && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className={styles.check}
            color='#499048'
          />
        )}
      </div>
    </div>
  );
}
