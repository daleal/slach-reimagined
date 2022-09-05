export type StateType = 'action-selection' | 'payer' | 'owner';
export type SecondStateType = Exclude<StateType, 'action-selection'>;
