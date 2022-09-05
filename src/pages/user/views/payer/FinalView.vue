<script setup lang="ts">
import { useAmount } from '@/composables/amount';

import type { User } from '@/types/user';

const props = defineProps<{ user: User }>();

const { amount } = useAmount();
</script>

<template>
  Payer Final View {{ props.user.name }} => {{ amount }}
</template>
