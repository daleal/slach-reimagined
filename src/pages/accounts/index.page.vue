<script setup lang="ts">
import { ref } from 'vue';
import * as api from '@/api';
import { useAccountInfo } from '@/composables/accountInfo';
import { useFintocWidget } from '@/composables/fintocWidget';
import { useSession } from '@/composables/session';
import { banks } from '@/utils/banks';
import { bankAccountTypeIds } from '@/utils/bankAccountTypes';
import { API_HOST } from '@/constants';
import GenericContainer from '@/components/layout/GenericContainer.vue';
import FrequentlyAskedQuestions from '@/components/FrequentlyAskedQuestions.vue';
import AccountTypeSelectionView from '@/pages/accounts/views/AccountTypeSelectionView.vue';
import AliasSelectionView from '@/pages/accounts/views/AliasSelectionView.vue';
import InformationGatheringView from '@/pages/accounts/views/InformationGatheringView.vue';
import FintocOnboardingView from '@/pages/accounts/views/FintocOnboardingView.vue';
import ConfirmationView from '@/pages/accounts/views/ConfirmationView.vue';
import VerifyEmailView from '@/pages/accounts/views/VerifyEmailView.vue';

import type { StateType } from '@/types/views/accounts';

const {
  accountType, rut, bankName, name, accounts, getNormalizedData,
} = useAccountInfo();
const { getSession } = useSession();

const state = ref<StateType>('account-type-selection');
const fintocOnboarded = ref(false);

const moveToState = (newState: StateType) => {
  state.value = newState;
};

const goBackFromConfirmation = () => {
  moveToState(fintocOnboarded.value ? 'fintoc-onboarding' : 'information-gathering');
};

const useFintocOnboaring = async () => {
  const { session } = await getSession();
  const widget = await useFintocWidget({
    product: 'movements',
    holderType: accountType.value,
    webhookUrl: `${API_HOST}/api/v1/fintoc/${session}/webhook`,
    onSuccess: async () => {
      const {
        fullName: fintocName,
        rut: fintocRut,
        bank: fintocBankId,
        accounts: fintocAccounts,
      } = await api.session.get(session);
      rut.value = fintocRut;
      name.value = fintocName;
      bankName.value = banks.find((internalBank) => internalBank.id === fintocBankId)?.name || null;
      accounts.value = fintocAccounts.filter((account) => (
        bankAccountTypeIds.includes(account.accountType) && account.currency === 'CLP'
      )).sort((firstAcc, secondAcc) => secondAcc.balance.available - firstAcc.balance.available);
      fintocOnboarded.value = true;
      moveToState('fintoc-onboarding');
    },
  });
  widget?.open();
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
        @use-fintoc-onboarding="useFintocOnboaring"
        @continue="() => moveToState('confirmation')"
        @go-back="() => moveToState('alias-selection')"
      />
      <FintocOnboardingView
        v-else-if="state === 'fintoc-onboarding'"
        @continue="() => moveToState('confirmation')"
        @go-back="() => moveToState('alias-selection')"
      />
      <ConfirmationView
        v-else-if="state === 'confirmation'"
        @continue="createAccount"
        @go-back="goBackFromConfirmation"
      />
      <VerifyEmailView v-else-if="state === 'verify-email'" />
    </template>
    <template #footer>
      <FrequentlyAskedQuestions />
    </template>
  </GenericContainer>
</template>
