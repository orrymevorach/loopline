import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';
import Layout from '@/components/shared/Layout/Layout';
import Providers from './providers';

export const metadata = {
  title: 'Loopline',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
