<script setup lang="ts">
import { useField } from 'vee-validate';
import { useAmount } from '@/composables/amount';
import { onlyNumbersFormatter } from '@/utils/formatters';
import { validateNumericOrEmpty, validatePositiveNumericOrEmpty } from '@/utils/validations';
import GenericButton from '@/components/GenericButton.vue';
import GenericInput from '@/components/GenericInput.vue';

const emit = defineEmits<{ (e: 'continue'): void }>();

const { amount: globalAmount } = useAmount();
const { value: amount, errorMessage, meta } = useField('amount', [
  validateNumericOrEmpty('Ingresa un monto válido'),
  validatePositiveNumericOrEmpty('Ingresa un monto válido'),
]);

const continueAction = () => {
  globalAmount.value = amount.value ? amount.value : null;
  emit('continue');
};
</script>

<template>
  <h1 class="text-xl md:text-3xl font-bold text-center text-gray-900 mb-6">
    Instrucciones para cobrar
  </h1>
  <p class="text-gray-900 font-medium mb-6">
    ¿Cuánto quieres cobrar?
  </p>
  <GenericInput
    v-model="amount"
    class="mb-6"
    placeholder="Elige monto"
    hint="Déjalo en blanco si quieres que el destinatario seleccione el monto"
    :error="errorMessage"
    :formatter="onlyNumbersFormatter"
  />
  <GenericButton
    :disabled="!meta.valid"
    full-width
    @click="continueAction"
  >
    Continuar
  </GenericButton>
</template>
