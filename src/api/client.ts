import axios, { AxiosResponseTransformer } from 'axios';
import humps from 'humps';
import { API_HOST } from '@/constants';

const { camelizeKeys } = humps;

export const client = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
    (data) => camelizeKeys(data),
  ],
});
