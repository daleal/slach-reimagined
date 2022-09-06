import { rutValidate } from 'rut-helpers';
import * as api from '@/api';
import { isNumeric } from '@/utils/helpers';

export const validateNumeric = (errorMessage?: string) => (value: string) => {
  if (isNumeric(value)) {
    return true;
  }
  return errorMessage || 'A valid number is required';
};

export const validateNumericOrEmpty = (errorMessage?: string) => (value: string) => {
  if (!value) {
    return true;
  }
  return validateNumeric(errorMessage)(value);
};

export const validatePositiveNumeric = (errorMessage?: string) => (value: string) => {
  const numericValidation = validateNumeric(errorMessage)(value);
  if (numericValidation !== true) {
    return numericValidation;
  }
  return Number(value) > 0 || errorMessage || 'A positive number is required';
};

export const validatePositiveNumericOrEmpty = (errorMessage?: string) => (value: string) => {
  if (!value) {
    return true;
  }
  const numericValidation = validateNumeric(errorMessage)(value);
  if (numericValidation !== true) {
    return numericValidation;
  }
  return Number(value) > 0 || errorMessage || 'A positive number is required';
};

export const validateNonEmpty = (errorMessage?: string) => (value: string) => {
  if (value.trim().length > 0) {
    return true;
  }
  return errorMessage || 'This field cannot be empty';
};

export const validateMinimumCharacterAmount = (
  characters: number,
  errorMessage?: string,
) => (value: string) => {
  if (value.trim().length >= characters) {
    return true;
  }
  return errorMessage || `This field needs to be at least ${characters} characters long`;
};

export const validateUnusedAlias = (errorMessage?: string) => async (value: string) => {
  try {
    await api.users.get(value);
    return errorMessage || 'This alias is already taken';
  } catch {
    return true;
  }
};

export const validateRut = (errorMessage?: string) => async (value: string) => {
  if (rutValidate(value)) {
    return true;
  }
  return errorMessage || 'This field needs a valid DNI';
};
