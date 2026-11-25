import ContactForm from '../About/ContactForm/ContactForm';
import VisitUs from './VisitUs/VisitUs';

export default function ContactPage({ hoursOfOperations = [] }) {
  return (
    <>
      <ContactForm isLight headingTag='h1' />
      <VisitUs hoursOfOperations={hoursOfOperations} />
    </>
  );
}
