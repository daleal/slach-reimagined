<script setup lang="ts">
import { computed, toRef } from 'vue';

const props = withDefaults(defineProps<{
  modelValue?: string,
  placeholder?: string,
  hint?: string,
  error?: string,
  formatter?: (value: string) => string,
}>(), {
  formatter: (value: string) => value,
});

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const value = toRef(props, 'modelValue');

const renderSubText = computed(() => !!props.hint || !!props.error);
const subTextColorClasses = computed(() => {
  if (props.error) {
    return 'text-red-600';
  }
  return 'text-gray-600';
});

const inputColorClasses = computed(() => {
  if (props.error) {
    return 'border-red-200 focus:border-red-600';
  }
  return 'focus:border-gray-500';
});

const updateInput = (event: Event) => {
  const target = (event.target as HTMLInputElement);
  const formattedValue = props.formatter(target.value);
  emit('update:modelValue', formattedValue);
  target.value = formattedValue;
};
</script>

<template>
  <div>
    <input
      :class="`
        focus:outline-none w-full border-2 rounded-md px-4 py-3
        leading-tight text-gray-900 placeholder-gray-400
        ${inputColorClasses}
      `"
      :placeholder="placeholder"
      :value="value"
      @input="updateInput"
    >
    <p
      v-if="renderSubText"
      :class="`pt-1 px-1 text-sm select-none ${subTextColorClasses}`"
    >
      {{ props.error || props.hint }}
    </p>
  </div>
</template>
