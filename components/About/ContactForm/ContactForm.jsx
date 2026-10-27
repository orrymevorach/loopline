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

export default function ContactForm({
  id,
  isLight = false,
  fields = FIELDS,
  heading = 'Contact',
  formName = 'General Inquiry Form',
}) {
  const [values, setValues] = useState(
    Object.fromEntries(fields.map(field => [field.id, ''])),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const formConfig = fields.map(field => ({
    type: field.type,
    inputType: field.inputType,
    min: field.min,
    id: field.id,
    label: field.name,
    required: true,
    value: values[field.id],
    handleChange: value =>
      setValues(currentValues => ({ ...currentValues, [field.id]: value })),
  }));

  const handleSubmit = async () => {
    setSubmissionError('');
    setIsLoading(true);

    try {
      const submission = await sendFormSubmission({
        fields: Object.fromEntries(
          fields.map(field => [field.name, values[field.id]]),
        ),
        formName,
      });
      if (!submission?.success) {
        throw new Error('Form submission was not accepted');
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error(`Error submitting ${formName}:`, error);
      setSubmissionError('Your message could not be sent. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id={id} className={clsx(styles.section, isLight && styles.light)}>
      {isSubmitted ? (
        <ThankYou />
      ) : (
        <Form
          formConfig={formConfig}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          heading={heading}
          headingContainerClassNames={styles.heading}
          titleClassNames={styles.title}
        />
      )}
      {submissionError && <p role='alert'>{submissionError}</p>}
    </section>
  );
}
