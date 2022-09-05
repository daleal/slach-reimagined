<script setup lang="ts">
import { computed } from 'vue';
import { useAmount } from '@/composables/amount';
import { usePageContext } from '@/composables/pageContext';
import QrcodeVue from 'qrcode.vue';

const { amount } = useAmount();
const { pageContext } = usePageContext();

const amountFragment = amount.value ? `/${amount.value}` : '';

const url = computed(() => (
  `https://slach.cl/${pageContext.routeParams.alias}${amountFragment}`
));
</script>

<template>
  <h1 class="text-xl md:text-3xl font-bold text-center text-gray-900 mb-16">
    Instrucciones para cobrar
  </h1>
  <p class="text-center text-gray-900 font-medium mb-10">
    Si estás con la persona, pídele que escanee el código QR
  </p>
  <QrcodeVue
    class="w-full mb-10"
    :size="256"
    :value="url"
    render-as="svg"
  />
  <p class="text-center text-gray-900 font-medium mb-4">
    Si no, envíale el siguiente link 👇
  </p>
  <p class="text-3xl font-semibold text-center text-indigo-500 break-words">
    {{ url }}
  </p>
</template>
