import Image from 'next/image';
import Button from '@/components/shared/Button/Button';
import SplitSection from '@/components/shared/SplitSection/SplitSection';
import RichText from '@/components/shared/RichText/RichText';
import { getParagraphRichTextConfig } from '@/components/shared/RichText/rich-text-config';
import { EVENTS_GALLERY_ID } from '@/components/Events/EventsGallery/EventsGallery';
import styles from './EventsHero.module.scss';

const richTextConfig = getParagraphRichTextConfig(styles.text);

// Heading, copy and photo come from the page's Page Intro in Contentful.
// The button stays in code because it links to sections on the page.
export default function EventsHero({
  intro,
  actionHref = `#${EVENTS_GALLERY_ID}`,
  actionLabel = 'See current events',
  actionTarget = null,
}) {
  const isPageAnchor = actionHref.startsWith('#');

  return (
    <SplitSection imageWidth={745} image={intro?.image} priority>
      <div className={styles.content}>
        {intro?.heading && <h1 className={styles.title}>{intro.heading}</h1>}
        {intro?.description && (
          <RichText json={intro.description} config={richTextConfig} />
        )}
        <Button
          href={actionHref}
          target={actionTarget}
          isAnchor={isPageAnchor}
          isYellow
          classNames={styles.button}
        >
          {actionLabel}
          <Image
            src='/arrow-right.svg'
            alt=''
            width={14}
            height={9}
            className={styles.arrow}
          />
        </Button>
      </div>
    </SplitSection>
  );
}
