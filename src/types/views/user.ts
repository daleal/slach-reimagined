export type PayerStateType = 'payer-amount-selection' | 'payer-final';
export type OwnerStateType = 'owner-amount-selection' | 'owner-final';

export type StateType = 'action-selection' | PayerStateType | OwnerStateType;
export type SecondStateType = Exclude<PayerStateType, 'payer-final'> | Exclude<OwnerStateType, 'owner-final'>;
