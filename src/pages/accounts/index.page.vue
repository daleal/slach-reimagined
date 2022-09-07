<script setup lang="ts">
import { ref } from 'vue';
import * as api from '@/api';
import { useAccountInfo } from '@/composables/accountInfo';
import GenericContainer from '@/components/layout/GenericContainer.vue';
import FrequentlyAskedQuestions from '@/components/FrequentlyAskedQuestions.vue';
import AccountTypeSelectionView from '@/pages/accounts/views/AccountTypeSelectionView.vue';
import AliasSelectionView from '@/pages/accounts/views/AliasSelectionView.vue';
import InformationGatheringView from '@/pages/accounts/views/InformationGatheringView.vue';
import ConfirmationView from '@/pages/accounts/views/ConfirmationView.vue';
import VerifyEmailView from '@/pages/accounts/views/VerifyEmailView.vue';

import type { StateType } from '@/types/views/accounts';

const { getNormalizedData } = useAccountInfo();

const state = ref<StateType>('account-type-selection');

const moveToState = (newState: StateType) => {
  state.value = newState;
};

const createAccount = async () => {
  const userData = getNormalizedData();
  try {
    await api.users.create(userData);
    moveToState('verify-email');
  } catch {
    // eslint-disable-next-line no-console
    console.log('Something went wrong!');
  }
};
</script>

<template>
  <GenericContainer>
    <template #body>
      <AccountTypeSelectionView
        v-if="false && state === 'account-type-selection'"
        @continue="() => moveToState('alias-selection')"
      />
      <AliasSelectionView
        v-else-if="false && state === 'alias-selection'"
        @continue="() => moveToState('information-gathering')"
        @go-back="() => moveToState('account-type-selection')"
      />
      <InformationGatheringView
        v-else-if="false && state === 'information-gathering'"
        @continue="() => moveToState('confirmation')"
        @go-back="() => moveToState('alias-selection')"
      />
      <ConfirmationView
        v-else-if="true || state === 'confirmation'"
        @continue="createAccount"
        @go-back="() => moveToState('information-gathering')"
      />
      <VerifyEmailView v-else-if="state === 'verify-email'" />
    </template>
    <template #footer>
      <FrequentlyAskedQuestions />
    </template>
  </GenericContainer>
</template>
