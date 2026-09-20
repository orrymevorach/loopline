'use client';

import styles from './Carousel.module.scss';
import { useEffect, useState } from 'react';
import Button from '@/components/shared/Button/Button';

const slides = [
  {
    image: '/loopline-wine-hero.jpg',
    title: 'Toronto’s neighbourhood\nbottle shop and wine bar.',
    actions: [
      { label: 'Shop Wine', href: '/offerings', isPurple: true },
      { label: 'Reserve a Table', href: '/contact', isCream: true },
    ],
  },
  {
    image: '/carousel/wine-club.jpg',
    size: '128.2% auto',
    position: '75% 66%',
    title: 'A global lineup of iconic\nand under-the-radar wines.',
    actions: [
      { label: 'Shop Wine', href: '/offerings', isPurple: true },
      { label: 'Join the Wine Club', href: '/wine-club', isCream: true },
    ],
  },
  {
    image: '/carousel/snacks.jpg',
    size: '102.12% auto',
    position: '0% 62%',
    title: 'Great wine, great snacks,\ngood company.',
    actions: [
      { label: 'Reserve a Table', href: '/contact', isPurple: true },
      { label: 'Food Menu', href: '/menu', isCream: true },
    ],
  },
  {
    image: '/carousel/apero-hour.jpg',
    size: '102.12% auto',
    position: '0% 84%',
    title: 'Apero Hour with\nGrégoire Doulain',
    actions: [
      { label: 'Buy Tickets', href: '/events', isPurple: true },
      { label: 'See All Events', href: '/events', isCream: true },
    ],
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
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: slide.size,
          backgroundPosition: slide.position,
        }}
      >
        <div className={styles.scrim} />
        <div className={styles.content}>
          <h1>{slide.title}</h1>
          <div className={styles.actions}>
            {slide.actions.map(({ label, ...buttonProps }) => (
              <Button key={label} {...buttonProps}>
                {label}
              </Button>
            ))}
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
