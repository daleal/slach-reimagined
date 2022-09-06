<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  text: string,
}>();

const emit = defineEmits<{ (e: 'click'): void }>();

const onClick = () => {
  emit('click');
};
</script>

<template>
  <button
    class="
      px-4 py-2 rounded font-semibold border border-indigo-500
      bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white
    "
    @click="onClick"
  >
    <span class="mr-2">{{ props.text }}</span> <FontAwesomeIcon :icon="[ 'fas', 'copy' ]" />
  </button>
</template>
