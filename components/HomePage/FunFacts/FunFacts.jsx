'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './FunFacts.module.scss';

export default function FunFacts({ funFacts }) {
  const facts = funFacts?.facts || [];
  const [index, setIndex] = useState(0);
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const pendingIndex = useRef(null);

  const changeFact = nextIndex => {
    if (transitionPhase !== 'idle') return;
    pendingIndex.current = nextIndex;
    setTransitionPhase('out');
  };

  const prev = () => changeFact((index - 1 + facts.length) % facts.length);
  const next = () => changeFact((index + 1) % facts.length);

  useEffect(() => {
    if (transitionPhase === 'idle') return undefined;

    const timeout = window.setTimeout(() => {
      if (transitionPhase === 'out') {
        setIndex(pendingIndex.current);
        setTransitionPhase('in');
      } else {
        setTransitionPhase('idle');
      }
    }, transitionPhase === 'out' ? 700 : 800);

    return () => window.clearTimeout(timeout);
  }, [transitionPhase]);

  if (!facts.length) return null;

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
          <h2 className={styles.title}>{funFacts.title}</h2>
          <div className={styles.factStage}>
            <p
              className={`${styles.fact} ${
                transitionPhase === 'out'
                  ? styles.factOutgoing
                  : transitionPhase === 'in'
                    ? styles.factIncoming
                    : ''
              }`}
            >
              {facts[index]}
            </p>
          </div>
          <div className={styles.arrows}>
            <button
              type='button'
              className={styles.arrow}
              disabled={transitionPhase !== 'idle'}
              onClick={prev}
              aria-label='Previous fun fact'
            >
              ←
            </button>
            <button
              type='button'
              className={styles.arrow}
              disabled={transitionPhase !== 'idle'}
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
