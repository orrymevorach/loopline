'use client';

import { init } from '@contentful/app-sdk';
import { useEffect, useMemo, useState } from 'react';
import styles from './StaffPickField.module.scss';

export default function StaffPickField() {
  const [fieldApi, setFieldApi] = useState(null);
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedGuid, setSelectedGuid] = useState('');
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize the field SDK so the widget reflects and updates the Staff Member entry.
  useEffect(() => {
    let isMounted = true;

    init(sdk => {
      if (!isMounted) return;

      setFieldApi(sdk.field);
      setSelectedGuid(sdk.field.getValue() || '');
      sdk.field.onValueChanged(value => {
        if (isMounted) setSelectedGuid(value || '');
      });
      sdk.window.startAutoResizer();
      setIsSdkReady(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Load Toast menu items so editors can search and select a bottle.
  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      try {
        const response = await fetch('/api/toast/products');
        if (!response.ok) {
          throw new Error(`Toast products request failed: ${response.status}`);
        }

        const result = await response.json();
        if (!Array.isArray(result.items)) {
          throw new Error('Toast products response did not include an item list.');
        }

        if (isMounted) setItems(result.items);
      } catch (error) {
        console.error('Failed to load Toast products for staff pick field:', error);
        if (isMounted) {
          setErrorMessage('Could not load Toast products. Please try again later.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadItems();

    return () => {
      isMounted = false;
    };
  }, []);

  const matchingItems = useMemo(() => {
    const normalizedSearchText = searchText.trim().toLowerCase();

    return items
      .filter(
        item =>
          typeof item.guid === 'string' &&
          typeof item.name === 'string' &&
          item.name.toLowerCase().includes(normalizedSearchText),
      )
      .slice(0, 30);
  }, [items, searchText]);

  const selectedItem = items.find(item => item.guid === selectedGuid);

  async function handleSelectItem(itemGuid) {
    if (!fieldApi || isSaving) return;

    setIsSaving(true);
    setErrorMessage('');

    try {
      await fieldApi.setValue(itemGuid);
      setSelectedGuid(itemGuid);
    } catch (error) {
      console.error('Failed to save Toast staff pick:', error);
      setErrorMessage('Could not save this staff pick. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor='staff-pick-search'>
        Search Toast bottles
      </label>
      <input
        className={styles.input}
        disabled={!isSdkReady || isLoading}
        id='staff-pick-search'
        onChange={event => setSearchText(event.target.value)}
        placeholder='Type a bottle name'
        type='search'
        value={searchText}
      />

      {selectedGuid && (
        <div className={styles.selection}>
          <p className={styles.selectionLabel}>Selected bottle</p>
          <p className={styles.selectedItem}>
            {selectedItem?.name || selectedGuid}
          </p>
          <button
            className={styles.clearButton}
            disabled={!isSdkReady || isSaving}
            onClick={() => handleSelectItem(undefined)}
            type='button'
          >
            Clear selection
          </button>
        </div>
      )}

      {isLoading && <p className={styles.status}>Loading Toast bottles…</p>}
      {!isLoading && !errorMessage && matchingItems.length === 0 && (
        <p className={styles.status}>No matching bottles found.</p>
      )}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <ul className={styles.results}>
        {matchingItems.map(item => (
          <li className={styles.result} key={item.guid}>
            <button
              className={styles.resultButton}
              disabled={!isSdkReady || isSaving}
              onClick={() => handleSelectItem(item.guid)}
              type='button'
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
