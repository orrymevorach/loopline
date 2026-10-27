import PageSectionsField from '@/components/Contentful/PageSectionsField/PageSectionsField';

export const metadata = {
  title: 'Editable page content | Contentful',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PageSectionsField />;
}
