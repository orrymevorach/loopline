import Image from 'next/image';
import RichText from '@/components/shared/RichText/RichText';
import styles from './StaffMembers.module.scss';

export default function StaffMembers({ staffMembers = [] }) {
  if (!staffMembers.length) return null;

  return (
    <section className={styles.section} aria-labelledby='staff-members-title'>
      <h2 className={styles.title} id='staff-members-title'>
        Our Team
      </h2>
      <div className={styles.list}>
        {staffMembers.map(({ id, name, description, image }) => (
          <article className={styles.member} key={id}>
            {image && (
              <Image
                className={styles.image}
                src={image.src}
                alt={image.alt || name}
                width={image.width || 600}
                height={image.height || 600}
              />
            )}
            {name && <h3 className={styles.name}>{name}</h3>}
            {description && (
              <RichText
                classNames={styles.description}
                json={description}
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
