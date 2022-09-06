import { ref } from 'vue';

import type { Nullable } from '@/types/utils';

const accountType = ref<'individual' | 'business'>('individual');
const alias = ref<Nullable<string>>(null);

export const useAccountInfo = () => ({
  accountType,
  alias,
});
