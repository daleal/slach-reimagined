import { ref } from 'vue';

import type { Bank } from '@/utils/banks';
import type { Nullable } from '@/types/utils';
import type { BankAccountType } from '@/utils/bankAccountTypes';

const accountType = ref<'individual' | 'business'>('individual');
const bankAccountNumber = ref('');
const bankName = ref<Nullable<Bank['name']>>(null);
const bankAccountType = ref<Nullable<BankAccountType['name']>>(null);
const alias = ref('');
const rut = ref('');

// Inferred
const name = ref('');

export const useAccountInfo = () => ({
  accountType,
  bankAccountNumber,
  bankName,
  bankAccountType,
  alias,
  rut,
  name,
});
