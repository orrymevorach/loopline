import styles from './Form.module.scss';
import { InputLabel, MenuItem, Select } from '@mui/material';
import Input from '@/components/shared/Input/Input';
import Textarea from '@/components/shared/Textarea/Textarea';
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
      <InputLabel className={clsx(styles.inputLabel, labelClassNames)} id={id}>
        {label}
        {required && <span className={styles.asterisk}>*</span>}
      </InputLabel>
    );
  };

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
          <Select
            required={required}
            id={`${id}-label`}
            value={value}
            className={styles.dropdown}
            onChange={e => handleChange(e.target.value)}
            onBlur={handleBlur}
            onAnimationStart={handleAnimationStart}
            displayEmpty
            sx={{
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiSelect-select': {
                padding: '0px', // Removes default padding
              },
              '& .MuiSelect-icon': {
                color: 'black', // Change arrow color
              },
              '&:focus-within': {
                outline: '2px solid #1976d2', // Chrome's default blue
                outlineOffset: '2px',
                borderRadius: '1px', // Adjust border radius
              },
            }}
          >
            <MenuItem value='' disabled>
              {placeholder || 'Select an option'}
            </MenuItem>
            {dropdownItems.map(item => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
          {showCheckMark && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={clsx(styles.check, styles.dropdownCheck)}
              color='#499048'
            />
          )}
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
