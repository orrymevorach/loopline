import TermsOfUse from '@/components/shared/Legal/TermsOfUse.jsx/TermOfUse';
import { buildMetadata } from '@/utils/seo';
import { ROUTES } from '@/utils/constants';

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'The terms that apply when you use the Loopline website.',
  path: ROUTES.TERMS_OF_USE,
});

export default function Page() {
  return <TermsOfUse />;
}
