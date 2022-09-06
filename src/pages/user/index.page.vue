<script setup lang="ts">
import { ref } from 'vue';
import { isNumeric } from '@/utils/helpers';
import { useAmount } from '@/composables/amount';
import { usePageContext } from '@/composables/pageContext';
import GenericContainer from '@/components/layout/GenericContainer.vue';
import GenericFooter from '@/components/layout/GenericFooter.vue';
import ActionSelectionView from '@/pages/user/views/ActionSelectionView.vue';
import OwnerAmountSelectionView from '@/pages/user/views/owner/AmountSelectionView.vue';
import OwnerFinalView from '@/pages/user/views/owner/FinalView.vue';
import PayerAmountSelectionView from '@/pages/user/views/payer/AmountSelectionView.vue';
import PayerFinalView from '@/pages/user/views/payer/FinalView.vue';

import type { User } from '@/types/user';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { StateType, SecondStateType } from '@/types/views/user';

const props = defineProps<{ user: User }>();

const { amount } = useAmount();
const { pageContext } = usePageContext();

const state = ref<StateType>('action-selection');

const moveToState = (newState: StateType) => {
  state.value = newState;
};

if (isNumeric(pageContext.routeParams.amount)) {
  amount.value = pageContext.routeParams.amount;
  moveToState('payer-final');
}
</script>

<template>
  <GenericContainer>
    <template #body>
      <ActionSelectionView
        v-if="state === 'action-selection'"
        :user="props.user"
        @continue="(newState: SecondStateType) => moveToState(newState)"
      />
      <OwnerAmountSelectionView
        v-else-if="state === 'owner-amount-selection'"
        @continue="() => moveToState('owner-final')"
      />
      <OwnerFinalView
        v-else-if="state === 'owner-final'"
      />
      <PayerAmountSelectionView
        v-else-if="state === 'payer-amount-selection'"
        :user="props.user"
        @continue="() => moveToState('payer-final')"
      />
      <PayerFinalView
        v-else-if="state === 'payer-final'"
        :user="props.user"
      />
    </template>
    <template #footer>
      <GenericFooter />
    </template>
  </GenericContainer>
</template>
