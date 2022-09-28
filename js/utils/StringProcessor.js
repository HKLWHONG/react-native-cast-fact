/**
 * @format
 * @flow strict-local
 */

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
