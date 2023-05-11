/**
 * @format
 * @flow strict-local
 */

export const toBoolean = (string) => {
  if (!string) {
    return false;
  }

  return (
    string.toLowerCase() === 'true'.toLowerCase()
    ||
    string.toLowerCase() === '1'.toLowerCase()
  );
};

export const trim = (string, character) => {
  character = character.replace('\\', '\\\\]');
  character = character.replace('[', '\\[');
  character = character.replace(']', '\\]');
  character = character.replace('^', '\\^');

  return string.replace(
    new RegExp('^[' + character + ']+|[' + character + ']+$', 'g'),
    '',
  );
};

export const toCapitalize = (string, isFirstCharOnly = false) => {
  if (isFirstCharOnly) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const array = string.split(' ');

  for (var i = 0; i < array.length; i += 1) {
    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
  }

  return array.join(' ');
}
