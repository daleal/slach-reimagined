<script setup lang="ts">
import { computed } from 'vue';
import { usePageContext } from '@/composables/pageContext';

const { pageContext } = usePageContext();

const alias = computed(() => pageContext.routeParams.alias);
</script>

<template>
  User Alias: {{ alias }}
</template>
