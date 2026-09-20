import styles from './Form.module.scss';
import Input from '@/components/shared/Input/Input';
import Textarea from '@/components/shared/Textarea/Textarea';
import Dropdown from '@/components/shared/Dropdown/Dropdown';
import Checkbox from '@/components/shared/Checkbox/Checkbox';
import checkboxStyles from '@/components/shared/Checkbox/Checkbox.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function Form({
  type,
  label,
  id,
  value,
  handleChange,
  dropdownItems = [],
  checkboxItems = [],
  placeholder = '',
  required = false,
  inputClassNames = '',
  labelClassNames = '',
  inputContainerClassNames = '',
  items = [],
}) {
  const [showCheckMark, setShowCheckMark] = useState(false);
  const Label = () => {
    return (
      <label className={clsx(styles.inputLabel, labelClassNames)} htmlFor={id}>
        {label}
        {required && <span className={styles.asterisk}>*</span>}
      </label>
    );
  };

  const handleAnimationStart = event => {
    if (event.animationName === 'autofill') {
      setShowCheckMark(true);
    }
    if (event.animationName === 'autofill-cancel') {
      setShowCheckMark(false);
    }
  };

  const handleBlur = () => {
    if (value) {
      setShowCheckMark(true);
    } else {
      setShowCheckMark(false);
    }
  };

  switch (type) {
    case 'dropdown':
      return (
        <div
          className={clsx(styles.formFieldContainer, inputContainerClassNames)}
        >
          <Dropdown
            id={id}
            value={value}
            handleChange={handleChange}
            options={dropdownItems}
            placeholder={placeholder || 'Select an option'}
            required={required}
            selectClassNames={styles.dropdown}
            showCheckIcon
          />
        </div>
      );
    case 'text':
      return (
        <div
          className={clsx(styles.formFieldContainer, inputContainerClassNames)}
        >
          <Input
            id={id}
            label={label}
            handleChange={e => handleChange(e.target.value)}
            placeholder={placeholder}
            value={value}
            classNames={inputClassNames}
            labelClassNames={labelClassNames}
            required={required}
          />
        </div>
      );
    case 'textarea':
      return (
        <div
          className={clsx(styles.formFieldContainer, inputContainerClassNames)}
        >
          <Textarea
            id={id}
            label={label}
            placeholder={placeholder}
            value={value}
            handleChange={e => handleChange(e.target.value)}
            classNames={inputClassNames}
            labelClassNames={labelClassNames}
            required={required}
          />
        </div>
      );
    case 'checkbox':
      return (
        <div
          className={clsx(styles.formFieldContainer, inputContainerClassNames)}
        >
          {label && (
            <p
              className={clsx(
                checkboxStyles.checkboxGroupLabel,
                labelClassNames,
              )}
            >
              {label}
            </p>
          )}
          <div className={checkboxStyles.checkboxList}>
            {checkboxItems.map(option => {
              const isChecked = Array.isArray(value)
                ? value.includes(option)
                : value === option;

              return (
                <Checkbox
                  key={option}
                  id={option}
                  value={option}
                  label={option}
                  checked={isChecked}
                  handleChange={handleChange}
                />
              );
            })}
          </div>
        </div>
      );
    case 'row':
      return (
        <div
          className={clsx(styles.row)}
          style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
        >
          {items.map((item, index) => (
            <Form key={index} {...item} />
          ))}
        </div>
      );
    case 'date':
      return (
        <div
          className={clsx(
            styles.formFieldContainer,
            styles.datePicker,
            inputContainerClassNames,
          )}
        >
          <Label label={label} id={id} required={required} />
          <input
            type='date'
            id={id}
            value={value}
            onChange={e => handleChange(e.target.value)}
            onBlur={handleBlur}
            onAnimationStart={handleAnimationStart}
            className={clsx(styles.input, styles.dateInput, inputClassNames)}
            required={required}
          />
          {showCheckMark && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={clsx(styles.check)}
              color='#499048'
            />
          )}
        </div>
      );
  }
}
