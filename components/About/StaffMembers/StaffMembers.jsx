import Image from 'next/image';
import clsx from 'clsx';
import RichText from '@/components/shared/RichText/RichText';
import logo from 'public/logo.png';
import styles from './StaffMembers.module.scss';

export default function StaffMembers({ staffMembers = [] }) {
  if (!staffMembers.length) return null;

  return (
    <section className={styles.section} aria-labelledby='staff-members-title'>
      <h2 className={styles.title} id='staff-members-title'>
        Our Team
      </h2>
      <div className={styles.list}>
        {staffMembers.map(({ id, anchor, name, description, image, wine }) => (
          <article className={styles.member} id={anchor} key={id}>
            <div className={styles.staffTile}>
              <Image
                className={clsx(styles.image, !image && styles.placeholder)}
                src={image?.src || logo}
                alt={image ? image.alt || name : 'Loopline logo'}
                width={image?.width || 600}
                height={image?.height || 600}
              />
              {name && <h3 className={styles.name}>{name}</h3>}
              {description && (
                <RichText classNames={styles.description} json={description} />
              )}
            </div>
            <div className={styles.wineTile}>
              <h3 className={styles.name}>{name}'s Pick</h3>
              {wine ? (
                <>
                  <Image
                    className={clsx(styles.wineImage, !wine.image && styles.placeholder)}
                    src={wine.image || logo}
                    alt={wine.image ? wine.name : 'Loopline logo'}
                    width={600}
                    height={600}
                    unoptimized={Boolean(wine.image)}
                  />
                  <h4 className={styles.wineName}>{wine.name}</h4>
                  {wine.price && <p className={styles.price}>{wine.price}</p>}
                  {wine.details.Description && (
                    <p className={styles.description}>{wine.details.Description}</p>
                  )}
                </>
              ) : (
                <p className={styles.description}>No wine pick available yet.</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
