import ContactPage from '@/components/ContactPage/ContactPage';
import { buildMetadata } from '@/utils/seo';
import { ROUTES } from '@/utils/constants';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Loopline at 643 Dupont Street, Toronto. Call (416) 516-8059 or send us a message about wine, reservations or events.',
  path: ROUTES.CONTACT,
});

export default function Page() {
  return <ContactPage entries={[]} />;
}
