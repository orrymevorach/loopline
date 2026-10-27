import styles from './Form.module.scss';
import Input from '@/components/shared/Input/Input';
import Textarea from '@/components/shared/Textarea/Textarea';
import Dropdown from '@/components/shared/Dropdown/Dropdown';
import Checkbox from '@/components/shared/Checkbox/Checkbox';
import checkboxStyles from '@/components/shared/Checkbox/Checkbox.module.scss';
import clsx from 'clsx';

export default function Form({
  type,
  inputType,
  min,
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
    case 'date':
      return (
        <div
          className={clsx(styles.formFieldContainer, inputContainerClassNames)}
        >
          <Input
            type={type === 'date' ? 'date' : inputType}
            min={min}
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
  }
}
