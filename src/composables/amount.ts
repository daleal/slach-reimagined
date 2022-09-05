import { ref } from 'vue';

import type { Nullable } from '@/types/utils';

const amount = ref<Nullable<string>>(null);

export const useAmount = () => ({
  amount,
});
