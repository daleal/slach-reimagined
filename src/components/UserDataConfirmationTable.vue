<script setup lang="ts">
import type { BankAccountType } from '@/utils/bankAccountTypes';
import type { Bank } from '@/utils/banks';

const props = defineProps<{
  name: string,
  bankName: Bank['name'],
  accountType: BankAccountType['name'],
  accountNumber: string,
}>();
</script>

<template>
  <div class="bg-white shadow overflow-hidden rounded-lg mt-2 w-full">
    <div class="px-6 py-5">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Información de tu cuenta
      </h3>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Nombre
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ props.name }}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Banco
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ props.bankName }}
          </dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Tipo de cuenta
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ props.accountType }}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Número de cuenta
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ props.accountNumber }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
