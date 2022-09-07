<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useField } from 'vee-validate';
import { useAccountInfo } from '@/composables/accountInfo';
import { validateNonEmpty, validateEmail } from '@/utils/validations';
import GenericButton from '@/components/GenericButton.vue';
import GenericInput from '@/components/GenericInput.vue';

const emit = defineEmits<{
  (e: 'continue'): void,
  (e: 'go-back'): void,
}>();

const { email } = useAccountInfo();
const { value: possibleEmail, errorMessage, meta } = useField('email', [
  validateNonEmpty('Este campo es obligatorio'),
  validateEmail('Ingresa un email válido 👮🏽‍♀'),
], {
  initialValue: email.value,
  validateOnMount: email.value !== '',
});

const written = ref(email.value !== '');
const valid = computed(() => written.value && meta.valid);

const alias = ref('some-alias');

const continueAction = () => {
  emit('continue');
};

const back = () => {
  emit('go-back');
};

watch([possibleEmail], () => {
  written.value = true;
  email.value = possibleEmail.value;
});
</script>

<template>
  <h1 class="text-3xl font-medium text-center text-gray-800 my-8">
    ¡Ya estamos casi!
  </h1>

  <h3 class="text-lg text-center text-gray-800 mb-16">
    Revisa que los datos sean los correctos y luego confirma tu email para validar tu cuenta
  </h3>

  <div class="mb-16">
    TABLA
  </div>

  <h2 class="text-2xl text-center mb-2">
    Tu usuario será: <span class="text-indigo-600 font-bold">{{ alias }}</span>
  </h2>

  <p class="text-gray-600 text-center mb-10">
    Recuerda que en slach no tienes una cuenta ni debes iniciar sesión.
    Solamente debes conocer tu usuario para cobrar
  </p>

  <GenericInput
    v-model="possibleEmail"
    :error="errorMessage"
    class="mb-10"
    placeholder="Email"
  />

  <div class="w-full flex justify-center mb-6">
    <GenericButton
      :disabled="!valid"
      @click="continueAction"
    >
      Confirmar email
      <FontAwesomeIcon
        class="ml-1"
        :icon="[ 'fas', 'paper-plane' ]"
      />
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
