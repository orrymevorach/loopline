import Link from 'next/link';
import Wrapper from '../shared/Wrapper/Wrapper';
import MenuLinks from './MenuLinks/MenuLinks';
import Actions from './Actions/Actions';
import SplitSection from '../shared/SplitSection/SplitSection';
import RichText from '../shared/RichText/RichText';
import { getParagraphRichTextConfig } from '../shared/RichText/rich-text-config';
import styles from './WineBar.module.scss';

const richTextConfig = getParagraphRichTextConfig(styles.text);

// Heading, copy and photo come from the Wine Bar Page's Page Intro in Contentful.
export default function WineBar({ menus, intro }) {
  return (
    <Wrapper>
      <SplitSection image={intro?.image} priority imageWidth={715}>
        <div className={styles.content}>
          {intro?.heading && (
            <h1 className={styles.title}>{intro.heading}</h1>
          )}
          {intro?.description && (
            <RichText
              json={intro.description}
              config={richTextConfig}
              classNames={styles.textContainer}
            />
          )}

          <MenuLinks menus={menus} />
          <Actions />
          <Link href='/events#events-gallery' className={styles.eventsLink}>
            See our events <br />
            at the bar
          </Link>
        </div>
      </SplitSection>
    </Wrapper>
  );
}
