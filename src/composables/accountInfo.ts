import { ref } from 'vue';

const accountType = ref<'individual' | 'business'>('individual');
const alias = ref('');

export const useAccountInfo = () => ({
  accountType,
  alias,
});
