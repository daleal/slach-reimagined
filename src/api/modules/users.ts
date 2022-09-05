import { client } from '@/api/client';

const BASE_PATH = '/api/v1/users';

export const get = async (alias: string) => {
  const response = await client.get(`${BASE_PATH}/${alias}`);
  return response.data;
};

export const create = async (data: unknown) => {
  const response = await client.post(BASE_PATH, data);
  return response.data;
};
