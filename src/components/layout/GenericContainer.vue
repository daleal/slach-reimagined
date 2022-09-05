<template>
  <div class="w-screen h-screen flex flex-col justify-between">
    <div
      v-bind="$attrs"
      class="max-w-md mx-auto py-12 px-2 md:px-0"
    >
      <slot name="body" />
    </div>
    <slot name="footer" />
  </div>
</template>
