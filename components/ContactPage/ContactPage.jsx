import ContactForm from '../About/ContactForm/ContactForm';

export default function ContactPage({ entries = [] }) {
  const [form] = entries;
  return (
    <>
      <ContactForm isLight />
    </>
  );
}
