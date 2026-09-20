import Cookies from 'js-cookie';

export const removeDupes = data => {
  let set = [...new Set(data)]; // Sets remove dupes
  return Array.from(set);
};

export const split = data => {
  const half = Math.ceil(data.length / 2);
  return [data.slice(0, half), data.slice(half)];
};

export const getUid = () => Cookies.get('uid');

export const camelToSnakeCase = str =>
  str.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();

export const camelToRegularCase = str =>
  str.replace(/[A-Z]/g, letter => ` ${letter}`);

export const isEmpty = object => {
  return Object.keys(object).length === 0 && object.constructor === Object;
};

export function isEven(number) {
  return number % 2 === 0;
}

export function validateEmail(email) {
  if (
    email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return true;
  }
  return false;
}

export function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function removeUnderscore(key) {
  return key.replace(/_/g, '');
}

export function formatName(fullName) {
  const nameParts = fullName.trim().split(/\s+/); // Split full name into parts
  const firstName = nameParts[0]; // First part is the first name
  const lastNameParts = nameParts.slice(1); // Remaining parts are the last name

  const formattedLastName =
    lastNameParts.length > 1
      ? lastNameParts.map(word => word[0].toUpperCase()).join('') // Abbreviate if multiple words
      : lastNameParts[0]; // Use the full last name if it's a single word

  return {
    firstName,
    lastName: formattedLastName,
  };
}

export function findMatchingString(array1, array2) {
  for (const str1 of array1) {
    if (array2.includes(str1)) {
      return str1; // Return the first match found
    }
  }
  return null; // Return null if no match is found
}
