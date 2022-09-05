<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import GenericButton from '@/components/GenericButton.vue';
import SquareSelector from '@/components/SquareSelector.vue';

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
  const state: SecondStateType = isPayer.value ? 'payer' : 'owner';
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
    <SquareSelector
      :selected="optionSelected && isPayer"
      @select="() => selectOption(true)"
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
    </SquareSelector>
    <SquareSelector
      :selected="optionSelected && !isPayer"
      @select="() => selectOption(false)"
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
    </SquareSelector>
  </div>
  <GenericButton
    full-width
    :disabled="!optionSelected"
    class="mb-16"
    @click="selectAction"
  >
    Continuar
  </GenericButton>
  <GenericButton
    full-width
    type="secondary"
    @click="goToHome"
  >
    ¿Todavía no tienes <span class="font-bold">Slach</span>? Créalo acá
  </GenericButton>
</template>
