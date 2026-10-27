import EventsHero from './EventsHero/EventsHero';
import Carousel from '@/components/HomePage/Carousel/Carousel';
import EventsGallery from '@/components/Events/EventsGallery/EventsGallery';
import CalendarImage from '@/components/Events/CalendarImage/CalendarImage';

export default function Events({ carouselSlides, calendarImage, events }) {
  return (
    <>
      <EventsHero />
      <Carousel slides={carouselSlides} />
      <CalendarImage image={calendarImage} />
      <EventsGallery events={events} />
    </>
  );
}
