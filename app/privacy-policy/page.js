import PrivacyPolicy from '@/components/shared/Legal/PrivacyPolicy/PrivacyPolicy';
import { buildMetadata } from '@/utils/seo';
import { ROUTES } from '@/utils/constants';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How Loopline collects, uses and protects your personal information.',
  path: ROUTES.PRIVACY_POLICY,
});

export default function Page() {
  return <PrivacyPolicy />;
}
