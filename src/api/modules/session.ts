import { client } from '@/api/client';

import type { FintocLink } from '@/types/fintoc';
import type { SessionResponse } from '@/types/session';

const BASE_PATH = '/api/v1/session';

export const create = async () => {
  const response = await client.post<SessionResponse>(BASE_PATH);
  return response.data;
};

export const get = async (sessionId: string) => {
  const response = await client.get<FintocLink>(`${BASE_PATH}/${sessionId}`);
  return response.data;
};
