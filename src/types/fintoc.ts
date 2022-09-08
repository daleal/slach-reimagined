import type { BankAccountType } from '@/utils/bankAccountTypes';
import type { Bank } from '@/utils/banks';

export interface FintocAccount {
  accountType: BankAccountType['id'],
  accountNumber: string,
  currency: string,
  balance: {
    available: number,
  },
}

export interface FintocLink {
  fullName: string,
  rut: string,
  bank: Bank['id'],
  accounts: Array<FintocAccount>,
}
