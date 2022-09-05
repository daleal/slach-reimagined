export const validateNumeric = (errorMessage?: string) => (value: string) => {
  if (/^\d+$/.test(value)) {
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
