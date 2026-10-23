'use client';

import { init } from '@contentful/app-sdk';
import { useEffect, useMemo, useState } from 'react';
import styles from './StaffPickField.module.scss';

export default function StaffPickField() {
  const [fieldApi, setFieldApi] = useState(null);
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedGuid, setSelectedGuid] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  function getItemImage(item) {
    const image = item.image;
    const firstImage = item.images?.[0];
    const imageUrl =
      item.imageUrl ||
      (typeof image === 'string' ? image : image?.url) ||
      (typeof firstImage === 'string' ? firstImage : firstImage?.url);

    return typeof imageUrl === 'string' ? imageUrl : null;
  }

  async function handleSelectItem(itemGuid) {
    if (!fieldApi || isSaving) return;

    setIsSaving(true);
    setErrorMessage('');

    try {
      await fieldApi.setValue(itemGuid);
      setSelectedGuid(itemGuid);
      setSearchText('');
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Failed to save Toast staff pick:', error);
      setErrorMessage('Could not save this staff pick. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={styles.container}>
      <button
        aria-expanded={isDropdownOpen}
        className={styles.selectButton}
        disabled={!isSdkReady || isLoading}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        type='button'
      >
        {selectedItem && getItemImage(selectedItem) && (
          <img
            alt=''
            className={styles.selectedImage}
            src={getItemImage(selectedItem)}
          />
        )}
        <span>{selectedItem?.name || selectedGuid || 'Select a bottle'}</span>
      </button>

      {isLoading && <p className={styles.status}>Loading bottles…</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <input
            aria-label='Search bottles'
            autoFocus
            className={styles.search}
            onChange={event => setSearchText(event.target.value)}
            placeholder='Search bottles'
            type='search'
            value={searchText}
          />
          <ul className={styles.options}>
            {selectedGuid && (
              <li className={styles.option} key='clear-selection'>
                <button
                  className={styles.optionButton}
                  disabled={isSaving}
                  onClick={() => handleSelectItem(undefined)}
                  type='button'
                >
                  Clear selection
                </button>
              </li>
            )}
            {matchingItems.map(item => {
              const imageUrl = getItemImage(item);

              return (
                <li className={styles.option} key={item.guid}>
                  <button
                    className={styles.optionButton}
                    disabled={isSaving}
                    onClick={() => handleSelectItem(item.guid)}
                    type='button'
                  >
                    {imageUrl && (
                      <img
                        alt=''
                        className={styles.optionImage}
                        loading='lazy'
                        src={imageUrl}
                      />
                    )}
                    <span>{item.name}</span>
                  </button>
                </li>
              );
            })}
            {!matchingItems.length && (
              <li className={styles.empty}>No matching bottles.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
