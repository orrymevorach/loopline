import SplitSection from '@/components/shared/SplitSection/SplitSection';
import RichText from '@/components/shared/RichText/RichText';
import styles from './AboutHero.module.scss';

export default function AboutHero({ description, image }) {
  if (!image) return null;

  return (
    <SplitSection imageWidth={615} image={image} priority>
      <div className={styles.content}>
        <h1 className={styles.title}>About</h1>
        {description && (
          <RichText json={description} classNames={styles.text} />
        )}
      </div>
    </SplitSection>
  );
}
