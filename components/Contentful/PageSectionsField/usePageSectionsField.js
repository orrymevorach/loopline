'use client';

import { useEffect, useRef, useState } from 'react';
import { getEntryId, getReferenceError, resolveSection } from './utils';

export default function usePageSectionsField() {
  const [sdk, setSdk] = useState(null);
  const [references, setReferences] = useState([]);
  const [rows, setRows] = useState([]);
  const [connectionError, setConnectionError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [retryVersion, setRetryVersion] = useState(0);
  const contentTypes = useRef(new Map());
  const requestVersion = useRef(0);

  // Connect only inside an iframe; detach the field listener and resizer on exit.
  useEffect(() => {
    let isActive = true;
    let unsubscribe;
    let connectedSdk;
    const timeout = window.setTimeout(() => {
      isActive = false;
      setConnectionError('Could not connect to Contentful. Reopen this field from Contentful or reload the editor.');
      setIsLoading(false);
    }, 10000);

    async function connect() {
      try {
        const { init, locations } = await import('@contentful/app-sdk');
        if (!isActive) return;
        if (window.self === window.top) {
          window.clearTimeout(timeout);
          setConnectionError('Open this editor from the Page reference field in Contentful. It is not a standalone website form.');
          setIsLoading(false);
          return;
        }
        init(fieldSdk => {
          if (!isActive) return;
          window.clearTimeout(timeout);
          if (!fieldSdk.location.is(locations.LOCATION_ENTRY_FIELD) ||
              fieldSdk.field.type !== 'Array' ||
              fieldSdk.field.items?.type !== 'Link' ||
              fieldSdk.field.items?.linkType !== 'Entry') {
            setConnectionError('Assign this app to an Entry field location on a multiple-entry reference field.');
            setIsLoading(false);
            return;
          }
          connectedSdk = fieldSdk;
          const receiveValue = value => {
            if (!isActive) return;
            requestVersion.current += 1;
            setRows([]);
            setIsLoading(true);
            setReferences(value);
            setRetryVersion(version => version + 1);
          };
          receiveValue(fieldSdk.field.getValue());
          unsubscribe = fieldSdk.field.onValueChanged(receiveValue);
          fieldSdk.window.startAutoResizer();
          setSdk(fieldSdk);
        });
      } catch (error) {
        if (!isActive) return;
        window.clearTimeout(timeout);
        console.error('Failed to initialize page sections field editor:', error);
        setConnectionError('Could not initialize the Contentful editor. Please reload the editor.');
        setIsLoading(false);
      }
    }
    connect();
    return () => {
      isActive = false;
      window.clearTimeout(timeout);
      unsubscribe?.();
      connectedSdk?.window.stopAutoResizer();
    };
  }, []);

  // Reload after field changes or retries without letting older lookups replace newer rows.
  useEffect(() => {
    if (!sdk) return;
    let isActive = true;
    const version = ++requestVersion.current;
    const links = Array.isArray(references) ? references : [];
    const entries = new Map();
    const requests = links.map(reference => {
      const key = getEntryId(reference);
      if (!entries.has(key)) {
        entries.set(key, resolveSection(sdk, reference, contentTypes.current));
      }
      return entries.get(key);
    });
    Promise.all(requests).then(results => {
      if (isActive && version === requestVersion.current) {
        setRows(results);
        setIsLoading(false);
      }
    });
    return () => { isActive = false; };
  }, [sdk, references, retryVersion]);

  return {
    sdk,
    rows,
    isLoading,
    error: connectionError || getReferenceError(references),
    retry: () => {
      requestVersion.current += 1;
      setRows([]);
      setIsLoading(true);
      setRetryVersion(version => version + 1);
    },
  };
}
