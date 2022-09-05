<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <div class="w-full bg-gray-100">
    <div class="mx-auto flex flex-col items-center py-6">
      <div class="mt-6 text-center">
        <h3 class="text-xl md:text-2xl text-gray-900">
          ¿Nuevo en slach.cl ⚡?
        </h3>
        <p class="my-2">
          ¡Te invitamos a <a
            href="/"
            class="text-indigo-700 cursor-pointer font-bold"
          >registrar</a> también tus datos!
        </p>
      </div>
      <div class="mt-6 text-center">
        <h3 class="text-xl md:text-2xl text-gray-900">
          ¿Cómo funciona? ¿Para qué sirve?
        </h3>
        <p class="my-2">
          Más info acá
        </p>
      </div>
      <div class="mt-6 text-center">
        <h3 class="text-xl md:text-2xl text-gray-900">
          ¿Tienes Feedback?
        </h3>
        <p class="my-2">
          <a
            href="https://www.twitter.com/CGriffero"
            target="_blank"
            class="text-indigo-700 cursor-pointer font-bold"
          >Escríbeme <FontAwesomeIcon :icon="[ 'fab', 'twitter' ]" /></a>
        </p>
      </div>
    </div>
  </div>
</template>
