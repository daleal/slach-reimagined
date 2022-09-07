<script setup lang="ts">
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import type { Nullable } from '@/types/utils';

const props = withDefaults(defineProps<{
  modelValue: Nullable<string>,
  label: string,
  options: Array<string>,
  fullWidth?: boolean,
  disabled?: boolean,
}>(), {
  fullWidth: false,
  disabled: false,
});

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const widthClasses = computed(() => (props.fullWidth ? 'w-full' : ''));

const dropDownRef = ref(null);
const opened = ref(false);
const displayedLabel = computed(() => props.modelValue || props.label);

const toggle = () => {
  opened.value = !opened.value;
};

const hide = () => {
  if (opened.value) {
    toggle();
  }
};

const select = (value: string) => {
  emit('update:modelValue', value);
  hide();
};

onClickOutside(dropDownRef, () => {
  if (opened.value) {
    hide();
  }
});
</script>

<template>
  <div
    ref="dropDownRef"
    class="relative"
  >
    <button
      :class="`
        flex items-center justify-between focus:outline-none border-2 rounded-md px-4 py-3
        leading-tight focus:border-gray-500 text-gray-900 select-none ${widthClasses}
      `"
      :disabled="props.disabled"
      @click="toggle"
    >
      <p :class="{ 'text-gray-400': !props.modelValue }">
        {{ displayedLabel }}
      </p>
      <FontAwesomeIcon
        v-show="!props.disabled"
        class="ml-4 w-4 h-4 text-gray-500"
        :class="{ 'rotate-180': opened }"
        :icon="[ 'fas', 'chevron-down' ]"
      />
    </button>
    <div
      class="
        absolute z-20 text-base list-none cursor-pointer mt-1 w-full
        shadow-lg rounded-lg bg-white
      "
      :class="{ hidden: !opened }"
    >
      <ul class="py-1">
        <li
          v-for="option in props.options"
          :key="option"
        >
          <span
            class="
              block py-2 px-4 text-gray-700
              hover:bg-gray-200 focus:bg-gray-200
            "
            @click="() => select(option)"
          >
            {{ option }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
