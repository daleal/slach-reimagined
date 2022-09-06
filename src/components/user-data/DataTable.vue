<script setup lang="ts">
import { computed } from 'vue';
import { rutFormat } from 'rut-helpers';
import { accountTypes } from '@/utils/accountTypes';
import { banks } from '@/utils/banks';
import CopyButton from '@/components/CopyButton.vue';
import TableRow from '@/components/user-data/TableRow.vue';

import type { User } from '@/types/user';

const props = defineProps<{ user: User }>();

const humanizeBank = (bankId: typeof banks[number]['id']) => {
  const bank = banks.find((internalBank) => internalBank.id === bankId);
  return bank === undefined ? '' : bank.name;
};

const humanizeAccountType = (accountTypeId: typeof accountTypes[number]['id']) => {
  const accountType = accountTypes.find(
    (internalAccountType) => internalAccountType.id === accountTypeId,
  );
  return accountType === undefined ? '' : accountType.name;
};

const allData = computed(() => (
  `Nombre: ${props.user.name}\n`
  + `Rut: ${props.user.rut}\n`
  + `Banco: ${humanizeBank(props.user.bank)}\n`
  + `Tipo de cuenta: ${humanizeAccountType(props.user.accountType)}\n`
  + `Número de cuenta: ${props.user.accountNumber}\n`
  + `Email: ${props.user.email}`
));
</script>

<template>
  <div class="w-full">
    <div class="border rounded-lg">
      <TableRow
        class="border-b border-b-gray-200"
        label="Nombre completo"
        :value="props.user.name"
      />
      <TableRow
        class="border-b border-b-gray-200"
        label="Rut"
        :value="rutFormat(props.user.rut)"
      />
      <TableRow
        class="border-b border-b-gray-200"
        label="Banco"
        :value="humanizeBank(props.user.bank)"
      />
      <TableRow
        class="border-b border-b-gray-200"
        label="Tipo"
        :value="humanizeAccountType(props.user.accountType)"
      />
      <TableRow
        class="border-b border-b-gray-200"
        label="Número"
        :value="props.user.accountNumber.toString()"
      />
      <TableRow
        label="Email"
        :value="props.user.email"
      />
    </div>
    <div class="w-full flex justify-center mt-6">
      <CopyButton
        text="Copiar todos los datos"
        :copy="allData"
      />
    </div>
  </div>
</template>
