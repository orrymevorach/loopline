import styles from './Dropdown.module.scss';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import clsx from 'clsx';

export default function Dropdown({
  heading,
  selectLabel,
  handleChange,
  options = [],
  classNames = '',
  currentSelection,
  showReset = false,
}) {
  return (
    <div className={styles.container}>
      <p className={styles.heading}>{heading}</p>
      <FormControl
        hiddenLabel
        fullWidth
        className={clsx(styles.dropdown, classNames)}
      >
        <InputLabel id="select-label">{selectLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentSelection}
          label="Age"
          onChange={e => handleChange(undefined, e.target.value)}
          className={styles.select}
          defaultValue={'hey dude'}
        >
          {options.map(({ label, value }) => {
            return (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            );
          })}
          {showReset && <MenuItem value={''}>Reset</MenuItem>}
        </Select>
      </FormControl>
    </div>
  );
}
