// Fields show their label as the placeholder, marking required ones with an
// asterisk.
export const getPlaceholder = ({ placeholder, label, required }) => {
  const text = placeholder || label;
  return required && text ? `${text}*` : text;
};
