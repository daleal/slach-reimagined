<script setup lang="ts">
import { ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useAccountInfo } from '@/composables/accountInfo';
import GenericButton from '@/components/GenericButton.vue';
import LargeSelectableButton from '@/components/LargeSelectableButton.vue';

const emit = defineEmits<{ (e: 'continue'): void }>();

const { accountType } = useAccountInfo();

const isIndividual = ref(accountType.value === 'individual');

const selectOption = (isIndividualNewValue: boolean) => {
  isIndividual.value = isIndividualNewValue;
};

const selectAction = () => {
  emit('continue');
};

watch([isIndividual], () => {
  accountType.value = isIndividual.value ? 'individual' : 'business';
});
</script>

<template>
  <h1 class="text-3xl font-medium text-center text-gray-800 mt-8 mb-16">
    ¿Para qué quieres usar Slach?
  </h1>

  <div class="grid sm:grid-cols-2 gap-8 mb-16">
    <LargeSelectableButton
      :selected="isIndividual"
      @click="() => selectOption(true)"
    >
      <template #icon>
        <FontAwesomeIcon :icon="[ 'fas', 'user' ]" />
      </template>
      <template #title>
        Para mí
      </template>
      <template #subtitle>
        Recibe pagos de tus amigos de forma fácil
      </template>
    </LargeSelectableButton>
    <LargeSelectableButton
      :selected="!isIndividual"
      @click="() => selectOption(false)"
    >
      <template #icon>
        <FontAwesomeIcon :icon="[ 'fas', 'store' ]" />
      </template>
      <template #title>
        Para mi negocio
      </template>
      <template #subtitle>
        Recibe pagos en tu negocio con un link de pagos o un código QR
      </template>
    </LargeSelectableButton>
  </div>
  <div class="w-full flex justify-center">
    <GenericButton
      @click="selectAction"
    >
      Continuar
    </GenericButton>
  </div>
</template>
