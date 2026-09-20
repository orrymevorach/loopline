import styles from './PasswordProtectionTakeover.module.scss';
import { useState } from 'react';
import Input from '@mui/joy/Input';
// import { ErrorMessage } from 'components/checkout/checkout-shared-components';
import Takeover from '@/components/shared/Takeover/Takeover';
import { Button } from '@mui/material';

export default function PasswordProtectionTakeover({
  setShowPasswordProtectionTakeover,
}) {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (password === 'halloumi2023') {
      setShowPasswordProtectionTakeover(false);
    } else {
      setErrorMessage('Incorrect password');
    }
  }

  function handleChange(e) {
    setErrorMessage('');
    setPassword(e.target.value);
  }
  return (
    <Takeover disableClose>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="password">
          Enter password
        </label>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <Input
          type="password"
          value={password}
          onChange={handleChange}
          required
        />
        <Button>Submit</Button>
      </form>
    </Takeover>
  );
}
