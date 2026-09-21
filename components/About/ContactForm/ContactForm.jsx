'use client';
import { useState } from 'react';
import clsx from 'clsx';
import Form from '@/components/shared/Form/Form';
import ThankYou from '@/components/shared/Form/ThankYou/ThankYou';
import { sendFormSubmission } from '@/lib/mailgun';
import styles from './ContactForm.module.scss';

const FIELDS = [
  { id: 'name', name: 'Name', type: 'text' },
  { id: 'email', name: 'Email', type: 'text' },
  { id: 'phone-number', name: 'Phone Number', type: 'text' },
  { id: 'message', name: 'Message', type: 'textarea' },
];

export default function ContactForm({ isLight = false }) {
  const [values, setValues] = useState(
    Object.fromEntries(FIELDS.map(field => [field.id, ''])),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formConfig = FIELDS.map(field => ({
    type: field.type,
    id: field.id,
    label: field.name,
    required: true,
    value: values[field.id],
    handleChange: value =>
      setValues(currentValues => ({ ...currentValues, [field.id]: value })),
  }));

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await sendFormSubmission({
        fields: Object.fromEntries(
          FIELDS.map(field => [field.name, values[field.id]]),
        ),
        formName: 'General Inquiry Form',
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={clsx(styles.section, isLight && styles.light)}>
      {isSubmitted ? (
        <ThankYou />
      ) : (
        <Form
          formConfig={formConfig}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          heading='Contact'
          headingContainerClassNames={styles.heading}
          titleClassNames={styles.title}
        />
      )}
    </section>
  );
}
