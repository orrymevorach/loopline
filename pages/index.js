import HomePage from '@/components/HomePage/HomePage';
import Meta from '@/components/shared/Head/Head';
import Layout from '@/components/shared/Layout/Layout';
// import {
//   getEntryByField,
//   getPageReferenceEntries,
// } from '@/lib/contentful-server-utils';
import { CONTENTFUL_PAGE_IDS } from '@/utils/constants';

export default function Index({ entries = [] }) {
  return (
    <>
      <Meta />
      <Layout>
        <HomePage entries={entries} />
      </Layout>
    </>
  );
}

// export async function getStaticProps() {
//   const page = await getEntryByField({
//     contentTypeId: 'page',
//     fieldName: 'title',
//     fieldValue: CONTENTFUL_PAGE_IDS.HOME,
//   });

//   const entries = await getPageReferenceEntries({ page });

//   return {
//     props: {
//       entries,
//     },
//   };
// }
