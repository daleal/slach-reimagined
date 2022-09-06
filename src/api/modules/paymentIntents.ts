import { client } from '@/api/client';

import type { PaymentIntent } from '@/types/paymentIntent';

const BASE_PATH = '/api/v1/payment_intents';

export const create = async (alias: string, amount: number) => {
  const response = await client.post<PaymentIntent>(BASE_PATH, {
    data: { userAlias: alias, amount },
  });
  return response.data;
};
