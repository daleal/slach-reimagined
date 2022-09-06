<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useField } from 'vee-validate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useAccountInfo } from '@/composables/accountInfo';
import { rutFormatter } from '@/utils/formatters';
import { validateNonEmpty, validateRut } from '@/utils/validations';
import GenericButton from '@/components/GenericButton.vue';
import GenericInput from '@/components/GenericInput.vue';
import LargeSelectableButton from '@/components/LargeSelectableButton.vue';

const emit = defineEmits<{
    (e: 'continue'): void,
    (e: 'go-back'): void,
  }>();

const { rut } = useAccountInfo();

const {
  value: rutFieldValue,
  errorMessage: rutFieldErrorMessage,
  meta: rutFieldMeta,
} = useField('rut', [
  validateNonEmpty('Este campo no puede estar vacío'),
  validateRut('Ingresa un RUT válido 👮🏽‍♀'),
], {
  initialValue: rut.value,
  validateOnMount: rut.value !== '',
});
const rutWritten = ref(rut.value !== '');
const rutValid = computed(() => rutWritten.value && !rutFieldMeta.pending && rutFieldMeta.valid);

const continueAction = () => {
  emit('continue');
};

const back = () => {
  emit('go-back');
};

watch([rutFieldValue], () => {
  rutWritten.value = true;
  rut.value = rutFieldValue.value;
});
</script>

<template>
  <h1 class="text-3xl font-medium text-center text-gray-800 my-8">
    Registra tus datos bancarios
  </h1>

  <h3 class="text-lg text-center text-gray-800 mb-16">
    Los pagos llegarán directamente a la cuenta que registres acá
  </h3>

  <LargeSelectableButton class="mb-16">
    <template #icon>
      <FontAwesomeIcon :icon="[ 'fas', 'bolt' ]" />
    </template>
    <template #title>
      Registro Rápido
    </template>
    <template #subtitle>
      Inicia sesión en tu banco y obtén los datos automáticamente
    </template>
  </LargeSelectableButton>

  <GenericInput
    v-model="rutFieldValue"
    class="mb-16"
    placeholder="RUT"
    :error="rutFieldErrorMessage"
    :loading="rutFieldMeta.pending"
    :formatter="rutFormatter"
  />

  <div class="w-full flex justify-center mb-6">
    <GenericButton
      :disabled="!rutValid"
      @click="continueAction"
    >
      Continuar
    </GenericButton>
  </div>
  <div class="w-full flex justify-center">
    <span
      class="cursor-pointer text-indigo-500 hover:text-indigo-700 hover:underline"
      @click="back"
    >
      atrás
    </span>
  </div>
</template>
