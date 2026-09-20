'use client';

import { WindowSizeProvider } from '@/context/window-size-context/window-size-context';
import GoogleAnalytics from '@/components/shared/GoogleAnalytics/GoogleAnalytics';

export default function Providers({ children }) {
  return (
    <WindowSizeProvider>
      <GoogleAnalytics />
      {children}
    </WindowSizeProvider>
  );
}
