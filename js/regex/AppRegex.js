/**
 * @format
 * @flow strict-local
 */

export const EMPTY_FIELD_REGEX = /^(.+)$/;

export const CREDENTIALS_PASSWORD_VALIDATION_LENGTH_REGEX = /^\S{12,}$/;
export const CREDENTIALS_PASSWORD_VALIDATION_SYMBOL_REGEX = /[-+_!@#$%^&*.,?]{1,}/;
export const CREDENTIALS_PASSWORD_VALIDATION_LOWER_CASE_REGEX = /[a-z]{1,}/;
export const CREDENTIALS_PASSWORD_VALIDATION_UPPER_CASE_REGEX = /[A-Z]{1,}/;

export const INTEGER_VALIDATION_REGEX = /^[0-9]+$/;
export const FLOAT_VALIDATION_REGEX = /^[+-]?([0-9]*[.])?[0-9]+$/;
