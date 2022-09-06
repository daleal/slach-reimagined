<script setup lang="ts">
import { computed, ref } from 'vue';
import * as api from '@/api';
import { useAmount } from '@/composables/amount';
import { useAutomaticWidget } from '@/composables/automaticWidget';
import { usePageContext } from '@/composables/pageContext';
import { useFintocWidget } from '@/composables/fintocWidget';
import GenericButton from '@/components/GenericButton.vue';
import UserDataTable from '@/components/user-data/DataTable.vue';

import type { User } from '@/types/user';

const props = defineProps<{ user: User }>();

const { amount } = useAmount();
const { initiatePayment } = useAutomaticWidget();
const { pageContext } = usePageContext();

const showUserData = ref(false);

const formattedAmount = computed(() => {
  if (amount.value === null) {
    return '';
  }
  return Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Number(amount.value));
});

const toggleUserData = () => {
  showUserData.value = !showUserData.value;
};

const pay = async () => {
  if (amount.value !== null) {
    const { widgetToken } = await api.paymentIntents.create(
      pageContext.routeParams.alias,
      Number(amount.value),
    );
    const widget = await useFintocWidget({
      widgetToken,
    });
    widget?.open();
  }
};

const goToHome = () => {
  window.location.href = '/';
};

if (initiatePayment.value) {
  pay();
}
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
    class="mb-2 md:mb-4"
    full-width
    @click="pay"
  >
    Pagar sin salir de Slach 📲
  </GenericButton>
  <p class="text-center text-sm select-none text-gray-600 mb-10">
    Entra a tu cuenta del banco desde acá y transfiere en segundos
  </p>
  <GenericButton
    class="mb-2 md:mb-4"
    full-width
    @click="toggleUserData"
  >
    {{ showUserData ? 'Ocultar datos' : 'Ver datos para pagar manualmente 🏦' }}
  </GenericButton>
  <p
    v-if="!showUserData"
    class="text-center text-sm select-none text-gray-600"
  >
    Te mostramos los datos bancarios y tú haces la transferencia
  </p>
  <UserDataTable
    v-if="showUserData"
    class="mt-6"
    :user="props.user"
  />
  <GenericButton
    class="mt-16"
    type="secondary"
    full-width
    @click="goToHome"
  >
    ¿Todavía no tienes <span class="font-bold">Slach</span>? Créalo acá
  </GenericButton>
</template>
