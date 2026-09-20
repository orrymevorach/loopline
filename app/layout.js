import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Layout from '@/components/shared/Layout/Layout';
import Providers from './providers';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Loopline',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={plusJakartaSans.variable}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
