<script setup lang="ts">
import { ref, watch } from 'vue';
import { useField } from 'vee-validate';
import { useAmount } from '@/composables/amount';
import { onlyNumbersFormatter } from '@/utils/formatters';
import { validateNumeric, validatePositiveNumeric } from '@/utils/validations';
import GenericButton from '@/components/GenericButton.vue';
import GenericInput from '@/components/GenericInput.vue';

import type { User } from '@/types/user';

const props = defineProps<{ user: User }>();

const emit = defineEmits<{ (e: 'continue'): void }>();

const { amount: globalAmount } = useAmount();
const { value: amount, errorMessage, meta } = useField('amount', [
  validateNumeric('Ingresa un monto válido'),
  validatePositiveNumeric('Ingresa un monto válido'),
]);

const written = ref(false);

const continueAction = () => {
  globalAmount.value = amount.value ? amount.value : null;
  emit('continue');
};

const goToHome = () => {
  window.location.href = '/';
};

watch([amount], () => {
  written.value = true;
});
</script>

<template>
  <h1 class="text-xl md:text-3xl font-bold text-center text-gray-900 mb-6">
    Le vas a pagar a <span class="text-indigo-500">{{ props.user.name }}</span>
  </h1>
  <p class="text-gray-900 font-medium mb-6">
    ¿Cuánto quieres transferir?
  </p>
  <GenericInput
    v-model="amount"
    class="mb-6"
    placeholder="Elige monto"
    :error="errorMessage"
    :formatter="onlyNumbersFormatter"
  />
  <GenericButton
    :disabled="!written || !meta.valid"
    class="mb-16"
    full-width
    @click="continueAction"
  >
    Continuar
  </GenericButton>
  <GenericButton
    type="secondary"
    full-width
    @click="goToHome"
  >
    ¿Todavía no tienes <span class="font-bold">Slach</span>? Créalo acá
  </GenericButton>
</template>
