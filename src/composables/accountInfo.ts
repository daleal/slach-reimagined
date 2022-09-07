import { ref } from 'vue';

const accountType = ref<'individual' | 'business'>('individual');
const accountNumber = ref('');
const alias = ref('');
const rut = ref('');

// Inferred
const name = ref('');

export const useAccountInfo = () => ({
  accountType,
  accountNumber,
  alias,
  rut,
  name,
});
