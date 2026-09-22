'use client';

import styles from './Carousel.module.scss';
import { useEffect, useRef, useState } from 'react';
import Slide from './Slide/Slide';

export default function Carousel({ slides = [] }) {
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
    if (slides.length < 2) return undefined;

    const interval = window.setInterval(() => {
      changeSlide((activeSlideRef.current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

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

  if (!slide) return null;

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
