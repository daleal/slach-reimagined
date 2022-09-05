<script setup lang="ts">
import GenericContainer from '@/components/layout/GenericContainer.vue';
import GenericButton from '@/components/GenericButton.vue';
import FrequentlyAskedQuestions from '@/components/FrequentlyAskedQuestions.vue';

const start = () => {
  window.location.href = '/accounts';
};
</script>

<template>
  <GenericContainer class="flex flex-col items-center">
    <template #body>
      <h1 class="text-6xl font-bold text-gray-900 mb-12">
        ⚡ Slach ⚡
      </h1>
      <h3 class="text-2xl text-gray-800 text-center mb-12">
        Al registrarte obtendrás un
        <span class="font-bold">link único que te servirá para recibir pagos</span>
        de quién quieras.
      </h3>
      <GenericButton @click="start">
        Empezar
      </GenericButton>
    </template>
    <template #footer>
      <FrequentlyAskedQuestions />
    </template>
  </GenericContainer>
</template>
