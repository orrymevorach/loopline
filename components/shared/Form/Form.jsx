import Button from '@/components/shared/Button/Button';
import GetFormElement from './FormElements';
import styles from './Form.module.scss';
import clsx from 'clsx';
import Loader from '../Loader/Loader';

const Heading = ({
  heading,
  text,
  TextElement,
  headingContainerClassNames = '',
  titleClassNames = '',
}) => {
  return (
    <div className={clsx(styles.textContainer, headingContainerClassNames)}>
      <h2 className={clsx(styles.title, titleClassNames)}>{heading}</h2>
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
