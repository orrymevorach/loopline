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

// Matches pasted URLs and Instagram-style @handles. The lookbehind skips
// email addresses such as hello@loopline.ca, and handles cannot end in a dot
// so sentence punctuation stays outside the link.
const plainTextLinkPattern =
  /((?:https?:\/\/|www\.)[^\s<]+[^\s<.,;:!?)\]'"]|(?<![\w@/.])@[A-Za-z0-9_](?:[A-Za-z0-9._]*[A-Za-z0-9_])?)/gi;

const getInstagramHref = handle =>
  `https://www.instagram.com/${handle.slice(1)}/`;

const getLinkHref = uri => {
  if (uri.startsWith('@')) return getInstagramHref(uri);
  if (uri.startsWith('www.')) return `https://${uri}`;
  return uri;
};

const getHyperlinkText = node =>
  node.content.map(childNode => childNode.value || '').join('');

const getIsInternalLink = href => href.startsWith('/') || href.startsWith('#');

const InlineLink = ({ uri, children }) => {
  const href = getLinkHref(uri);
  const isInternalLink = getIsInternalLink(href);

  return (
    <Link
      href={href}
      className={styles.inlineLink}
      target={isInternalLink ? undefined : '_blank'}
      rel={isInternalLink ? undefined : 'noreferrer'}
    >
      {children}
    </Link>
  );
};

// Turn pasted URLs and @handles in plain text into clickable links, so editors
// do not have to add a Contentful hyperlink for each one in an event description.
const getLinkedTextSegments = (textSegment, lineIndex) =>
  textSegment.split(plainTextLinkPattern).map((textPart, partIndex) => {
    const isLinkText = partIndex % 2 === 1;

    if (!isLinkText) return textPart;

    return (
      <InlineLink key={`url-${lineIndex}-${partIndex}`} uri={textPart}>
        {textPart}
      </InlineLink>
    );
  });

// Use inside paragraph copy, such as event descriptions, where links should
// sit inline with the text instead of rendering as block CTA links.
export const inlineLinkRichTextConfig = {
  ...sharedRichTextConfig,
  renderNode: {
    ...sharedRichTextConfig.renderNode,
    // Render the link text without auto-linking, so an explicit Contentful
    // link such as "@bordheaux" keeps its own URL and is not nested in a
    // second Instagram link.
    [INLINES.HYPERLINK]: node => (
      <InlineLink uri={node.data.uri}>{getHyperlinkText(node)}</InlineLink>
    ),
  },
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [
        ...children,
        index > 0 && <br key={`line-break-${index}`} className={styles.margin} />,
        ...getLinkedTextSegments(textSegment, index),
      ];
    }, []);
  },
};
