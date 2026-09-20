export const sendFormSubmission = async ({ fields, formName }) => {
  const res = await fetch('/api/mailgun/send-form-submission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields, formName }),
  }).then(res => res.json());
  return res;
};
