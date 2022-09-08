import { ref } from 'vue';
import * as api from '@/api';

import type { SessionResponse } from '@/types/session';
import type { Nullable } from '@/types/utils';

const sessionResponse = ref<Nullable<Promise<SessionResponse>>>(null);

const getSession = async () => {
  if (sessionResponse.value === null) {
    sessionResponse.value = api.session.create();
  }
  return sessionResponse.value;
};

export const useSession = () => ({
  getSession,
});
