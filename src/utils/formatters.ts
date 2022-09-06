import { rutClean, rutFormat } from 'rut-helpers';

export const onlyNumbersFormatter = (value: string) => value.replace(/[^0-9]/g, '');

export const trimFormatter = (value: string) => value.trim();

export const rutCharactersFormatter = (value: string) => value.replace(/[^0-9kK]/g, '');

export const rutFormatter = (value: string) => {
  const cleanValue = rutClean(trimFormatter(value));
  return rutFormat(rutCharactersFormatter(cleanValue)).toLowerCase();
};
