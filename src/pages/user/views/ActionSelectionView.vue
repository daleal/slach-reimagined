<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import GenericButton from '@/components/GenericButton.vue';
import LargeSelectableButton from '@/components/LargeSelectableButton.vue';

import type { User } from '@/types/user';
import type { SecondStateType } from '@/types/views/user';

const props = defineProps<{ user: User }>();

const emit = defineEmits<{ (e: 'continue', state: SecondStateType): void }>();

const isPayer = ref(true);
const optionSelected = ref(false);

const selectOption = (isPayerNewValue: boolean) => {
  optionSelected.value = true;
  isPayer.value = isPayerNewValue;
};

const selectAction = () => {
  const state: SecondStateType = isPayer.value ? 'payer-amount-selection' : 'owner-amount-selection';
  emit('continue', state);
};

const goToHome = () => {
  window.location.href = '/';
};
</script>

<template>
  <h1 class="text-xl md:text-3xl font-bold text-center text-gray-900 mb-16">
    ¿Qué quieres hacer?
  </h1>
  <div class="grid sm:grid-cols-2 gap-8 mb-16">
    <LargeSelectableButton
      :selected="optionSelected && isPayer"
      @click="() => selectOption(true)"
    >
      <template #icon>
        <FontAwesomeIcon :icon="[ 'fas', 'user' ]" />
      </template>
      <template #title>
        Pagar
      </template>
      <template #subtitle>
        Quiero pagarle a <span class="font-medium">{{ props.user.name }}</span>
      </template>
    </LargeSelectableButton>
    <LargeSelectableButton
      :selected="optionSelected && !isPayer"
      @click="() => selectOption(false)"
    >
      <template #icon>
        <FontAwesomeIcon :icon="[ 'fas', 'hand-holding-dollar' ]" />
      </template>
      <template #title>
        Cobrar
      </template>
      <template #subtitle>
        Soy <span class="font-medium">{{ props.user.name }}</span>
        y quiero que me paguen
      </template>
    </LargeSelectableButton>
  </div>
  <GenericButton
    :disabled="!optionSelected"
    class="mb-16"
    full-width
    @click="selectAction"
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
