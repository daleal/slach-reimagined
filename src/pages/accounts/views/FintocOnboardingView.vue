<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAccountInfo } from '@/composables/accountInfo';
import { bankAccountTypes } from '@/utils/bankAccountTypes';
import GenericButton from '@/components/GenericButton.vue';
import GenericInput from '@/components/GenericInput.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';

import type { BankAccountType } from '@/utils/bankAccountTypes';
import type { FintocAccount } from '@/types/fintoc';
import type { Nullable } from '@/types/utils';

const emit = defineEmits<{
  (e: 'continue'): void,
  (e: 'go-back'): void,
}>();

const {
  rut, bankName, bankAccountNumber, bankAccountType, accounts,
} = useAccountInfo();

const selectedAccount = ref<Nullable<string>>(null);

const accountNameFromId = (accountId: BankAccountType['id']) => (
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  bankAccountTypes.find((account) => account.id === accountId)!.name
);

const formatAccount = (account: FintocAccount) => (
  `${account.accountNumber} - ${accountNameFromId(account.accountType)}`
);

const continueAction = () => {
  emit('continue');
};

const back = () => {
  emit('go-back');
};

watch([selectedAccount], () => {
  if (selectedAccount.value !== null) {
    const [internalAccountNumber, internalAccountType] = selectedAccount.value.split(' - ');
    bankAccountNumber.value = internalAccountNumber;
    bankAccountType.value = internalAccountType as BankAccountType['name'];
  }
});
</script>

<template>
  <h1 class="text-3xl font-medium text-center text-gray-800 my-8">
    Registra tus datos bancarios
  </h1>

  <h3 class="text-lg text-center text-gray-800 mb-16">
    Los pagos llegarán directamente a la cuenta que registres acá
  </h3>

  <GenericInput
    :model-value="rut"
    class="mb-6"
    placeholder="RUT"
    full-width
    disabled
  />

  <GenericInput
    :model-value="bankName!"
    class="mb-6"
    placeholder="Banco"
    full-width
    disabled
  />

  <GenericDropDown
    v-model="selectedAccount"
    class="mb-14"
    label="Selecciona una cuenta"
    :options="accounts.map(formatAccount)"
    full-width
  />

  <div class="w-full flex justify-center mb-6">
    <GenericButton
      :disabled="!bankAccountType"
      @click="continueAction"
    >
      Continuar
    </GenericButton>
  </div>
  <div class="w-full flex justify-center">
    <span
      class="
        cursor-pointer select-none text-indigo-500
        hover:text-indigo-700 hover:underline
      "
      @click="back"
    >
      atrás
    </span>
  </div>
</template>
