import type { BankAccountType } from '@/utils/bankAccountTypes';
import type { Bank } from '@/utils/banks';

export interface User {
  email: string,
  name: string,
  rut: string,
  bank: Bank['id'],
  accountNumber: number,
  accountType: BankAccountType['id'],
  confirmed: boolean,
}

export interface UserCreation {
  alias: string,
  rut: string,
  email: string,
  bank: string,
  accountType: string,
  accountNumber: string,
  isBusiness: boolean,
}
