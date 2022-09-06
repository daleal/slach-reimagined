<script setup lang="ts">
import { ref } from 'vue';
import GenericContainer from '@/components/layout/GenericContainer.vue';
import FrequentlyAskedQuestions from '@/components/FrequentlyAskedQuestions.vue';
import AccountTypeSelectionView from '@/pages/accounts/views/AccountTypeSelectionView.vue';
import AliasSelectionView from '@/pages/accounts/views/AliasSelectionView.vue';
import InformationGatheringView from '@/pages/accounts/views/InformationGatheringView.vue';

import type { StateType } from '@/types/views/accounts';

const state = ref<StateType>('account-type-selection');

const moveToState = (newState: StateType) => {
  state.value = newState;
};
</script>

<template>
  <GenericContainer>
    <template #body>
      <AccountTypeSelectionView
        v-if="state === 'account-type-selection'"
        @continue="() => moveToState('alias-selection')"
      />
      <AliasSelectionView
        v-else-if="state === 'alias-selection'"
        @continue="() => moveToState('information-gathering')"
        @go-back="() => moveToState('account-type-selection')"
      />
      <InformationGatheringView
        v-else-if="state === 'information-gathering'"
        @continue="() => moveToState('confirmation')"
        @go-back="() => moveToState('alias-selection')"
      />
    </template>
    <template #footer>
      <FrequentlyAskedQuestions />
    </template>
  </GenericContainer>
</template>
