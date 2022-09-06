import { ref } from 'vue';

const accountType = ref<'individual' | 'business'>('individual');
const alias = ref('');
const rut = ref('');

export const useAccountInfo = () => ({
  accountType,
  alias,
  rut,
});
