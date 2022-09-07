import { ref } from 'vue';
import { rutClean } from 'rut-helpers';
import { banks } from '@/utils/banks';
import { bankAccountTypes } from '@/utils/bankAccountTypes';

import type { Bank } from '@/utils/banks';
import type { BankAccountType } from '@/utils/bankAccountTypes';
import type { Nullable } from '@/types/utils';

const accountType = ref<'individual' | 'business'>('individual');
const bankAccountNumber = ref('');
const bankName = ref<Nullable<Bank['name']>>(null);
const bankAccountType = ref<Nullable<BankAccountType['name']>>(null);
const alias = ref('');
const rut = ref('');
const email = ref('');

// Inferred
const name = ref('');

// Methods
const getNormalizedData = () => ({
  isBusiness: accountType.value === 'business',
  accountNumber: bankAccountNumber.value,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  bank: banks.find((internalBank) => internalBank.name === bankName.value)!.id,
  accountType: (
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    bankAccountTypes.find((internalType) => internalType.name === bankAccountType.value)!.id
  ),
  alias: alias.value.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
  rut: rutClean(rut.value),
  email: email.value,
});

export const useAccountInfo = () => ({
  accountType,
  bankAccountNumber,
  bankName,
  bankAccountType,
  alias,
  rut,
  email,
  name,
  getNormalizedData,
});
