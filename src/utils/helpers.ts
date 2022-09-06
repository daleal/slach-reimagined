export const isNumeric = (value?: string) => {
  if (!value) {
    return false;
  }
  return /^\d+$/.test(value);
};
