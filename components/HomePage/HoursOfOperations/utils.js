export function getPhoneHref(detail) {
  const phoneNumber = detail.trim();
  const digits = phoneNumber.replace(/\D/g, '');

  if (!/^\+?[\d\s().-]+$/.test(phoneNumber) || digits.length < 7) {
    return null;
  }

  return `tel:${phoneNumber.replace(/[^\d+]/g, '')}`;
}
