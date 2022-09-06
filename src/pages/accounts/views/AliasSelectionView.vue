<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useField } from 'vee-validate';
import { useAccountInfo } from '@/composables/accountInfo';
import { validateNonEmpty, validateMinimumCharacterAmount, validateUnusedAlias } from '@/utils/validations';
import GenericButton from '@/components/GenericButton.vue';
import GenericInput from '@/components/GenericInput.vue';

const emit = defineEmits<{
  (e: 'continue'): void,
  (e: 'go-back'): void,
}>();

const { alias } = useAccountInfo();
const { value: possibleAlias, errorMessage, meta } = useField('alias', [
  validateNonEmpty('Este campo no puede estar vacío'),
  validateMinimumCharacterAmount(3, 'Este campo debe tener al menos 3 caracteres'),
  validateUnusedAlias('Este usuario ya está tomado 😱'),
], {
  initialValue: '',
});

const written = ref(false);
const valid = computed(() => written.value && !meta.pending && meta.valid);

const continueAction = () => {
  alias.value = possibleAlias.value;
  emit('continue');
};

const back = () => {
  emit('go-back');
};

watch([possibleAlias], () => {
  written.value = true;
});
</script>

<template>
  <h1 class="text-3xl font-medium text-center text-gray-800 my-8">
    Ingresa tu usuario
  </h1>

  <h3 class="text-lg text-center text-gray-800 mb-16">
    Tu usuario es tu cuenta. <span class="font-bold">No olvides tu usuario</span>.
    Lo necesitarás para empezar a recibir pagos
  </h3>

  <p class="text-xl text-gray-800 mb-2 mx-1 break-words">
    Tu slach será slach.cl/<span class="font-bold">{{ possibleAlias || 'usuario' }}</span>
  </p>

  <GenericInput
    v-model="possibleAlias"
    class="mb-16"
    placeholder="Usuario"
    :error="errorMessage"
    :loading="meta.pending"
  />

  <div class="w-full flex justify-center mb-6">
    <GenericButton
      :disabled="!valid"
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
