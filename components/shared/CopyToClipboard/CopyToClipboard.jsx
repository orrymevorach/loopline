import { useState } from 'react';
import styles from './CopyToClipboard.module.scss';
import clsx from 'clsx';

export default function CopyToClipboard({ children, classNames = {}, text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button onClick={handleCopy} className={clsx(styles.container, classNames)}>
      {children} {copied && <span className={styles.copied}>Copied</span>}
    </button>
  );
}
