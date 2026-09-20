'use client';

import styles from './Carousel.module.scss';
import { useEffect, useState } from 'react';
import Button from '@/components/shared/Button/Button';

const slides = [
  {
    image: '/loopline-wine-hero.jpg',
    title: "Toronto's neighbourhood\nbottle shop and wine bar.",
  },
  {
    image:
      'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=2200&q=85',
    title: 'Thoughtful bottles for\nlong lunches and late nights.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=2200&q=85',
    title: 'Good wine, good people,\nright around the corner.',
  },
];

export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide(current => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  const slide = slides[activeSlide];

  return (
    <section className={styles.carousel} aria-label='Loopline highlights'>
      <div
        key={slide.image}
        className={styles.slide}
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className={styles.scrim} />
        <div className={styles.content}>
          <h1>{slide.title}</h1>
          <div className={styles.actions}>
            <Button href='/offerings' isPurple>
              Shop Wine
            </Button>
            <Button href='/contact' isCream>
              Reserve a Table
            </Button>
          </div>
        </div>

        <div className={styles.dots} aria-label='Choose a slide'>
          {slides.map((item, index) => (
            <button
              className={index === activeSlide ? styles.activeDot : styles.dot}
              key={item.image}
              type='button'
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === activeSlide ? 'true' : undefined}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
