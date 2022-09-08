const CHECKING_ACCOUNT = 'checking_account';
const SIGHT_ACCOUNT = 'sight_account';

export const bankAccountTypes = [
  {
    id: CHECKING_ACCOUNT,
    name: 'Cuenta Corriente',
  },
  {
    id: SIGHT_ACCOUNT,
    name: 'Cuenta Vista',
  },
] as const;

export const bankAccountTypeIds = bankAccountTypes.map((accountType) => accountType.id);

export type BankAccountType = typeof bankAccountTypes[number];
