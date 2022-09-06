<script setup lang="ts">
import { computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  text: string,
  copy: string,
}>();

const { copy, copied } = useClipboard({ source: props.copy });

const buttonIcon = computed(() => (copied.value ? 'clipboard-check' : 'copy'));

const onClick = () => {
  copy();
};
</script>

<template>
  <button
    class="
      box-border px-4 py-2 rounded font-semibold border border-indigo-500
      bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white
    "
    @click="onClick"
  >
    <span class="mr-2">{{ props.text }}</span> <FontAwesomeIcon :icon="[ 'fas', buttonIcon ]" />
  </button>
</template>
