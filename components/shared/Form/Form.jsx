import Button from '@/components/shared/Button/Button';
import GetFormElement from './FormElements';
import styles from './Form.module.scss';
import clsx from 'clsx';
import Loader from '../Loader/Loader';

const Heading = ({
  heading,
  HeadingTag = 'h2',
  text,
  TextElement,
  headingContainerClassNames = '',
  titleClassNames = '',
}) => {
  return (
    <div className={clsx(styles.textContainer, headingContainerClassNames)}>
      <HeadingTag className={clsx(styles.title, titleClassNames)}>
        {heading}
      </HeadingTag>
      {text && <p className={styles.description}>{text}</p>}
      {TextElement && <TextElement classNames={styles.description} />}
    </div>
  );
};

export default function SubmissionForm({
  formConfig,
  handleSubmit = () => {},
  isLoading = false,
  formContainerClassNames = '',
  inputClassNames = '',
  labelClassNames = '',
  inputContainerClassNames = '',
  loaderClassNames = {},
  buttonClassNames = '',
  buttonText = 'Submit',
  headingContainerClassNames = '',
  titleClassNames = '',
  heading,
  headingTag,
  text,
  TextElement = null,
}) {
  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit();
  };

  if (isLoading)
    return (
      <div className={styles.container}>
        <Heading
          heading={heading}
          HeadingTag={headingTag}
          text={text}
          headingContainerClassNames={headingContainerClassNames}
          titleClassNames={titleClassNames}
        />
        <Loader classNames={clsx(styles.loader, loaderClassNames)} isDotted />
      </div>
    );

  return (
    <>
      <Heading
        heading={heading}
        HeadingTag={headingTag}
        text={text}
        TextElement={TextElement}
        headingContainerClassNames={headingContainerClassNames}
        titleClassNames={titleClassNames}
      />
      <form
        action='#'
        className={clsx(styles.container, formContainerClassNames)}
        onSubmit={handleSubmitForm}
      >
        {formConfig.map((elementConfig, index) => {
          return (
            <GetFormElement
              key={`${index}-submission-form`}
              {...elementConfig}
              inputClassNames={inputClassNames}
              labelClassNames={labelClassNames}
              inputContainerClassNames={inputContainerClassNames}
            />
          );
        })}

        <Button isYellow classNames={clsx(styles.submit, buttonClassNames)}>
          {buttonText}
        </Button>
      </form>
    </>
  );
}
