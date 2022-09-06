const CHECKING_ACCOUNT = 'checking_account';
const SIGHT_ACCOUNT = 'sight_account';

export const accountTypes = [
  {
    id: CHECKING_ACCOUNT,
    name: 'Cuenta Corriente',
  },
  {
    id: SIGHT_ACCOUNT,
    name: 'Cuenta Vista',
  },
] as const;
