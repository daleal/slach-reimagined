<script setup lang="ts">
const props = withDefaults(defineProps<{
  selected?: boolean
}>(), {
  selected: false,
});

const emit = defineEmits<{ (e: 'select'): void }>();

const select = () => {
  if (!props.selected) {
    emit('select');
  }
};
</script>

<template>
  <label
    class="
      relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer
      hover:bg-gray-700 hover:text-white text-gray-800
    "
    @click="select"
  >
    <span class="text-center text-2xl mb-3">
      <slot name="icon" />
    </span>
    <span class="font-semibold leading-tight uppercase mb-3 text-center">
      <slot name="title" />
    </span>
    <span class="font-regular text-center">
      <slot name="subtitle" />
    </span>
    <span
      aria-hidden="true"
      class="
        absolute inset-0 border-2 border-green-500
        bg-green-200 bg-opacity-10 rounded-lg
      "
      :class="{ hidden: !selected }"
    >
      <span
        class="
          absolute top-4 right-4 h-6 w-6 inline-flex items-center
          justify-center rounded-full bg-green-200
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5 text-green-600"
        >
          <path
            fill-rule="evenodd"
            d="
              M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1
              0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z
            "
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </span>
  </label>
</template>
