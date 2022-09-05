<script setup lang="ts">
import { ref } from 'vue';
import GenericContainer from '@/components/layout/GenericContainer.vue';
import GenericFooter from '@/components/layout/GenericFooter.vue';
import ActionSelectionView from '@/pages/user/views/ActionSelectionView.vue';

import type { User } from '@/types/user';
import type { StateType, SecondStateType } from '@/types/views/user';

const props = defineProps<{ user: User }>();

const state = ref<StateType>('action-selection');

const moveToState = (newState: StateType) => {
  state.value = newState;
};
</script>

<template>
  <GenericContainer>
    <template #body>
      <ActionSelectionView
        v-if="state === 'action-selection'"
        :user="props.user"
        @continue="(newState: SecondStateType) => moveToState(newState)"
      />
    </template>
    <template #footer>
      <GenericFooter />
    </template>
  </GenericContainer>
</template>
