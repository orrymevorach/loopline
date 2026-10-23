'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import Button from '@/components/shared/Button/Button';
import styles from './StaffPicks.module.scss';

function PickCard({ name, price, pickedBy, staffHref, image, details }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const hasDetails = Object.keys(details).length > 0;

  return (
    <div className={clsx(styles.card, isFlipped && styles.flipped)}>
      <div className={styles.cardInner}>
        <div className={clsx(styles.face, styles.front)}>
          <div className={styles.imageWrapper}>
            <Link
              href={staffHref}
              className={styles.imageLink}
              aria-label={`${name}, picked by ${pickedBy}`}
              tabIndex={isFlipped ? -1 : 0}
            >
              {image && (
                <Image
                  src={image}
                  alt={name}
                  fill
                  unoptimized
                  sizes='(max-width: 850px) 90vw, 383px'
                  className={styles.image}
                />
              )}
            </Link>
            <button
                type='button'
                className={styles.flipButton}
                onClick={() => setIsFlipped(true)}
                aria-label={`See details for ${name}`}
                tabIndex={isFlipped ? -1 : 0}
              >
                <Image
                  src='/staff-picks/flip.svg'
                  alt=''
                  width={44}
                  height={32}
                />
            </button>
          </div>
          <div className={styles.info}>
            <Link
              href={staffHref}
              className={styles.pickedBy}
              tabIndex={isFlipped ? -1 : 0}
            >
              {pickedBy}
            </Link>
            <div className={styles.nameAndPrice}>
              <h3 className={styles.name}>
                <Link
                  href={staffHref}
                  className={styles.nameLink}
                  tabIndex={isFlipped ? -1 : 0}
                >
                  {name}
                </Link>
              </h3>
              {price && <p className={styles.price}>{price}</p>}
            </div>
            <Button href='/wine' isCream classNames={styles.buyButton}>
              Buy Now
            </Button>
          </div>
        </div>

        <div className={clsx(styles.face, styles.back)}>
          <button
            type='button'
            className={styles.flipButton}
            onClick={() => setIsFlipped(false)}
            aria-label={`Back to ${name}`}
            tabIndex={isFlipped ? 0 : -1}
          >
            <Image src='/staff-picks/flip.svg' alt='' width={44} height={32} />
          </button>
          <dl className={styles.details}>
            {!hasDetails && (
              <div className={styles.detail}>
                <dt>{name}</dt>
                <dd>Tasting details are not available yet.</dd>
              </div>
            )}
            {Object.entries(details).map(([label, value]) => (
              <div key={label} className={styles.detail}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <Button href='/wine' isCream classNames={styles.buyButton}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function StaffPicks({ picks = [] }) {
  if (!picks.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>Staff Picks</p>
        <h2 className={styles.title}>
          The bottles we’re reaching for.
          <br />
          <em>Curated by the team at Loopline.</em>
        </h2>
      </div>
      <div className={styles.cards}>
        {picks.map(pick => (
          <PickCard key={pick.id} {...pick} />
        ))}
      </div>
    </section>
  );
}
