import { client } from '@/api/client';

import type { User, UserCreation } from '@/types/user';

const BASE_PATH = '/api/v1/users';

export const get = async (alias: string) => {
  const response = await client.get<{ data: User }>(`${BASE_PATH}/${alias}`);
  return response.data.data;
};

export const create = (data: UserCreation) => client.post(BASE_PATH, data);
