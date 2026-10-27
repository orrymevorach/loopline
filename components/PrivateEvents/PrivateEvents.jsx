import EventsHero from '@/components/Events/EventsHero/EventsHero';
import Carousel from '@/components/HomePage/Carousel/Carousel';
import ContactForm from '@/components/About/ContactForm/ContactForm';
import image from 'public/private-events-hero.jpg';

const PRIVATE_EVENT_FIELDS = [
  { id: 'name', name: 'Name', type: 'text' },
  { id: 'email', name: 'Email', type: 'text', inputType: 'email' },
  { id: 'phone-number', name: 'Phone Number', type: 'text', inputType: 'tel' },
  { id: 'event-date', name: 'Preferred Event Date', type: 'date' },
  {
    id: 'guest-count',
    name: 'Number of Guests',
    type: 'text',
    inputType: 'number',
    min: 1,
  },
  { id: 'event-type', name: 'Event Type / Occasion', type: 'text' },
  { id: 'message', name: 'Message', type: 'textarea' },
];

export default function PrivateEvents({ carouselSlides }) {
  return (
    <>
      <EventsHero
        image={image}
        imageAlt='Wine being poured for guests around a dining table'
        title='Private Events'
        description='Bring your people together at Loopline. Get in touch to discuss a private gathering over wine, food, and good company.'
        actionHref='#book-a-private-event'
        actionLabel='Book a private event'
        actionTarget={null}
      />
      <Carousel slides={carouselSlides} />
      <ContactForm
        id='book-a-private-event'
        isLight
        fields={PRIVATE_EVENT_FIELDS}
        heading='Book a Private Event'
        formName='Private Event Booking'
      />
    </>
  );
}
