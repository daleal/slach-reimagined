<script setup lang="ts">
import { computed } from 'vue';
import { ButtonType } from '@/types/button';

const props = withDefaults(defineProps<{
  type?: typeof ButtonType[number],
  fullWidth?: boolean,
}>(), {
  type: 'primary',
  fullWidth: false,
});

const emit = defineEmits<{ (e: 'click'): void }>();

const widthClasses = computed(() => (props.fullWidth ? 'w-full' : ''));
const colorClasses = computed(() => {
  if (props.type === 'primary') {
    return 'text-white bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-300';
  } if (props.type === 'secondary') {
    return 'text-gray-800 bg-green-300 hover:bg-green-200 disabled:bg-green-100 disabled:text-gray-400';
  }
  return '';
});

const onClick = () => {
  emit('click');
};
</script>

<template>
  <button
    :class="`
      px-10 py-2 rounded-full font-medium select-none text-center
      disabled:cursor-not-allowed
      ${widthClasses} ${colorClasses}
    `"
    @click="onClick"
  >
    <slot />
  </button>
</template>
