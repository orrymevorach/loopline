import Wine from '@/components/Wine/Wine';
import { buildMetadata } from '@/utils/seo';
import { ROUTES } from '@/utils/constants';

export const metadata = buildMetadata({
  title: 'Bottle Shop: Small-Producer Wine in Toronto',
  description:
    'Shop wines from small producers and farmers at the Loopline bottle shop on Dupont Street in Toronto. Visit in store, shop online, or get delivery through Uber Eats.',
  path: ROUTES.WINE,
});

export default function Page() {
  return <Wine />;
}
