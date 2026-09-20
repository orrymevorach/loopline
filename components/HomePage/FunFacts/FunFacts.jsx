'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './FunFacts.module.scss';

const facts = [
  'Loopline has over 150 wines on debut—from sustainable, estate-grown bottles to trending classics from both iconic and under-the-radar vineyards.',
];

export default function FunFacts() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex(i => (i - 1 + facts.length) % facts.length);
  const next = () => setIndex(i => (i + 1) % facts.length);

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <Image
          src='/fun-facts/melissa.svg'
          alt=''
          width={297}
          height={531}
          className={styles.illustration}
        />
        <div className={styles.text}>
          <h2 className={styles.title}>Fun Facts</h2>
          <p className={styles.fact}>{facts[index]}</p>
          <div className={styles.arrows}>
            <button
              type='button'
              className={styles.arrow}
              onClick={prev}
              aria-label='Previous fun fact'
            >
              ←
            </button>
            <button
              type='button'
              className={styles.arrow}
              onClick={next}
              aria-label='Next fun fact'
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
