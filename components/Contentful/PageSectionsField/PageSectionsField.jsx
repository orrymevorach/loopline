'use client';

import { useState } from 'react';
import usePageSectionsField from './usePageSectionsField';
import styles from './PageSectionsField.module.scss';

export default function PageSectionsField() {
  const { sdk, rows, isLoading, error, retry } = usePageSectionsField();
  const [navigationError, setNavigationError] = useState('');

  async function handleEdit(entryId) {
    setNavigationError('');
    try {
      const response = await sdk.navigator.openEntry(entryId, {
        slideIn: { waitForClose: true },
      });
      if (!response.navigated) {
        setNavigationError('The section was not opened. Please try Edit again.');
      } else {
        retry();
      }
    } catch (error) {
      console.error('Failed to open editable page section:', { entryId }, error);
      setNavigationError('Could not open this section. Please try Edit again.');
    }
  }

  return (
    <section className={styles.container} aria-labelledby='page-sections-heading'>
      <h2 id='page-sections-heading' className={styles.heading}>Editable page content</h2>
      <p className={styles.description}>
        Select a section to edit its content. Page layout is managed by the website.
      </p>
      {error ? <p role='alert' className={styles.error}>{error}</p> : (
        <>
          {isLoading ? <p role='status'>Loading editable sections...</p> : (
            rows.length ? (
              <ul className={styles.list}>
                {rows.map((row, index) => (
                  <li className={styles.row} key={`${row.entryId || 'invalid'}-${index}`}>
                    <div className={styles.details}>
                      <p className={styles.name}>{row.name || row.entryId || 'Invalid reference'}</p>
                      {row.error ? (
                        <p role='alert' className={styles.error}>{row.error}</p>
                      ) : (
                        <p className={styles.type}>
                          {row.contentTypeName}{row.isUnpublished && ' - Unpublished'}
                        </p>
                      )}
                    </div>
                    {row.error ? (
                      <button type='button' className={styles.button} onClick={retry}>Retry</button>
                    ) : (
                      <button
                        type='button'
                        className={styles.button}
                        aria-label={`Edit ${row.name}`}
                        onClick={() => handleEdit(row.entryId)}
                      >
                        Edit
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : <p>No editable sections are linked to this page.</p>
          )}
          {navigationError && <p role='alert' className={styles.error}>{navigationError}</p>}
        </>
      )}
    </section>
  );
}
