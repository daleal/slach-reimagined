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
    return 'text-gray-800 bg-emerald-300 hover:bg-emerald-200 disabled:bg-emerald-100 disabled:text-gray-400';
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
      px-10 py-3 rounded-full font-medium select-none text-center
      disabled:cursor-not-allowed
      ${widthClasses} ${colorClasses}
    `"
    @click="onClick"
  >
    <slot />
  </button>
</template>
