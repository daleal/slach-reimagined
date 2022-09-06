<script setup lang="ts">
import CopyButton from '@/components/CopyButton.vue';

const props = defineProps<{
  label: string,
  value: string,
}>();
</script>

<template>
  <div class="w-full flex">
    <div class="ml-6 my-4 grow">
      <div class="text-sm text-gray-900">
        {{ props.label }}:
      </div>
      <div class="text-sm text-gray-900 font-bold">
        {{ props.value }}
      </div>
    </div>
    <div class="mr-6 my-4 inline-block">
      <CopyButton text="Copiar" />
    </div>
  </div>
</template>
