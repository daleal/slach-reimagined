<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import GenericButton from '@/components/GenericButton.vue';
import SquareSelector from '@/components/SquareSelector.vue';
import GenericContainer from '@/components/layout/GenericContainer.vue';
import FrequentlyAskedQuestions from '@/components/FrequentlyAskedQuestions.vue';

const isIndividual = ref(true);

const selectOption = (isIndividualNewValue: boolean) => {
  isIndividual.value = isIndividualNewValue;
};

const selectAction = () => {
  console.log(`Individual: ${isIndividual.value}`);
};
</script>

<template>
  <GenericContainer>
    <template #body>
      <h1 class="text-3xl font-medium text-center text-gray-800 mt-8 mb-16">
        ¿Para qué quieres usar Slach?
      </h1>

      <div class="grid sm:grid-cols-2 gap-8 mb-16">
        <SquareSelector
          :selected="isIndividual"
          @select="() => selectOption(true)"
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
        </SquareSelector>
        <SquareSelector
          :selected="!isIndividual"
          @select="() => selectOption(false)"
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
        </SquareSelector>
      </div>
      <div class="w-full flex justify-center">
        <GenericButton
          @click="selectAction"
        >
          Continuar
        </GenericButton>
      </div>
    </template>
    <template #footer>
      <FrequentlyAskedQuestions />
    </template>
  </GenericContainer>
</template>
