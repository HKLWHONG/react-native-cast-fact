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
