'use client';

import styles from './Carousel.module.scss';
import { useEffect, useRef, useState } from 'react';
import Slide from './Slide/Slide';

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
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const [outgoingSlide, setOutgoingSlide] = useState(null);
  const activeSlideRef = useRef(0);
  const isTransitioning = useRef(false);

  activeSlideRef.current = activeSlide;

  const changeSlide = nextSlide => {
    if (isTransitioning.current || nextSlide === activeSlideRef.current) {
      return;
    }

    setOutgoingSlide(activeSlideRef.current);
    setActiveSlide(nextSlide);
    isTransitioning.current = true;
    setTransitionPhase('in');
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      changeSlide((activeSlideRef.current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (transitionPhase === 'idle') return undefined;

    const timeout = window.setTimeout(() => {
      isTransitioning.current = false;
      setOutgoingSlide(null);
      setTransitionPhase('idle');
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [transitionPhase]);

  const slide = slides[activeSlide];

  return (
    <section className={styles.carousel} aria-label='Loopline highlights'>
      <div className={styles.slideStage}>
        {outgoingSlide !== null && transitionPhase === 'in' ? (
          <Slide
            slideData={slides[outgoingSlide]}
            variant='outgoing'
            showControls={false}
            slides={slides}
            activeSlide={activeSlide}
            transitionPhase={transitionPhase}
            changeSlide={changeSlide}
          />
        ) : null}
        <Slide
          slideData={slide}
          variant={transitionPhase === 'in' ? 'incoming' : ''}
          showControls
          slides={slides}
          activeSlide={activeSlide}
          transitionPhase={transitionPhase}
          changeSlide={changeSlide}
        />
      </div>
    </section>
  );
}
