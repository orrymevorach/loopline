import EventsHero from './EventsHero/EventsHero';
import Carousel from '@/components/HomePage/Carousel/Carousel';

export default function Events({ carouselSlides }) {
  return (
    <>
      <Carousel slides={carouselSlides} />
      <EventsHero />
    </>
  );
}
