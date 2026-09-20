import Link from 'next/link';
import styles from './RichText.module.scss';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

export const sharedRichTextConfig = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className={styles.richText}>{children}</p>;
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <Link
        href={node.data.uri}
        className={styles.link}
        target='_blank'
        rel='noreferrer'
      >
        {children}
      </Link>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className={styles.unorderedList}>{children}</ul>
    ),
    // [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,

    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className={styles.orderedList}>{children}</ol>
    ),
    [MARKS.UNDERLINE]: (node, children) => (
      <span className={styles.underline}>{children}</span>
    ),
    [MARKS.ITALIC]: (node, children) => (
      <i className={styles.italic}>{children}</i>
    ),
    [BLOCKS.HEADING_1]: (node, children) => {
      return <h1 className={styles.title}>{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <h2 className={styles.title}>{children}</h2>;
    },
  },
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [
        ...children,
        index > 0 && <br key={`line-break-${index}`} className={styles.margin} />,
        textSegment,
      ];
    }, []);
  },
};
