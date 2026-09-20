import styles from './PasswordProtectionTakeover.module.scss';
import { useState } from 'react';
import Input from '@/components/shared/Input/Input';
// import { ErrorMessage } from 'components/checkout/checkout-shared-components';
import Takeover from '@/components/shared/Takeover/Takeover';
import Button from '@/components/shared/Button/Button';

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
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <Input
          id='password'
          label='Enter password'
          labelClassNames={styles.label}
          type='password'
          value={password}
          handleChange={handleChange}
          required
        />
        <Button>Submit</Button>
      </form>
    </Takeover>
  );
}
