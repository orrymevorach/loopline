import Wrapper from '../shared/Wrapper/Wrapper';
import ContactForm from './ContactForm/ContactForm';

export default function ContactPage({ entries = [] }) {
  const [form] = entries;
  return (
    <>
      <Wrapper>
        <ContactForm fields={form} />
      </Wrapper>
    </>
  );
}
