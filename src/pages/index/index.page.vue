<script setup lang="ts">
import { useHead } from '@vueuse/head';
import PageLink from '@/components/layout/PageLink.vue';
import CounterWidget from '@/components/CounterWidget.vue';
import GenericButton from '@/components/GenericButton.vue';

const props = defineProps<{
  health: string,
}>();

useHead({
  title: 'index',
});

const asdf = () => {
  console.log('ASDF');
};
</script>

<template>
  {{ props.health }}
  <PageLink href="/">
    Index
  </PageLink>
  <PageLink href="/about">
    About
  </PageLink>
  <GenericButton
    full-width
    type="secondary"
    @click="asdf"
  >
    Empezar
  </GenericButton>
  <h1>Welcome</h1>
  This page is:
  <ul>
    <li>Rendered to HTML.</li>
    <li>Interactive. <CounterWidget /></li>
  </ul>
</template>
