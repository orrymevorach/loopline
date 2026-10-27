'use client';

import { useState } from 'react';
import clsx from 'clsx';
import usePageSectionsField from './usePageSectionsField';
import styles from './PageSectionsField.module.scss';

export default function PageSectionsField() {
  const { sdk, rows, hasLinkedSections, isLoading, error, retry } =
    usePageSectionsField();
  const [navigationError, setNavigationError] = useState('');

  async function handleEdit(entryId) {
    setNavigationError('');
    try {
      const response = await sdk.navigator.openEntry(entryId, {
        slideIn: { waitForClose: true },
      });
      if (!response.navigated) {
        setNavigationError(
          'The section was not opened. Please try Edit again.',
        );
      } else {
        retry();
      }
    } catch (error) {
      console.error(
        'Failed to open editable page section:',
        { entryId },
        error,
      );
      setNavigationError('Could not open this section. Please try Edit again.');
    }
  }

  return (
    <section className={styles.container} aria-label='Editable page content'>
      {error ? (
        <p role='alert' className={styles.error}>
          {error}
        </p>
      ) : (
        <>
          {isLoading ? (
            <p role='status'>Loading editable sections...</p>
          ) : rows.length ? (
            <ul className={styles.list}>
              {rows.map((row, index) => (
                <li
                  className={styles.row}
                  key={
                    row.placeholderId || `${row.entryId || 'invalid'}-${index}`
                  }
                >
                  <div className={styles.header}>
                    <p className={styles.type}>
                      {row.isWebsiteManaged
                        ? 'Website component'
                        : row.contentTypeName || 'Unavailable section'}
                    </p>
                    {row.isWebsiteManaged && (
                      <span
                        className={clsx(styles.status, styles.websiteManaged)}
                      >
                        Not editable
                      </span>
                    )}
                    {!row.error && !row.isWebsiteManaged && (
                      <span
                        className={clsx(
                          styles.status,
                          styles[row.status.toLowerCase()],
                        )}
                      >
                        {row.status}
                      </span>
                    )}
                    {row.isWebsiteManaged ? null : row.error ? (
                      <button
                        type='button'
                        className={styles.button}
                        onClick={retry}
                      >
                        Retry
                      </button>
                    ) : (
                      <button
                        type='button'
                        className={clsx(styles.button, styles.cardButton)}
                        aria-label={`Edit ${row.name}`}
                        onClick={() => handleEdit(row.entryId)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <div className={styles.details}>
                    <p className={styles.name}>
                      {row.name || row.entryId || 'Invalid reference'}
                    </p>
                    {row.description && (
                      <p className={styles.type}>{row.description}</p>
                    )}
                    {row.error && (
                      <p role='alert' className={styles.error}>
                        {row.error}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No editable sections are linked to this page.</p>
          )}
          {!isLoading && rows.length > 0 && !hasLinkedSections && (
            <p className={styles.type}>
              No editable sections are linked to this page.
            </p>
          )}
          {navigationError && (
            <p role='alert' className={styles.error}>
              {navigationError}
            </p>
          )}
        </>
      )}
    </section>
  );
}
