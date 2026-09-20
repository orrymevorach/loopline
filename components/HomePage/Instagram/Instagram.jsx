'use client';
import { useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import styles from './Instagram.module.scss';

const posts = [1, 2, 3, 4].map(n => ({
  src: `/instagram/post-${n}.jpg`,
  alt: `Loopline Instagram post ${n}`,
}));

export default function Instagram() {
  const trackRef = useRef(null);

  const scroll = direction => {
    const track = trackRef.current;
    if (!track) return;
    const tile = track.firstElementChild;
    const step = tile ? tile.offsetWidth + 18 : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <a
          href='https://www.instagram.com/looplinewine'
          target='_blank'
          rel='noopener noreferrer'
        >
          @looplinewine
        </a>{' '}
        for sips and snacks
      </h2>
      <div className={styles.carousel}>
        <button
          type='button'
          className={styles.arrow}
          onClick={() => scroll(-1)}
          aria-label='Previous posts'
        >
          <Image
            src='/instagram/arrow-left.svg'
            alt=''
            width={32}
            height={32}
          />
        </button>
        <div className={styles.track} ref={trackRef}>
          {posts.map(({ src, alt }) => (
            <div key={src} className={styles.tile}>
              <Image
                src={src}
                alt={alt}
                fill
                sizes='(max-width: 850px) 80vw, 329px'
                className={styles.image}
              />
            </div>
          ))}
        </div>
        <button
          type='button'
          className={clsx(styles.arrow, styles.arrowNext)}
          onClick={() => scroll(1)}
          aria-label='Next posts'
        >
          <Image
            src='/instagram/arrow-left.svg'
            alt=''
            width={32}
            height={32}
          />
        </button>
      </div>
    </section>
  );
}
