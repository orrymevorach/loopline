import styles from './Checkbox.module.scss';
import clsx from 'clsx';

export default function Checkbox({
  label,
  id,
  value,
  checked,
  handleChange,
  classNames = '',
  labelClassNames = '',
}) {
  const handleToggleCheckbox = option => {
    handleChange(current =>
      current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option],
    );
  };
  return (
    <label htmlFor={id} className={clsx(styles.option, labelClassNames)}>
      <input
        type='checkbox'
        id={id}
        name={id}
        className={clsx(styles.checkbox, classNames)}
        checked={checked}
        onChange={() => handleToggleCheckbox(value ?? id)}
      />
      <span>{label}</span>
    </label>
  );
}
