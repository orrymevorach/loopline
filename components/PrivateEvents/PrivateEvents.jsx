import EventsHero from '@/components/Events/EventsHero/EventsHero';
import { ROUTES } from '@/utils/constants';

export default function PrivateEvents() {
  return (
    <EventsHero
      title='Private Events'
      description='Bring your people together at Loopline. Get in touch to discuss a private gathering over wine, food, and good company.'
      actionHref={ROUTES.CONTACT}
      actionLabel='Book a private event'
      actionTarget={null}
    />
  );
}
