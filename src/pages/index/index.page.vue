<script setup lang="ts">
import GenericButton from '@/components/GenericButton.vue';

const start = () => {
  console.log('Starting...');
};
</script>

<template>
  <div class="w-full">
    <div class="max-w-md mx-auto flex flex-col items-center mt-12">
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
    </div>
  </div>
</template>
