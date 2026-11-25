import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google';
import Layout from '@/components/shared/Layout/Layout';
import JsonLd from '@/components/shared/JsonLd/JsonLd';
import { SITE_URL } from '@/utils/constants';
import { DEFAULT_SOCIAL, getBusinessJsonLd } from '@/utils/seo';
import Providers from './providers';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif-display',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Loopline',
    default: 'Loopline | Bottle Shop & Wine Bar in Toronto',
  },
  description:
    'Loopline is a neighbourhood bottle shop and wine bar at 643 Dupont Street in Toronto, pouring iconic and under-the-radar wines from small producers.',
  applicationName: 'Loopline',
  ...DEFAULT_SOCIAL,
  icons: {
    icon: '/brandmark.png',
    apple: '/brandmark.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' data-scroll-behavior='smooth'>
      <body
        className={`${plusJakartaSans.variable} ${dmSerifDisplay.variable}`}
        suppressHydrationWarning
      >
        <JsonLd data={getBusinessJsonLd()} />
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
