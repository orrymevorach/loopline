import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { WindowSizeProvider } from '@/context/window-size-context/window-size-context';
// import Loader from '@/components/shared/Loader/Loader';
// import useRouteChange from '@/hooks/useRouteChange';
import GoogleAnalytics from '@/components/shared/GoogleAnalytics/GoogleAnalytics';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  // const isRouteChanging = useRouteChange();
  // if (isRouteChanging) return <Loader isFullPage />;
  return (
    <>
      <GoogleAnalytics />
      <WindowSizeProvider>
        <Component {...pageProps} />
      </WindowSizeProvider>
    </>
  );
}
