import Meta from '@/components/shared/Head/Head';
import Layout from '@/components/shared/Layout/Layout';
import {
  getEntryByField,
  getPageReferenceEntries,
} from '@/lib/contentful-server-utils';
import { CONTENTFUL_PAGE_IDS } from '@/utils/constants';
import Approach from '@/components/HomePage/Approach/Approach';
import AreasOfSupport from '@/components/HomePage/AreasOfSupport/AreasOfSupport';
import Testimonials from '@/components/HomePage/Testimonials/Testimonials';
import Wrapper from '@/components/shared/Wrapper/Wrapper';
import SplitHero from '@/components/shared/SplitHero/SplitHero';
import photo from '@/public/ava-bw.jpg';
import { ROUTES } from '@/utils/constants';

export default function Index({ entries }) {
  const [areasOfSupport, testimonials] = entries;
  return (
    <>
      <Meta />
      <Layout>
        <Wrapper>
          <SplitHero
            isImageLeft={false}
            imageSrc={photo}
            imageAlt='Mentor portrait'
            heading={
              <>
                The strongest version of <span>your</span> story
              </>
            }
            paragraph='An advisory practice guiding families across the journey from elementary to middle school, offering thoughtful, end-to-end support with insight and care.'
            buttonText='Get in Touch'
            buttonHref={ROUTES.CONTACT}
            overlayText={[
              'Led by educator and academic leader Ava Gilani',
              'Based in Los Angeles, CA',
            ]}
          />
          <Approach />
          <AreasOfSupport data={areasOfSupport} />
          <Testimonials data={testimonials} />
        </Wrapper>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const page = await getEntryByField({
    contentTypeId: 'page',
    fieldName: 'title',
    fieldValue: CONTENTFUL_PAGE_IDS.HOME,
  });

  const entries = await getPageReferenceEntries({ page });

  return {
    props: {
      entries,
    },
  };
}
