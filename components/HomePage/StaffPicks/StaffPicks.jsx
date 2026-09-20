'use client';
import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Button from '@/components/shared/Button/Button';
import styles from './StaffPicks.module.scss';

const picks = [
  {
    name: 'Vincent Dancer ‘Les Perrieres’ Pommard',
    price: '$185',
    pickedBy: 'Wyatt’s Pick',
    image: '/staff-picks/bottle-1.png',
    details: {
      Winery: 'Vincent Dancer',
      Grapes: 'Pinot Noir',
      Region: 'France / Burgundy / Pommard',
      'Wine Style': 'Burgundy Rouge',
      'Alcohol Content': '13%',
    },
  },
  {
    name: 'Chateau Moulin Pey Labrie',
    price: '$97',
    pickedBy: 'Diana’s Pick',
    image: '/staff-picks/bottle-2.png',
    details: {
      Winery: 'Chateau Moulin Pey Labrie',
      Grapes: 'Merlot',
      Region: 'France / Bordeaux / Fronsac',
      'Wine Style': 'Bordeaux Rouge',
      'Alcohol Content': '14%',
    },
  },
  {
    name: 'San Pietro Barolo Riserva DOCG',
    price: '$149',
    pickedBy: 'Alexa’s Pick',
    image: '/staff-picks/bottle-3.png',
    details: {
      Winery: 'Viberti Giovanni',
      Grapes: 'Nebbiolo',
      Region: 'Italy / Northern Italy / Piemonte / Barolo',
      'Wine Style': 'Italian Barolo',
      'Alcohol Content': '14%',
    },
  },
];

function PickCard({ name, price, pickedBy, image, details }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={clsx(styles.card, isFlipped && styles.flipped)}>
      <div className={styles.cardInner}>
        <div className={clsx(styles.face, styles.front)}>
          <div className={styles.imageWrapper}>
            <Image
              src={image}
              alt={name}
              fill
              sizes='(max-width: 850px) 90vw, 383px'
              className={styles.image}
            />
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
            <p className={styles.pickedBy}>{pickedBy}</p>
            <div className={styles.nameAndPrice}>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.price}>{price}</p>
            </div>
          </div>
          <Button href='/wine' isCream classNames={styles.buyButton}>
            Buy Now
          </Button>
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

export default function StaffPicks() {
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
          <PickCard key={pick.name} {...pick} />
        ))}
      </div>
    </section>
  );
}
