<script setup lang="ts">
import { computed } from 'vue';
import { useAmount } from '@/composables/amount';
import GenericButton from '@/components/GenericButton.vue';

import type { User } from '@/types/user';

const props = defineProps<{ user: User }>();

const { amount } = useAmount();

const formattedAmount = computed(() => {
  if (amount.value === null) {
    return '';
  }
  return Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Number(amount.value));
});

const goToHome = () => {
  window.location.href = '/';
};
</script>

<template>
  <h1 class="text-xl md:text-3xl font-bold text-center text-gray-900 mb-6">
    Le vas a pagar {{ formattedAmount }}
    a <span class="text-indigo-500">{{ props.user.name }}</span>
  </h1>
  <p class="text-gray-900 font-medium mb-6">
    ¿Cómo le quieres pagar?
  </p>
  <GenericButton
    class="mb-4"
    full-width
  >
    Pagar sin salir de Slach 📲
  </GenericButton>
  <p class="text-center text-sm select-none text-gray-600 mb-10">
    Entra a tu cuenta del banco desde acá y transfiere en segundos
  </p>
  <GenericButton
    class="mb-4"
    full-width
  >
    Ver datos para pagar manualmente 🏦
  </GenericButton>
  <p class="text-center text-sm select-none text-gray-600 mb-16">
    Te mostramos los datos bancarios y tú haces la transferencia
  </p>
  <GenericButton
    type="secondary"
    full-width
    @click="goToHome"
  >
    ¿Todavía no tienes <span class="font-bold">Slach</span>? Créalo acá
  </GenericButton>
</template>
