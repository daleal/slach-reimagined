<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useField } from 'vee-validate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useAccountInfo } from '@/composables/accountInfo';
import * as oracle from '@/services/oracle';
import { bankAccountTypes } from '@/utils/bankAccountTypes';
import { banks } from '@/utils/banks';
import { rutFormatter, onlyNumbersFormatter } from '@/utils/formatters';
import {
  validateNonEmpty, validateRut, validateNumeric, validatePositiveNumeric,
} from '@/utils/validations';
import GenericButton from '@/components/GenericButton.vue';
import GenericInput from '@/components/GenericInput.vue';
import GenericDropDown from '@/components/GenericDropDown.vue';
import LargeSelectableButton from '@/components/LargeSelectableButton.vue';

const emit = defineEmits<{
  (e: 'continue'): void,
  (e: 'go-back'): void,
}>();

const {
  rut, bankAccountNumber, bankName, bankAccountType, name,
} = useAccountInfo();

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
const rutValid = computed(() => rutWritten.value && rutFieldMeta.valid);
const fetchingName = ref(false);

const {
  value: accountNumberValue,
  errorMessage: accountNumberErrorMessage,
  meta: accountNumberMeta,
} = useField('account-number', [
  validateNumeric('Ingresa un número de cuenta válido 👮🏽‍♀'),
  validatePositiveNumeric('Ingresa un número de cuenta válido 👮🏽‍♀'),
], {
  initialValue: bankAccountNumber.value,
  validateOnMount: bankAccountNumber.value !== '',
});
const accountNumberWritten = ref(bankAccountNumber.value !== '');
const accountNumberValid = computed(() => accountNumberWritten.value && accountNumberMeta.valid);

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

watch([rutValid], async () => {
  if (rutValid.value) {
    fetchingName.value = true;
    try {
      const entity = await oracle.queryByRut(rutFieldValue.value);
      name.value = entity.name;
    } catch {} finally { // eslint-disable-line no-empty
      fetchingName.value = false;
    }
  }
});

watch([accountNumberValue], () => {
  accountNumberWritten.value = true;
  bankAccountNumber.value = accountNumberValue.value;
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
    class="mb-4"
    placeholder="RUT"
    :error="rutFieldErrorMessage"
    :loading="fetchingName"
    :formatter="rutFormatter"
  />

  <GenericDropDown
    v-model="bankName"
    class="mb-12"
    label="Banco"
    :options="banks.map((bank) => bank.name)"
    full-width
  />

  <GenericDropDown
    v-model="bankAccountType"
    class="mb-12"
    label="Tipo de cuenta"
    :options="bankAccountTypes.map((accountType) => accountType.name)"
    full-width
  />

  <GenericInput
    v-model="accountNumberValue"
    class="mb-4"
    placeholder="Número de cuenta"
    :error="accountNumberErrorMessage"
    :formatter="onlyNumbersFormatter"
  />

  <div class="w-full flex justify-center mb-6">
    <GenericButton
      :disabled="!rutValid || !accountNumberValid || !bankName || !bankAccountType || fetchingName"
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
