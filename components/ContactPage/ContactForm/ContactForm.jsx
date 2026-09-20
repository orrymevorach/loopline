'use client';
import { useState } from 'react';
import styles from './ContactForm.module.scss';
import CopyToClipboard from '@/components/shared/CopyToClipboard/CopyToClipboard';
import Form from '@/components/shared/Form/Form';
import { sendFormSubmission } from '@/lib/mailgun';
import ThankYou from '@/components/shared/Form/ThankYou/ThankYou';
import { useWindowSize } from '@/context/window-size-context/window-size-context';
import Loader from '@/components/shared/Loader/Loader';

const Heading = () => {
  const { isMobile } = useWindowSize();

  return (
    <p className={styles.heading}>
      We&rsquo;d love to learn more about your family and how we can support
      you. {!isMobile && <br />}
      Prefer to email directly?{' '}
      <CopyToClipboard text='hello@loopline.com'>
        <span className={styles.underline}>hello@loopline.com</span>
      </CopyToClipboard>
    </p>
  );
};

const getFieldType = field => {
  if (field.appearance) {
    return field.appearance;
  }

  if (field.inputType) {
    return 'text';
  }

  return 'textarea';
};

const getInitialValue = field => {
  return field.appearance === 'checkbox' ? [] : '';
};

const getFieldId = field => {
  return field.fieldName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

const getFieldsFromConfig = formConfig => {
  return formConfig.flatMap(item => {
    if (item.fields) {
      return item.fields.map(field => field.fields ?? field);
    }

    return item.fields ?? item;
  });
};

export default function ContactForm({ fields: config }) {
  const fields = getFieldsFromConfig(config);

  const [values, setValues] = useState(() =>
    Object.fromEntries(
      fields.map(field => [getFieldId(field), getInitialValue(field)]),
    ),
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (fieldId, value) => {
    setValues(currentValues => {
      const currentValue = currentValues[fieldId];
      const nextValue =
        typeof value === 'function' ? value(currentValue ?? []) : value;

      return {
        ...currentValues,
        [fieldId]: nextValue,
      };
    });
  };

  const createFieldConfig = field => {
    const fieldId = getFieldId(field);

    return {
      type: getFieldType(field),
      id: fieldId,
      name: field.fieldName,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      inputType: field.inputType,
      checkboxItems:
        field.appearance === 'checkbox' ? field.options : undefined,
      options: field.options,
      value: values[fieldId],
      handleChange: value => handleFieldChange(fieldId, value),
    };
  };

  const formConfig = config.map(item => {
    if (item.fields) {
      return {
        type: 'row',
        title: item.title,
        items: item.fields.map(field =>
          createFieldConfig(field.fields ?? field),
        ),
      };
    }

    return createFieldConfig(item);
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    const submissionFields = Object.fromEntries(
      fields.map(field => {
        const fieldId = getFieldId(field);
        const value = values[fieldId];

        return [
          field.fieldName,
          Array.isArray(value) ? value.join(', ') : value,
        ];
      }),
    );

    try {
      await sendFormSubmission({
        fields: submissionFields,
        formName: 'General Inquiry Form',
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className={styles.loader}>
        <Loader isDotted />
      </div>
    );

  return (
    <div className={styles.container}>
      {!isSubmitted ? (
        <>
          <Form
            formConfig={formConfig}
            handleSubmit={handleSubmit}
            heading='Get in Touch'
            TextElement={Heading}
          />

          <p className={styles.footerText}>
            Every family’s path is different. <br />
            We approach each one with care.
          </p>
        </>
      ) : (
        <ThankYou />
      )}
    </div>
  );
}
