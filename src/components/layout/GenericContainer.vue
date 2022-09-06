<template>
  <div class="w-screen h-screen overflow-x-hidden flex flex-col justify-between">
    <div
      v-bind="$attrs"
      class="container max-w-md mx-auto py-16 px-2 md:px-0"
    >
      <slot name="body" />
    </div>
    <slot name="footer" />
  </div>
</template>
